var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

router.get('/random', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/solution.html'));
});

router.get('/search', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/search.html'));
});

module.exports = router;