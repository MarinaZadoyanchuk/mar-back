const User = require('./userModel');
const pass = require('./password');
const createSession = require('../sessions/create');
const HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
  const data = req.body;
  User.findOne({login: data.login})
    .then(function(user) {
      if (user) {
        userPassword = user.password;
        pass.check(data.password, userPassword)
          .then(function(compare){
            if (compare) {
              createSession(user)
                .then(function(uid) {
                  res.json({status: 200, token: uid, userId: user._id});
                }, function(err) {
                  return next(err);
                });
            } else {
              return next(new HttpError(403, "password is wrong"));
            }
          })
      } else {
        return next(new HttpError(403, "user not found"));
      }
    }, function() {
      return next();
    });
};