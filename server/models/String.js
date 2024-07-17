const mongoose = require('mongoose');

const StringSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  language: { type: String, required: true },
  urls: [{ type: String }],
  deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('String', StringSchema);
