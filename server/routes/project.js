const express = require('express');
const { Project } = require('../models');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new project
// Create a new project
router.post('/', verifyToken, async (req, res) => {
    try {
      const { name, languages } = req.body;
      const newProject = await Project.create({ name, languages });
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a project by ID
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.update(req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get project by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Debugging 
router.post('/', verifyToken, async (req, res) => {
    try {
      console.log('Request body:', req.body);
      const { name, languages } = req.body;
      const newProject = await Project.create({ name, languages });
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;