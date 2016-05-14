const Session = require('./sessionModel');
const generateUid = require('uid-safe').sync;

module.exports = function(user) {
  var session = new Session();
  session.uid = generateUid(40);
  session.user = user.id;

  return session.save().then(function() {
      return session.uid;
    });
};


