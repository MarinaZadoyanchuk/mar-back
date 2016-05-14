const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const generateUid = require('uid-safe').sync;
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, '/tmp/marUploads') },
  filename: function (req, file, cb) { cb(null, generateUid(16));}
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024}});

// router.use(upload);

router.post('/create', require('./createUser'));

router.post('/login', require('./login'));

router.get('/:id?', auth, require('./profile'));

router.post('/avatar', upload.single('file'), require('./uploadAvatar'));

router.post('/update', auth, require('./update'));

router.get('/sessionCheck', auth, function(req, res) {
  res.send("user exist");
});

module.exports = router;