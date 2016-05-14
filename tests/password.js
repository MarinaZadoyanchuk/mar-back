const test = require('tape');
const pass = require('../users/password');

test('password test', function(t) {
  t.plan(2);

  const password = "qweerertretert";
  pass.hash(password)
    .then(function(hash) {
      t.equal(typeof hash, "string");
      return pass.check(password, hash);
    })
    .then(function(res) {
      t.equal(res, true);
    });
});
