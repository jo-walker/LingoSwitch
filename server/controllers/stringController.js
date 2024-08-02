const { String } = require('../models');

exports.getStrings = async (req, res) => {
  try {
    const strings = await String.findAll();
    res.status(200).json(strings);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

exports.createString = async (req, res) => {
  try {
    const { urlId, eng_us, fr, de, userId, projectId, history } = req.body;
    const newString = await String.create({ urlId, eng_us, fr, de, userId, projectId, history });
    res.status(201).json(newString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateString = async (req, res) => {
  try {
    const { urlId, eng_us, fr, de, userId, projectId, history } = req.body;
    const string = await String.findByPk(req.params.id);
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }
    await string.update({ urlId, eng_us, fr, de, userId, projectId, history });
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