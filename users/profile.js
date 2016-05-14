const User = require('./userModel');

module.exports = function (req, res, next) {
  const userId = req.params.id ? req.params.id : req.userId;
  
  User.findById(userId)
    .then(function (user) {
      res.json({login : user.login, avatar: user.avatar});
    }, function(error) {
      next(error);
    });
};