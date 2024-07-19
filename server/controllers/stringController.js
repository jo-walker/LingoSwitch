const StringModel = require('../models/String');
const { v4: uuidv4 } = require('uuid');

// Get all strings
exports.getStrings = async (req, res) => {
  try {
    const strings = await StringModel.find();
    res.json(strings);
  } catch (err) {
    console.error('Error fetching strings:', err);
    res.status(500).json({ message: 'Error fetching strings' });
  }
};

// Add a new string
exports.addString = async (req, res) => {
  console.log('Received request:', req.body);
  const { value, language, urls } = req.body;
  let { key } = req.body;

  // Validate input
  if (!value || !language || !urls || !Array.isArray(urls)) {
    console.error('Invalid input:', req.body);
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Generate a unique key if not provided
  if (!key) {
    key = uuidv4();
  }

  try {
    const newString = new StringModel({
      key,
      value,
      language,
      urls,
      deleted: false
    });

    const savedString = await newString.save();
    res.status(201).json(savedString);
  } catch (err) {
    console.error('Error adding string:', err);
    res.status(500).json({ message: err.message });
  }
};
