const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  uid: {
    type: String,
    index: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastActivity: {
    type: Date,
    expire: '30d',
    default: Date.now
  }
});

module.exports = mongoose.model('Session', sessionSchema);