var express = require('express');
var bCrypt = require('bcryptjs');
var router = express.Router();
var userSecret = require('../config/userSecret.json');
var salt = bCrypt.genSaltSync(10);
var newPass = bCrypt.hashSync("bacon", salt);
router.post('/login', function(req, res) {
    //User name is extremely exposed.
    if (req.body.username in userSecret && 
        (bCrypt.compareSync(req.body.password, userSecret[req.body.username]))) {
            console.log("Logged in successfully");
            global.sess = req.session;
            global.sess.authenticated = true;
            res.send({
                state: 'success',
                user: req.body.username
            })
        } else {
        console.log("Log in attempt failed.");
        res.send({
            state: 'failure',
            user: null,
            message: "Invalid username or password"
        });
    }
})
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) throw err;
        res.sendStatus(200);
    }); 
})
module.exports = router;