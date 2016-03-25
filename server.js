var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '10.1.2.101',
    user: 'user',
    password: 'password',
    database: 'sevenhillsdb'
});
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.get('/index', function(req, res) {
    console.log(req.query);
    //----------POST STUFF-------------
    // var body = req.body;
    // var searchQuery = body.search;
    // console.log(req.body);
    //---------------------------------
    res.sendFile(path.join(__dirname, '/public/search.html'));
});
app.get('/random', function(req, res) {
    console.log("RANDOM REQUEST");
    res.sendFile(path.join(__dirname, '/public/solution.html'));
});
app.get('/addsoln', function(req, res) {
    console.log("Hey boss someone wants to add some new solutions");
    res.sendFile(path.join(__dirname, '/public/addSoln.html'));
});
app.get('/getTag', function(req, res) {
    var tableRows;
    // connection.connect();
    connection.query('SELECT tagName FROM tags', function(err, rows, fields) {
        if (err) throw err;
        // console.log('All tags: ', rows);
        tableRows = rows;
        console.log(typeof(tableRows));
        res.setHeader('Content-type', 'application/json');
        // res.send(JSON.stringify(tableRows));
        var tags = {};
        tags.sendThis = tableRows;
        console.log(tags);
        res.send(JSON.stringify(tags));
    });
    // connection.end();
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(port, function() {
    console.log('App is listening on port ' + port);
});