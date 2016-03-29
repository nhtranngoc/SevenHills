var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

router.get('/random', function(req, res) {
    res.sendFile(path.resolve('public/solution.html'));
});

router.get('/search', function(req, res) {
    res.sendFile(path.resolve('public/search.html'));
});

module.exports = router;