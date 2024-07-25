//model for strings

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 to generate unique key for each string entry 
const stringSchema = new mongoose.Schema({ // Define the schema for the strings collection
  key: {
    type: String, 
    default: uuidv4, // Generate a unique key for each string entry
    unique: true
  },
  value: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  urls: {
    type: [String],
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('String', stringSchema);