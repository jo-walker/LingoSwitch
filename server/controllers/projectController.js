const { Project } = require('../models');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { id, name, languages, history } = req.body;
    const newProject = await Project.create({ id, name, languages, history });
    res.status(201).json(newProject);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: error.errors.map(e => e.message) });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};


exports.updateProject = async (req, res) => {
  try {
    const { name, languages, history } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.update({ name, languages, history });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.destroy();
    res.status(204).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};