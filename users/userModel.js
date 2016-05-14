const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique : true,
    required : true
  },
  password: String,
  avatar: String
});

module.exports = mongoose.model('User', userSchema);