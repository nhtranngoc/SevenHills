var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, '/public')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
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


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
