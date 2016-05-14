const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/create', auth, require('./createPost'));

module.exports = router;