const app = require('../server');
const request = require("supertest-as-promised");

describe("Post test", function(){
  var token = '';

  before(function() {
    return request(app)
      .post('/user/login')
      .send({login: "Olexiy", password: "123"})
      .expect(200)
      .then(function(res) {
        token = res.body.token;
      });
  });
  it("create post", function() {
      return request(app)
        .post('/post/create')
        .set('Authorization', token)
        .send({postBody: "asjahsjahsjahsaksashaksh"})
        .expect(200);
      });
});