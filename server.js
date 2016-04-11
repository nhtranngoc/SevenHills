// DEPENDENCIES ======================================
var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mysql = require('mysql');
var async = require('async');
var primaryRoutes = require('./routes/main.js');
var secretFile = ('./config/secret.json');
//====================================================
var config;
try {
    config = require(secretFile);
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
// connection.end(function(err) {
// The connection is terminated gracefully
// Ensures all previously enqueued queries are still
// before sending a COM_QUIT packet to the MySQL server.
// });
var app = express();
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(morgan('combined', {
    stream: accessLogStream
}))
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', primaryRoutes);
// DATABASE QUERY ===================================================================
//Super hacky substring search engine.
app.get('/index', function(req, res) {
    console.log(req.query.search);
    var searchArr = req.query.search.split(" ");
    queryStr = 'SELECT * from solutions NATURAL JOIN solutiontags WHERE ';
    var queryArr = [];
    searchArr.forEach(function(element, index, array){
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

// app.get('/index', function(req, res){
//     console.log(req.query.search);
//     res.send({name:'Test Name'});
// })

app.get('/tags', function(req, res) {
    connection.query('SELECT * from tags', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
});
app.get('/materials', function(req, res) {
    connection.query('SELECT * from material', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
});
app.post('/submit', function(req, res) {
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
                connection.query('SELECT COUNT(*) as count from Solutions', function(err, rows, fields) {
                    solutionID = parseInt(rows[0].count) + 1;
                    solution.SolutionID = solutionID;
                    console.log("Counted " + solutionID + " solutions");
                    callback(err, solutionID);
                })
            },
            function insertSolution(solutionID, callback) {
                connection.query('INSERT INTO Solutions SET ?', solution, function(err, res) {
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
            function countMaterials (solutionID, callback){
                connection.query('SELECT COUNT(*) as count from Material', function(err, rows, fields){
                    var currentMatCount = rows[0].count;
                    callback(err, currentMatCount, solutionID);
                })
            },
            function iterateMaterials(currentMatCount, solutionID, callback) {
                async.each(formSubmit.Materials, function(element, callback) {
                    console.log("Processing material: " + element.select.MaterialName);
                    //Check if material exists
                    connection.query('SELECT * from Material WHERE MaterialName = ?', element.select.MaterialName, function(err, rows, fields) {
                        var ifExist = rows.length;
                        var currentRow = rows[0];
                        console.log("material = element: ");
                        console.log(rows)
                        var matToInsert = {}
                        if (ifExist == 0){
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
            }
        ], function(err, result) {
            //Result should be res
            console.log(err, result);
        });
        console.log(formSubmit);
        console.log('=========================');
        res.send('Good job');
    })
    //DEPLOYMENT =========================================
var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('App is listening on port ' + port);
});