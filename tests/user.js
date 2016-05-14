const app = require('../server');
const request = require("supertest-as-promised");
const User = require('../users/userModel');
const Session = require('../sessions/sessionModel');

describe('User test', function() {
  it("Tests create users", function() {
    return User.remove({login: "Olexiy"})
      .then(function() {
        return request(app)
          .post("/user/create")
          .send({ login: "Olexiy", password: "1234567" })
          .expect(200);
      });
  });

  describe("Test login user", function() {
    it("Correct user", function() {
      return request(app)
        .post("/user/login")
        .send({login: "Olexiy", password: "1234567"})
        .expect(200);
    });

    it("Not found user", function() {
      return request(app)
        .post("/user/login")
        .send({login: "Maryna", password: ""})
        .expect(403);
    });

    it("Not correct user", function() {
      return request(app)
        .post("/user/login")
        .send({login: "Olexiy", password: "234"})
        .expect(403);
    });

    it("Not found user", function() {
      return request(app)
        .post("/user/login")
        .send({login: "Syrnyk", password: "234"})
        .expect(403);
    });

  });


  it("console.logs", function() {
    console.log("fjkdslfjsl")
  })
});

describe("Session test", function() {
  var userId = null;
  var uid = null;
  const newUser = {login: "Maryna1", password: "123456"};

  before(function() {
    return request(app)
      .post('/user/login')
      .send(newUser)
      .expect(200)
      .then(function(res) {
        return Session.findOne({uid: res.body.token}).populate('user')
            .then(function (session) {
              uid = res.body.token;
              userId = session.user.id;
            });
      }
      );
  });

  it("update user", function() {
    return request(app)
      .post('/user/update')
      .set('Authorization', uid)
      .send({login: "Maryna"})
      .expect(200);
  });

  it("Get sid exist user", function() {
    return request(app)
      .get('/user/' + userId)
      .set('Authorization', uid)
      .expect(200);
  });
});
