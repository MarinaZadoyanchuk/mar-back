const User = require('./userModel');

module.exports = function(req, res, next) {
  const userId = req.userId;
  var updateData = {};

  if (req.body.login) updateData.login = req.body.login;
  if (req.body.avatar) updateData.avatar = req.body.avatar;

  User.update({_id: userId}, updateData)
    .then(function(raw) {
      res.json({status: 200});
    }, function(error) {
      return next(error);
    })
}