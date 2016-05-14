module.exports = function(req, res, next) {
  res.sendHttpError = function(error) {
    res.json(error);
  };

  next();
};