const String = require('../models/String');

exports.getStrings = async (req, res) => {
  try {
    const strings = await String.find({ language: req.query.language, urls: req.query.url, deleted: false });
    res.json(strings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addString = async (req, res) => {
  try {
    const { value, language, urls } = req.body;
    const key = value.toLowerCase().replace(/\s+/g, '_');
    const existingString = await String.findOne({ key, language });

    if (existingString) {
      return res.status(400).json({ message: 'String already exists' });
    }

    const newString = new String({ key, value, language, urls });
    await newString.save();
    res.status(201).json(newString);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add more controller methods for update, delete etc.