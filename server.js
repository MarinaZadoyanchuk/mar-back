const http = require('http');
const config = require('./config');
const mongoose = require('./lib/mongoose');
const express = require('express');
const app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.status(200).send('ok');
  next();
});
const HttpError = require('./error').HttpError;
app.use(require('./middleware/sendHttpError'));

app.use('/post', require('./posts/router'));

app.use('/user', require('./users/router'));

app.use(function(err, req, res, next) {
  if (typeof err == 'number') {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      const errorHandler = require('errorhandler');
      console.log(err);
      app.use(errorHandler());
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});


var server = http.createServer(app);
server.listen(config.get('port'), function() {
  console.log("Express server listen on port " + config.get('port'));
});

module.exports = app;
