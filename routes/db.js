var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
var CronJob = require('cron').CronJob;
var argv = require('minimist')(process.argv.slice(2));
var rimraf = require('rimraf');
var path = require('path');
var secretFile = ('../config/secret.json');
var config;
// CONNECT TO DATABASE =============================================================
try {
    //Defaults to localhost as database host
    if (argv.b != null) {
        config = require(secretFile)[argv.b];
        console.log("Using database at " + argv.b);
    } else {
        config = require(secretFile).local;
        console.log("Using database at localhost (Default)");
    }
} catch (err) {
    config = {};
    console.log("unable to read file '" + secretFile + "': ", err);
}
var connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        console.log(err);
        return;
    }
    console.log('Connection established to ' + config.database);
});
//CRON JOB ===========================================
var sotd;

function getRandomSolution() {
    connection.query("SELECT * FROM solutions WHERE solutionid >= (SELECT FLOOR( MAX(solutionid) * RAND()) FROM solutions ) ORDER BY solutionid LIMIT 1", function(err, rows, fields) {
        if (err) throw err;
        console.log("Remind Mike never to work at IT.");
        sotd = rows[0];
    })
}
getRandomSolution();
//for messing around
var everyTwoSec = '*/2 * * * * *';
//for production
var everyDayAtMidnight = '0 0 * * * *';
var sotdJob = new CronJob({
    cronTime: everyDayAtMidnight,
    onTick: getRandomSolution,
    start: false,
    timeZone: 'America/Los_Angeles'
});
sotdJob.start();
// DATABASE QUERY ===================================================================
//Super hacky substring search engine.
router.get('/index', function(req, res) {
    console.log("Searching for " + req.query.search);
    if (!req.query.search) {
        connection.query("SELECT * from solutions NATURAL JOIN solutiontags GROUP BY solutionid", function(err, rows, fields) {
            if (err) throw err;
            console.log("Total of " + rows.length + " solutions");
            res.send(rows);
        })
    } else {
        var searchArr = req.query.search.split(" ");
        queryStr = 'SELECT * from solutions NATURAL JOIN solutiontags WHERE ';
        var queryArr = [];
        searchArr.forEach(function(element, index, array) {
            queryArr.push("SolutionName LIKE '%" + element + "%'");
            queryArr.push("Description LIKE '%" + element + "%'");
            queryArr.push("TagName LIKE '%" + element + "%'");
        })
        queryStr += queryArr.join(" OR ") + " GROUP BY solutionid";
        connection.query(queryStr, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows);
            console.log("Total number of results: " + rows.length);
            res.send(rows);
        })
    }
})
router.get('/api/sotd', function(req, res) {
    // console.log("Requesting solution of the day!");
    res.send(sotd);
})
router.get('/api/tags', function(req, res) {
    console.log("Requesting tags");
    connection.query('SELECT * from tags', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
});
router.get('/api/materials', function(req, res) {
    console.log("Requesting list of materials");
    connection.query('SELECT * from material', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
});
router.post('/api/solution', function(req, res) {
    var solutionID = req.body.solutionID;
    async.series([
        function getSolutionData(callback) {
            console.log("Requesting solution number " + solutionID);
            connection.query('SELECT * from solutions WHERE solutionID = ?', solutionID, function(err, rows, fields) {
                callback(err, rows);
            })
        },
        function getMaterialData(callback) {
            console.log("Requesting materials for solution number " + solutionID);
            connection.query('SELECT materialname, vendor, amount from material NATURAL JOIN requirement where solutionid = ?', solutionID, function(err, rows, fileds) {
                callback(err, rows);
            })
        },
        function getTagData(callback) {
            console.log("Requesting tags for solution number " + solutionID);
            connection.query('SELECT * from solutiontags WHERE solutionid = ?', solutionID, function(err, rows, fields) {
                callback(err, rows);
            })
        }
    ], function(err, results) {
        if (err) throw err;
        res.send({
            solution: results[0],
            material: results[1],
            tags: results[2]
        });
    })
})
router.post('/api/comment', function(req, res) {
    console.log("Requesting comments for solution number " + req.body.solutionID);
    if (req.body.get == true) {
        //If getting comments
        connection.query('SELECT * from comments WHERE solutionID = ?', req.body.solutionID, function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        })
    } else {
        //If posting comments
        console.log("Adding comment for solution number " + req.body.solutionID);
        var theComment = {
            solutionid: req.body.solutionID,
            name: req.body.name,
            commenttext: req.body.commentText
        };
        connection.query('INSERT INTO comments SET ?', theComment, function(err, results) {
            if (err) throw err;
            res.send({commentID: results.insertId});
        })
    }
})
router.delete('/api/comment', function(req, res) {
    console.log("Requesting to delete comment " + req.body.commentID);
    connection.query('DELETE FROM comments WHERE commentID = ?', req.body.commentID, function(err, results) {
        if (err) throw err;
        res.send("Comment deleted");
    })
})
router.post('/api/submit', function(req, res) {
    var formSubmit = req.body;
    console.log("Submitting form for solution: " + formSubmit.Name);
    var solution = {
        SolutionName: formSubmit.Name,
        Description: formSubmit.Description,
        Difficulty: formSubmit.Difficulty,
        Instruction: formSubmit.Instruction,
        EstimatedTotalCost: formSubmit.Cost,
        Time: formSubmit.Time
    };
    async.waterfall([
        function countSolutions(callback) {
            connection.query('SELECT MAX(solutionid) as count from solutions', function(err, rows, fields) {
                solutionID = parseInt(rows[0].count) + 1;
                solution.SolutionID = solutionID;
                console.log("Counted " + solutionID + " solutions");
                callback(err, solutionID);
            })
        },
        function insertSolution(solutionID, callback) {
            connection.query('INSERT INTO solutions SET ?', solution, function(err, res) {
                console.log("Inserted " + solution.SolutionName + " into set");
                callback(err, solutionID);
            })
        },
        function iterateTags(solutionID, callback) {
            async.each(formSubmit.Category, function(element, callback) {
                console.log("Processing tag: " + element);
                //Check if tag exists
                connection.query('SELECT COUNT(*) as count from tags WHERE TagName = ?', element, function(err, rows, fields) {
                    //If not, add to tag list
                    if (rows[0].count == 0) {
                        connection.query('INSERT INTO tags SET ?', {
                            tagName: element
                        }, function(err, res) {
                            if (err) throw err;
                        })
                    }
                    connection.query('INSERT INTO solutiontags SET ?', {
                        solutionID: solutionID,
                        tagName: element
                    }, function(err, res) {
                        if (err) throw err;
                    })
                })
            })
            callback(null, solutionID);
        },
        function countMaterials(solutionID, callback) {
            connection.query('SELECT MAX(materialid) as count from material', function(err, rows, fields) {
                var currentMatCount = rows[0].count;
                callback(err, currentMatCount, solutionID);
            })
        },
        function iterateMaterials(currentMatCount, solutionID, callback) {
            async.each(formSubmit.Materials, function(element, callback) {
                console.log("Processing material: " + element.select.MaterialName);
                //Check if material exists
                connection.query('SELECT * from material WHERE MaterialName = ?', element.select.MaterialName, function(err, rows, fields) {
                    var ifExist = rows.length;
                    var currentRow = rows[0];
                    var matToInsert = {}
                    if (ifExist == 0) {
                        currentMatCount++;
                        matToInsert.MaterialID = currentMatCount;
                        matToInsert.MaterialName = element.select.MaterialName;
                        matToInsert.vendor = element.select.Vendor;
                        connection.query('INSERT INTO Material SET ?', matToInsert, function(err, res) {
                            if (err) throw err;
                        })
                    } else {
                        matToInsert.MaterialID = currentRow.materialid;
                    }
                    console.log("Material ID: " + matToInsert.MaterialID);
                    var requirement = {
                        SolutionID: req.body.solutionID,
                        MaterialID: matToInsert.MaterialID,
                        Amount: element.quan
                    }
                    connection.query('INSERT INTO requirement SET ?', requirement, function(err, res) {
                        if (err) throw err;
                    })
                })
            })
            callback(null, solutionID);
        }
    ], function(err, result) {
        //Result should be solutionid?
        if (err) throw err;
        res.send({
            solutionid: result
        });
        console.log("Inserted solution number " + result);
    });
    // res.send("5");
    console.log('========FORM SUBMITTED=========');
})
router.post('/api/update', function(req, res) {
    var formSubmit = req.body;
    var solution = {
        SolutionName: formSubmit.Name,
        Description: formSubmit.Description,
        Difficulty: formSubmit.Difficulty,
        Instruction: formSubmit.Instruction,
        EstimatedTotalCost: formSubmit.Cost,
        Time: formSubmit.Time
    };
    global.sess = req.session;
    if (global.sess.authenticated) {
        async.series([
            function updateSolutions(callback) {
                console.log('Updating solution ' + solution.SolutionName);
                connection.query('UPDATE solutions SET ? WHERE solutionid = ?', [solution, req.body.solutionID], function(err, results) {
                    callback(err);
                })
            },
            function deleteTags(callback) {
                console.log('Deleting old tags');
                connection.query('DELETE FROM solutiontags WHERE solutionID = ?', req.body.solutionID, function(err, results) {
                    callback(err);
                })
            },
            function iterateTags(callback) {
                console.log('Adding new tags');
                async.each(formSubmit.Category, function(element, callback) {
                    console.log("Processing tag: " + element);
                    //Check if tag exists
                    connection.query('SELECT COUNT(*) as count from tags WHERE TagName = ?', element, function(err, rows, fields) {
                        //If not, add to tag list
                        if (rows[0].count == 0) {
                            connection.query('INSERT INTO tags SET ?', {
                                tagName: element
                            }, function(err, res) {
                                if (err) throw err;
                            })
                        }
                        connection.query('INSERT INTO solutiontags SET ?', {
                            solutionID: req.body.solutionID,
                            tagName: element
                        }, function(err, res) {
                            if (err) throw err;
                        })
                    })
                })
                callback(null);
            },
            function deleteMaterials(callback) {
                console.log('Deleting old material requirements');
                connection.query('DELETE FROM requirement WHERE solutionID = ?', req.body.solutionID, function(err, results) {
                    callback(err);
                })
            },
            function iterateMaterials(callback) {
                async.each(formSubmit.Materials, function(element, callback) {
                    console.log("Processing material: " + element.select.MaterialName);
                    //Check if material exists
                    connection.query('SELECT * from material WHERE MaterialName = ?', element.select.MaterialName, function(err, rows, fields) {
                        var ifExist = rows.length;
                        var currentRow = rows[0];
                        var matToInsert = {}
                        if (ifExist == 0) {
                            currentMatCount++;
                            matToInsert.MaterialID = currentMatCount;
                            matToInsert.MaterialName = element.select.MaterialName;
                            matToInsert.vendor = element.select.Vendor;
                            connection.query('INSERT INTO Material SET ?', matToInsert, function(err, res) {
                                if (err) throw err;
                            })
                        } else {
                            matToInsert.MaterialID = currentRow.materialid;
                        }
                        var requirement = {
                            SolutionID: req.body.solutionID,
                            MaterialID: matToInsert.MaterialID,
                            Amount: element.quan
                        }
                        connection.query('INSERT INTO requirement SET ?', requirement, function(err, res) {
                            if (err) throw err;
                            console.log("Inserted material ID " + requirement.MaterialID);
                        })
                    })
                })
                callback(null);
            }
        ], function(err, results) {
            if (err) throw err;
            res.send("Updated successfully");
            console.log('========FORM UPDATED=========');
        })
    } else {
        //Unauthorized
        console.log("Not authorized to update solution");
        res.sendStatus(401);
    }
})
router.post('/api/delete', function(req, res) {
    var solutionID = req.body.solutionID;
    console.log("Deleting solution " + solutionID);
    global.sess = req.session;
    if (global.sess.authenticated) {
        async.series([
            function deleteTags(callback) {
                console.log("Deleting solution tags");
                connection.query('DELETE FROM solutiontags WHERE solutionid = ?', solutionID, function(err, results) {
                    callback(err);
                })
            },
            function deleteMaterials(callback) {
                console.log("Deleting solution requirements");
                connection.query('DELETE FROM requirement WHERE solutionid = ?', solutionID, function(err, results) {
                    callback(err);
                })
            },
            function deleteSolution(callback) {
                console.log("Deleting solution");
                connection.query('DELETE FROM solutions WHERE solutionid = ?', solutionID, function(err, results) {
                    callback(err);
                })
            },
            function deleteImages(callback) {
                var deletePath = path.join('./public/uploaded/files/', solutionID.toString());
                console.log("Deleting images at " + deletePath);
                rimraf(deletePath, function(err) {
                    callback(err);
                })
            }
        ], function(err, results) {
            if (err) throw err;
            res.send("Deleted successfully");
            console.log('========FORM UPDATED=========');
        })
    } else {
        console.log("Not authorized to delete solution");
        res.sendStatus(401);
    }
})
module.exports = router;