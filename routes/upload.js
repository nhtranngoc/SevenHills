var express = require('express');
var router = express.Router();
var fs = require('fs');
var async = require('async');
var path = require('path');
var multipartyConfig;
var multiparty = require('connect-multiparty');
var multipartyConfigFile = ('../config/multiparty');
var filePath = './public/uploaded/files';
// MULTIPARTY/FILE UPLOAD ==============================================================
try {
    multipartyConfig = require(multipartyConfigFile);
} catch (err) {
    multipartyConfig = {};
    console.log("unable to read file '" + multipartyConfigFile + "': ", err);
}
var multipartyMiddleware = multiparty(multipartyConfig);

// UPLOAD ROUTE =========================================================================
router.post('/api/image', function(req, res){
	console.log("Requesting images for solution " + req.body.solutionID);
	var newFolderPath = path.join(filePath, req.body.solutionID.toString());
	fs.readdir(newFolderPath, function(err, files){
		if (err) {
            res.sendStatus(404);
        }
		res.send(files);
	})
})

router.post('/upload', multipartyMiddleware, function(req, res) {
    var files = req.files.files;
    var id = parseInt(req.body.id.solutionid);
    console.log("Sending image for solution " + id);
    var newFolderPath = path.join(filePath, id.toString());
    async.series({
        mkdir: function(callback) {
            fs.mkdir(newFolderPath, function(err) {
                callback(err);
            })
        },
        rename: function(callback) {
            files.forEach(function(element, index, array) {
                var newFilePath = path.join(newFolderPath, index.toString());
                fs.rename(element.path, newFilePath, function(err) {
                	if (err) throw err;
                })
            })
            callback(null);
        }
    }, function(err) {
        if (err) throw err;
        res.send("File upload success!");
    });
});
module.exports = router;