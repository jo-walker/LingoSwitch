// model for project
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  languages: { type: [String], required: true },
//   users: { type: [String] }, // Optional: List of user IDs with access to the project
});

module.exports = mongoose.model('Project', ProjectSchema);