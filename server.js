// DEPENDENCIES =========================================================
var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '10.1.2.101',
    user: 'user',
    password: 'password',
    database: 'sevenhillsdb'
});

var app = express();
//SETUP =========================================================
//Storing log with morgan
var logDirectory = __dirname + '/log';
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

//SET VARIABLES =========================================================
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//ROUTES =========================================================
// var solution = require('./routes/solution');
// var search = require('./routes/search');

// app.use('/search', search);
// app.use('/solution', solution);

// app.get('/index', function(req, res) {
//     console.log(req.query);
//     //----------POST STUFF-------------
//     // var body = req.body;
//     // var searchQuery = body.search;
//     // console.log(req.body);
//     //---------------------------------
//     res.sendFile(path.join(__dirname, '/public/search.html'));
// });
// 
// app.get('/random', function(req, res) {
//     console.log("RANDOM REQUEST");
//     res.sendFile(path.join(__dirname, '/public/solution.html'));
// });
// app.get('/addsoln', function(req, res) {
//     console.log("Hey boss someone wants to add some new solutions");
//     res.sendFile(path.join(__dirname, '/public/addSoln.html'));
// });
// app.get('/getTag', function(req, res) {
//     var tableRows;
//     // connection.connect();
//     connection.query('SELECT tagName FROM tags', function(err, rows, fields) {
//         if (err) throw err;
//         // console.log('All tags: ', rows);
//         tableRows = rows;
//         console.log(typeof(tableRows));
//         res.setHeader('Content-type', 'application/json');
//         // res.send(JSON.stringify(tableRows));
//         var tags = {};
//         tags.sendThis = tableRows;
//         console.log(tags);
//         res.send(JSON.stringify(tags));
//     });
//     // connection.end();
// });


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//SERVER =========================================================
var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('App is listening on port ' + port);
});