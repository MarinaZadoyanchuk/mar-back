const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  body: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);