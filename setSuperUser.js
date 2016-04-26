#!/usr/bin/env node
// This script is used to set a new password for superuser mode for the web app.
// This is intended to be used by an administrator ONLY. 


var prompt = require('prompt');
var jsonFile = require('jsonfile');
var bCrypt = require('bcrypt');
var salt = bCrypt.genSaltSync(10);
var newData = {};

var secretFile = './config/userSecret.json';

var schema = {
    properties: {
      username: {
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      password: {
        hidden: true
      }
    }
  };
  console.log('=====USERNAME AND PASSWORD RESET=====');
  prompt.start();
  prompt.get(schema, function (err, result) {
    var newPass = bCrypt.hashSync(result.password, salt);
    console.log('New user name and password received:');
    console.log('  name: ' + result.username);
    console.log('  password: ' + result.password);
    newData[result.username] = newPass;
    jsonFile.writeFile(secretFile, newData, function(err){
      if (err) throw err;
    })
    console.log("New username and password saved!");
  });