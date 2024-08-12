const sequelize = require('../config/database'); // this ensures that the sequelize instance is passed to the model
const URL = require('../models/URL')(sequelize); // Ensure sequelize instance is passed
exports.createUrl = async (req, res) => {
  try {
    console.log('Available methods on URL model:', Object.keys(URL));
    const newUrl = await URL.create(req.body);
    res.status(201).json(newUrl);
  } catch (error) {
    console.error('Error creating URL:', error);
    res.status(500).json({ error: 'Unable to create URL' });
  }
};

exports.getUrls = async (req, res) => {
  try {
    console.log('Available methods on URL model:', Object.keys(URL));
    const urls = await URL.findAll();
    res.status(200).json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Unable to fetch URLs' });
  }
};

exports.getUrlById = async (req, res) => {
  try {
    const url = await URL.findByPk(req.params.id);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.status(200).json(url);
  } catch (error) {
    console.error('Error fetching URL by ID:', error);
    res.status(500).json({ error: 'Unable to fetch URL' });
  }
};

exports.updateUrl = async (req, res) => {
  try {
    const url = await URL.findByPk(req.params.id);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    await url.update(req.body);
    res.status(200).json(url);
  } catch (error) {
    console.error('Error updating URL:', error);
    res.status(500).json({ error: 'Unable to update URL' });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const url = await URL.findByPk(req.params.id);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    await url.destroy();
    res.status(204).json({ message: 'URL deleted' });
  } catch (error) {
    console.error('Error deleting URL:', error);
    res.status(500).json({ error: 'Unable to delete URL' });
  }
};