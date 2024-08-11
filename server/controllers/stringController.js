// projectController.js
const { Project } = require('../models'); // Correct way to import the Project model from your central models index

exports.createString = async (req, res) => {
  try {
    const newString = await String.create(req.body);
    res.status(201).json(newString);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create string' });
  }
};

exports.updateString = async (req, res) => {
  try {
    const string = await String.findByPk(req.params.id);
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }
    await string.update(req.body);
    res.status(200).json(string);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteString = async (req, res) => {
  try {
    const string = await String.findByPk(req.params.id);
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }
    await string.destroy();
    res.status(204).json({ message: 'String deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStringsByProjectId = async (req, res) => {
  try {
    const strings = await String.findAll({ where: { projectId: req.params.projectId } });
    res.json(strings);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch strings' });
  }
};

exports.getStrings = async (req, res) => {
  try {
    const strings = await String.findAll();
    res.status(200).json(strings);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch strings' });
  }
};

exports.getStringById = async (req, res) => {
  try {
    const string = await String.findByPk(req.params.id);
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }
    res.status(200).json(string);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch string' });
  }
};