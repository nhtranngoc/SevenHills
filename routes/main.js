var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
	console.log(global.sess);
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = router;