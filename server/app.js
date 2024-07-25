const express = require('express');
const connectDB = require('./config/db');
const stringRoutes = require('./routes/strings');
const StringModel = require('./models/String');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const app = express(); // Initialize express app instance to use its methods and properties like .use(), .get(), .post(), etc. 

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());

// API endpoint to fetch supported languages
app.get('/api/languages', async (req, res) => {
  try {
    const languages = await StringModel.distinct('language');
    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving languages', error });
  }
});

// API endpoint to fetch strings based on URL and language
app.get('/api/strings', async (req, res) => {
  const { url, language } = req.query;
  try {
    const strings = await StringModel.find({
      urls: url,
      language: language,
      deleted: false,
    });
    res.json(strings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving strings', error });
  }
});

// API endpoint to add new strings
app.post('/api/strings', async (req, res) => {
  const { value, language, urls } = req.body;

  try {
    const existingString = await StringModel.findOne({ value, language, deleted: false });
    if (existingString && !urls.every(url => existingString.urls.includes(url))) {
      return res.status(409).json({
        message: `String with value "${value}" already exists in another URL(s): ${existingString.urls.join(', ')}. Do you want to add it to the new URL(s)?`
      });
    }

    const newString = new StringModel({
      key: uuidv4(),
      value,
      language,
      urls,
      deleted: false
    });

    const savedString = await newString.save();
    res.status(201).json(savedString);
  } catch (error) {
    res.status(500).json({ message: 'Error saving string', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
