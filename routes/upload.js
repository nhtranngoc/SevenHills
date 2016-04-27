var express = require('express');
var router = express.Router();
var fs = require('fs');
var mkdirp = require('mkdirp');
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
		if (err || !files.length) {
            res.sendStatus(404);
        } else res.send(files);
	})
})

router.delete('/api/image', function(req, res){
    console.log("Request to delete image(s) for solution " + req.body.solutionID);
    var images = req.body.images;
    async.each(images, function(item, callback){
        var newFile = path.join('./public', item);
        console.log("Deleting image at " + newFile);
        fs.unlinkSync(newFile);
        callback();
    }, function(err){
        if (err) res.send(err);
    })
    res.send("k.");
})

router.post('/upload', multipartyMiddleware, function(req, res) {
    var files = req.files.files;
    console.log(req.body);
    var id = parseInt(req.body.id);
    var exists = 0;
    console.log("Sending image for solution " + id);
    var newFolderPath = path.join(filePath, id.toString());
    async.series({
        mkdir: function(callback) {
            mkdirp(newFolderPath, function(err) {
                callback(err);
            })
        },
        readdir: function(callback) {
            fs.readdir(newFolderPath, function(err, files) {
                if (files) {
                    var largest = 0;
                    for (i=0;i<=largest;i++){
                        if(parseInt(files[i])>largest){
                            largest = parseInt(files[i]);
                        }
                    }
                    exists = largest;
                }
                callback(err);
            })
        },
        rename: function(callback) {
            files.forEach(function(element, index, array) {
                var newFilePath = path.join(newFolderPath, (exists + index).toString());
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