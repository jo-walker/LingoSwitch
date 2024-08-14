const { Project, String, URL } = require('../models');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: ['urls', 'strings'] // Include associated URLs and Strings if needed
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Unable to fetch projects' });
  }
};

exports.createProjectWithStrings = async (req, res) => {
  const { name, languages, urls, strings } = req.body;
  try {
    const createdBy = req.user?.username || 'unknown'; // get the username from the token
    const history = JSON.stringify({
      createdBy: createdBy,
      createdAt: new Date().toISOString()
    });

    // Create the project with the history including createdBy and createdAt
    const project = await Project.create({ name, languages, history });

    if (urls && urls.length > 0) { // Add URLs to the project if provided
      for (const urlId of urls) {
        const url = await URL.findByPk(urlId);
        if (url) {
          await project.addUrl(url);
        } else {
          const newUrl = await URL.create({ id: urlId, url: urlId });
          await project.addUrl(newUrl);
        }
      }
    }

    if (strings && strings.length > 0) { // Add strings to the project if provided
      for (const stringId of strings) {
        const string = await String.findByPk(stringId);
        if (string) {
          await project.addString(string);
        } else {
          const newString = await String.create({ id: stringId, eng_us: '', fr: '', de: '' });
          await project.addString(newString);
        }
      }
    }

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project with strings:', error);
    res.status(500).json({ error: 'Unable to create project with strings' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: ['urls', 'strings']
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, languages, urls, strings } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const updatedBy = req.user?.username || 'unknown';

    // Parse the history JSON string to an object
    const history = JSON.parse(project.history || '{}');

    history.updatedBy = updatedBy;
    history.updatedAt = new Date().toISOString();

    await project.update({
      name,
      languages,
      history: JSON.stringify(history)
    });

    // Add URLs to the project if provided
    if (urls && urls.length > 0) {
      for (const urlId of urls) {
        const url = await URL.findByPk(urlId);
        if (url) {
          await project.addUrl(url);
        } else {
          const newUrl = await URL.create({ id: urlId, url: urlId });
          await project.addUrl(newUrl);
        }
      }
    }

    // Add strings to the project if provided
    if (strings && strings.length > 0) {
      for (const stringId of strings) {
        const string = await String.findByPk(stringId);
        if (string) {
          await project.addString(string);
        } else {
          const newString = await String.create({ id: stringId, eng_us: '', fr: '', de: '' });
          await project.addString(newString);
        }
      }
    }

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
