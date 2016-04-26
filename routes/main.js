var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
router.get('/', function(req, res) {
    console.log(global.sess);
    res.sendFile(path.resolve('public/index.html'));
});

router.get('/manual', function(req, res) {
	console.log("Requesting manual. Someone needs help!!");
    var manual = "./public/res/manual.pdf";
    fs.readFile(manual, function(err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});
module.exports = router;