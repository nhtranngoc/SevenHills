// DEPENDENCIES ======================================
var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var primaryRoutes = require('./routes/main.js');
var dbRoutes = require('./routes/db.js');
var uploadRoutes = require('./routes/upload.js');
var app = express();

//====================================================
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
app.use('/', dbRoutes);
app.use('/', uploadRoutes);

//DEPLOYMENT =========================================
var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('App is listening on port ' + port);
});