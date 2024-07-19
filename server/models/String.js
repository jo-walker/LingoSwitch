const mongoose = require('mongoose');

const stringSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true // Ensure the key is unique
  },
  value: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  urls: [String],
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('String', stringSchema);
