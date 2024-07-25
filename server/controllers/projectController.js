const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, languages } = req.body;
    const project = new Project({ name, languages });
    await project.save();
    res.status(201).json({ message: 'Project created', project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};