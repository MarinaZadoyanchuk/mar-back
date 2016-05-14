const User = require("./userModel");
const pass = require("./password");
const createSession = require("../sessions/create");

module.exports = function(req, res, next) {
  const data = req.body;

  const user = new User();
  const token = '';

  user.login = data.login;
  user.avatar = data.avatar;

  pass.hash(data.password)
    .then(function(password) {
      user.password = password;
      return user.save();
    })
    .then(function(savedUser) {
      return createSession(savedUser);
    })
    .then(function(token) {
      res.json({token: token});
    }, function(error) {
      next(error);
    });
};