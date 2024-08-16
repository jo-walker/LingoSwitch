const sequelize = require('../config/database'); // this ensures that the sequelize instance is passed to the model
const URL = require('../models/URL')(sequelize); // Ensure sequelize instance is passed
const Project = require('../models/Project')(sequelize); // Add this line to import Project model

exports.createUrl = async (req, res) => {
  try {
    // Ensure the project exists (if required)
    const project = req.body.projectId ? await Project.findByPk(req.body.projectId) : null;

    // Fetch the latest URL record by ID for ID generation (same logic as before)
    const latestUrl = await URL.findOne({
      order: [['id', 'DESC']]
    });

    // Generate new ID in Uxxx format
    let newId;
    if (latestUrl) {
      const latestIdNumber = parseInt(latestUrl.id.slice(1));
      newId = `U${(latestIdNumber + 1).toString().padStart(3, '0')}`;
    } else {
      newId = 'U001';
    }

    // Capture creation history
    const history = {
      action: 'created',
      createdBy: req.body.createdBy,
      createdAt: new Date(),
    };
    // Create the new URL
    const newUrl = await URL.create({
      id: newId,
      url: req.body.url,
      projectId: req.body.projectId || null, // Nullable for general URLs
      history: [history], // Store initial creation history
    });

    res.status(201).json(newUrl);
  } catch (error) {
    console.error('Error creating URL:', error);
    res.status(500).json({ error: 'Unable to create URL' });
  }
};



exports.getUrls = async (req, res) => {
  try {
    const urls = await URL.findAll();
    console.log('Fetched URLs:', urls); // to log the fetched URLs
    res.json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'An error occurred while fetching URLs' });
  }
};

exports.getUrlById = async (req, res) => {
  try {
    const url = await URL.findByPk(req.params.id);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Parse the history JSON field
    const history = url.history ? JSON.parse(url.history) : [];

    res.status(200).json({ url, history });
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

    // Add previous version to the history
    const updatedHistory = url.history || [];
    updatedHistory.push({
      action: 'updated',
      oldUrl: url.url,
      updatedBy: req.body.createdBy, // Store the user who updated the URL
      updatedAt: new Date(),
    });

    // Update the URL and history
    await url.update({
      url: req.body.url,
      history: updatedHistory,
    });

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