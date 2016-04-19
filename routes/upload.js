var express = require('express');
var router = express.Router();
var multipartyConfig;
var multiparty = require('connect-multiparty');
var multipartyConfigFile = ('../config/multiparty');

// MULTIPARTY/FILE UPLOAD ==============================================================
try {
	multipartyConfig = require(multipartyConfigFile);
} catch (err) {
	multipartyConfig = {};
	console.log("unable to read file '" + multipartyConfigFile + "': ", err);
}
var multipartyMiddleware = multiparty(multipartyConfig);

router.post('/upload', multipartyMiddleware, function(req, res) {
	console.log(req.files);
	res.send('File upload success');
});

module.exports = router;