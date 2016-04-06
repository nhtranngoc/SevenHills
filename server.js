var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mysql = require('mysql');
var primaryRoutes = require('./routes/main.js');
var secretFile = ('./config/secret.json');
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
app.get('/index', function(req, res) {
    console.log(req.query.search);
    res.json({
        'tagName': 'Mobility'
    })
})
app.post('/submit', function(req, res) {
    var formSubmit = req.body;
    connection.query('SELECT COUNT(*) as count from Solutions', function(err, rows, fields) {
        // connection.end();
        // console.log(err, rows, fields);
        if (!err) {
            console.log(parseInt(rows[0].count));
            var numofSolutions = parseInt(rows[0].count);
            var solution = {
                SolutionID: numofSolutions + 1,
                SolutionName: formSubmit.Name,
                Description: formSubmit.Description,
                Difficulty: formSubmit.Difficulty,
                Instruction: formSubmit.Instruction,
                EstimatedTotalCost: formSubmit.Cost,
                Time: formSubmit.Time
            };
            // console.log(solution);
            connection.query('INSERT INTO Solutions SET ?', solution, function(err, res) {
                if (err) throw err;
            })
            formSubmit.Category.forEach(function(element, index, array) {
                connection.query('SELECT COUNT(*) as count from tags WHERE TagName = ?', element, function(err, rows, fields) {
                    // console.log(rows[0].count)
                    if (rows[0].count == 0) {
                        var tagToInsert = {
                            tagName: element
                        };
                        connection.query('INSERT INTO tags SET ?', tagToInsert, function(err, res) {
                            if (err) throw err;
                        })
                    }
                    var tagRelation = {
                        SolutionID: numofSolutions + 1,
                        TagName: element
                    }
                    connection.query('INSERT INTO solutiontags SET ?', tagRelation, function(err, res) {
                        if (err) throw err;
                    })
                })
            })
            console.log("=========================");
            formSubmit.Materials.forEach(function(element, index, array) {
                    connection.query('SELECT * from Material WHERE MaterialName = ?', element.select.description, function(err, rows, fields) {
                        var ifExist = rows.length;
                        var currentRow = rows[0];
                        console.log("material = element: ");
                        console.log(rows)
                        var matToInsert = {}
                        connection.query('SELECT COUNT(*) as count from Material', function(err, rows, fields) {
                            console.log("Count of materials" + rows);
                            matToInsert.MaterialID = rows[0].count + 1;
                            if (ifExist == 0) {
                                matToInsert.MaterialName = element.select.description;
                                matToInsert.vendor = element.select.vendor;
                                connection.query('INSERT INTO Material SET ?', matToInsert, function(err, res) {
                                    if (err) throw err;
                                })
                            } else {
                              matToInsert.MaterialID = currentRow.materialid;
                            }
                            console.log("Material ID This is important: "+ matToInsert.MaterialID);
                            var requirement = {
                                SolutionID: numofSolutions + 1,
                                MaterialID: matToInsert.MaterialID,
                                Amount: element.quan
                            }
                            connection.query('INSERT INTO requirement SET ?', requirement, function(err, res) {
                                if (err) throw err;
                            })
                        })
                    })
                })
                // for each tag in formSubmit.Category {
                //   if (not in database){
                //     addToDatabase()
                //   }
                //   addRelation(tag, solution)
                // }
        }
    });
    console.log(formSubmit);
    console.log('=========================');
    res.send('Good job');
});
var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('App is listening on port ' + port);
});