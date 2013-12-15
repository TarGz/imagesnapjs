"use strict";

var fs = require('fs');
var exec = require('child_process').exec;

var bin = __dirname + '/../bin/imagesnap ';

module.exports = {
  shoot: shoot
};


// TODOs:
// rewrite this ugly pyramid with Q
// return correct err objects
// wrap exec

function shoot(imagePath, callback) {
  fs.exists(imagePath,function(exists) {
    if (exists) {
      callback({error:'File exists!'});
    } else {
      var dirPath = imagePath.replace(/\/[^\/]+$/,'');
      fs.exists(dirPath,function(exists) {
        if (!exists) {
          callback({error:'Containing directory does not exists!'});
        } else {
          exec(bin + imagePath, function(err, stdout, stderr) {
            fs.exists(imagePath,function(exists) {
              if (!exists) {
                callback({error:'Failed to create file!'});
              } else {
                callback(null);
              }
            });
          });
        }
      });
    }
  });
}