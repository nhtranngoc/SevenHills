var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/search.html'));
});

module.exports = router;