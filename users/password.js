const bcrypt = require('bcryptjs');

exports.hash = function(password) {
  return new Promise(function(resolve, reject){
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
};

exports.check = function(password, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hash, function(err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
};