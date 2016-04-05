var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mysql = require('mysql');
var primaryRoutes = require('./routes/main.js');
var connection = mysql.createConnection({
    host: '10.1.2.101',
    user: 'user',
    password: 'password',
    database: 'sevenhillsdb'
});
connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        console.log(err);
        return;
    }
    console.log('Connection established');
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
            console.log(solution);
            connection.query('INSERT INTO Solutions SET ?', solution, function(err, res) {
                if (err) throw err;
            })
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