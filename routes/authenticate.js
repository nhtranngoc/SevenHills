var express = require('express');
var bCrypt = require('bcrypt');
var router = express.Router();
var secret = require('../config/secret.json');

var salt = bCrypt.genSaltSync(10);
var newPass = bCrypt.hashSync("bacon", salt);

router.post('/login', function(req, res){
	//User name is extremely exposed.
	if (req.body.username == 'jeandesroches') {
		if (bCrypt.compareSync(req.body.password, secret.jeandesroches)){
			console.log("Logged in successfully");
			res.send({state: 'success', user: req.body.username})
		}
	} else {
		console.log("Log in attempt failed.");
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	}
})

module.exports = router;