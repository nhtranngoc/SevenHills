var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('connect-multiparty');
var multipartyConfigFile = ('../config/multiparty');
var UserController = require('../config/UserController');

try {
	multipartyConfig = require(multipartyConfigFile);
} catch (err) {
	multipartyConfig = {};
	console.log("unable to read file '" + multipartyConfigFile + "': ", err);
}
var multipartyMiddleware = multiparty(multipartyConfig);

router.get('/', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

router.get('/test', function(req, res) {
	res.send({test:true});
})

router.post('/upload/url', multipartyMiddleware, UserController.uploadFile);

module.exports = router;