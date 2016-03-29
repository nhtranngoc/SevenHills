var express = require('express'),
    router = express.Router();

router.get('/random', function(req, res) {
    console.log("RANDOM REQUEST");
    res.sendFile(path.join(__dirname, '/public/solution.html'));
});

module.exports = router;