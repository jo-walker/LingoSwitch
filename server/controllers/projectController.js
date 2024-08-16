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
    const createdBy = req.user?.username || 'unknown';  // Get the username from the request
    const history = JSON.stringify({
      createdBy: req.user.id, // Store only user ID
      createdAt: new Date().toISOString()
    });
    

    // Create the project with the history
    const project = await Project.create({ name, languages, history });

    // Handle URLs and Strings (as in your existing code)

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
    const updatedBy = req.user?.username || 'unknown';  // Capture the username from the request

    const history = JSON.parse(project.history || '{}');
    history.updatedBy = req.user.id; // Store only user ID
    history.updatedAt = new Date().toISOString();
    

    await project.update({
      name,
      languages,
      history: JSON.stringify(history)
    });

    // Handle URLs and Strings (as in your existing code)

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
