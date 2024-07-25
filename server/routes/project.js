// Implementing the necessary API endpoints in Express to handle the CRUD operations for projects and strings.

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add a new project
router.post('/', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
});

// Edit a project
router.put('/:id', async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProject);
});

// Delete a project
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
