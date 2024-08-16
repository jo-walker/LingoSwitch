const sequelize = require('../config/database'); // this ensures that the sequelize instance is passed to the model
const URL = require('../models/URL')(sequelize); // Ensure sequelize instance is passed
const Project = require('../models/Project')(sequelize); // Add this line to import Project model

exports.createUrl = async (req, res) => {
  try {
    // Ensure the project exists
    const project = await Project.findByPk(req.body.projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Fetch the latest URL record by ID
    const latestUrl = await URL.findOne({
      order: [['id', 'DESC']]
    });

    // Generate new ID in Uxxx format
    let newId;
    if (latestUrl) {
      const latestIdNumber = parseInt(latestUrl.id.slice(1)); // Extract number part from "Uxxx"
      if (latestIdNumber >= 999) {
        return res.status(400).json({ error: 'Maximum number of URLs reached (U999)' });
      }
      const incrementedId = (latestIdNumber + 1).toString().padStart(3, '0'); // Increment and pad to 3 digits
      newId = `U${incrementedId}`;
    } else {
      newId = 'U001'; // If no URLs exist, start with U001
    }

    // Create the new URL
    const newUrl = await URL.create({
      id: newId,
      url: req.body.url,
      projectId: req.body.projectId
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