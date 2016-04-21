var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
var CronJob = require('cron').CronJob;
var argv = require('minimist')(process.argv.slice(2));
var secretFile = ('../config/secret.json');
var config;
// CONNECT TO DATABASE =============================================================
try {
    //Defaults to localhost as database host
    if (argv.d != null) {
        config = require(secretFile).argv.d;
        console.log("Using database at" + argv.d);
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
function getRandomSolution() {
    connection.query("SELECT * FROM solutions WHERE solutionid >= (SELECT FLOOR( MAX(solutionid) * RAND()) FROM solutions ) ORDER BY solutionid LIMIT 1", function(err, rows, fields) {
        if (err) throw err;
        console.log("Remind Mike never to work at IT.");
    })
}
getRandomSolution();
//for messing around
var everyTwoSec = '*/2 * * * * *';
//for production
var everyDayAtMidnight = '0 0 * * * *';
var sotdJob = new CronJob({
    cronTime: everyDayAtMidnight,
    onTick: getRandomSolution(),
    start: false,
    timeZone: 'America/Los_Angeles'
});
sotdJob.start();
// DATABASE QUERY ===================================================================
//Super hacky substring search engine.
router.get('/index', function(req, res) {
    console.log(req.query.search);
    var searchArr = req.query.search.split(" ");
    queryStr = 'SELECT * from solutions NATURAL JOIN solutiontags WHERE ';
    var queryArr = [];
    searchArr.forEach(function(element, index, array) {
        queryArr.push("SolutionName LIKE '%" + element + "%'");
        queryArr.push("Description LIKE '%" + element + "%'");
        queryArr.push("TagName LIKE '%" + element + "%'");
    })
    queryStr += queryArr.join(" OR ") + " Group by solutionid";
    console.log("FINALIZED QUERY STRING: " + queryStr);
    connection.query(queryStr, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        console.log("Total number of results: " + rows.length);
        res.send(rows);
    })
})
router.get('/tags', function(req, res) {
    connection.query('SELECT * from tags', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
});
router.get('/materials', function(req, res) {
    connection.query('SELECT * from material', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
});
router.post('/solutionid', function(req, res) {
    console.log(req.body);
    connection.query('SELECT * from solutions WHERE solutionID = ?', req.body.solutionID, function(err, rows, fields) {
        console.log(rows);
        res.send(rows);
    })
})
router.post('/matid', function(req, res) {
    console.log(req.body);
    connection.query('SELECT materialname, vendor, amount from material NATURAL JOIN requirement where solutionid = ?', req.body.matid, function(err, rows, fileds) {
        console.log(rows);
        res.send(rows);
    })
})
router.post('/comment', function(req, res) {
    if (req.body.get == true) {
        //If getting comments
        connection.query('SELECT * from comments WHERE solutionID = ?', req.body.solutionID, function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        })
    } else {
        //If posting comments
        var theComment = {
            solutionid: req.body.solutionID,
            name: req.body.name,
            commenttext: req.body.commentText
        };
        connection.query('INSERT INTO comments SET ?', theComment, function(err, res) {
            if (err) throw err;
        })
        res.sendStatus(200);
    }
})
router.post('/submit', function(req, res) {
    var formSubmit = req.body;
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
                console.log(rows);
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
                    console.log("material = element: ");
                    console.log(rows)
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
                    console.log("Material ID This is important: " + matToInsert.MaterialID);
                    var requirement = {
                        SolutionID: solutionID,
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
        console.log(err, result);
    });
    // res.send("5");
    console.log(formSubmit);
    console.log('=========================');
})
module.exports = router;