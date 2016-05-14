const Post = require('./postModel');

module.exports = function(req, res, next) {
  const data = req.body;

  const post = new Post();

  post.body = data.postBody;

  post.userId = req.userId;

  post.save()
    .then(function(savedPost) {
      res.send("Saved post");
    }, function(err) {
      next(err);
    });
};