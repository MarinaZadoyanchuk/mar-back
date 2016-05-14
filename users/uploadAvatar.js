const AWS = require('aws-sdk');
const config = require('../config');
const fs = require('fs');

module.exports = function(req, res, next) {
  
  const fileStream = require('fs').createReadStream(req.file.path);

  fileStream.on('error', function(err) {
    console.log('error', err);
    next(err);
  });

  fileStream.on('open', function() {
    AWS.config.credentials = config.get('aws:credentials');
    AWS.config.region = config.get('aws:region');
    
    const params = {Key: 'public/' + req.file.filename, ContentType: req.file.mimetype, Body: fileStream, ACL: 'public-read'};

    var s3bucket = new AWS.S3({params: {Bucket: 'mar.images'}});
    s3bucket.upload(params)
      .send(function(err, data) {
        if (err) return next(err);

        res.json({url: data.Location});
      });
  });
}

