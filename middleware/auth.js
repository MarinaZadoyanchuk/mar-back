const Session = require('../sessions/sessionModel');

module.exports = function(req, res, next) {
  const uid = req.header('Authorization');

  Session.findOne({uid: uid})
    .then(function(session){
      if (session) {
        req.userId = session.user;
        session.lastActivity = new Date();
        session.save()
          .then(function() {
            return next();
          });
      } else {
        return next(403, "Not authorized");
      }
    }, function() {
      return next(502, "Mongo not working");
    });
};