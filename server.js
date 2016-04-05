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
    host: '130.215.124.111',
    user: 'user',
    password: 'password',
    database: 'sevenhillsdb'
});

var app = express();

var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});

app.use(morgan('combined', {stream: accessLogStream}))
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', primaryRoutes);

app.get('/index', function(req, res){
  console.log(req.query.search);
  res.json({'tagName':'Mobility'})  
})

app.post('/submit', function(req, res){
  var formSubmit = req.body;
  console.log(formSubmit);
  res.send('Good job');
})

var port = process.env.PORT || 80;

app.listen(port, function() {
    console.log('App is listening on port ' + port);
});
