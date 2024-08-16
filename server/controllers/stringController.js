const { String } = require('../models'); // Import models


exports.createString = async (req, res) => {
  try {
    const createdBy = req.body.userId || null; // Retrieve user ID from the request

    // Build history for the string creation
    const history = [{
      action: 'created',
      createdAt: new Date().toISOString(),
      createdBy: createdBy,
    }];

    // Create the new string with the history field
    const newString = await String.create({
      ...req.body,
      history
    });

    res.status(201).json(newString);
  } catch (error) {
    console.error('Error creating string:', error);
    res.status(500).json({ error: 'Unable to create string' });
  }
};
exports.updateString = async (req, res) => {
  try {
    const string = await String.findByPk(req.params.id);
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }

    const updatedBy = req.body.userId || null; // Retrieve user ID from the request

    // Capture the old values
    const oldString = {
      eng_us: string.eng_us,
      fr: string.fr,
      de: string.de
    };

    // Build history entry for the update
    const updateHistory = {
      action: 'updated',
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy,
      oldString: oldString // Record the old values before updating
    };

    // Update the string and add the new history entry
    const updatedString = await string.update({
      ...req.body,
      history: [...(string.history || []), updateHistory] // Append the update history to existing history
    });

    res.status(200).json(updatedString);
  } catch (error) {
    console.error('Error updating string:', error);
    res.status(500).json({ error: error.message });
  }
};exports.deleteString = async (req, res) => {
  try {
    const string = await String.findByPk(req.params.id);
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }

    const deletedBy = req.body.userId || null; // Retrieve user ID from the request

    // Build history entry for the deletion
    const deleteHistory = {
      action: 'deleted',
      deletedAt: new Date().toISOString(),
      deletedBy: deletedBy
    };

    // Add the delete history to the record before deletion
    await string.update({
      history: [...(string.history || []), deleteHistory]
    });

    await string.destroy();
    res.status(204).json({ message: 'String deleted' });
  } catch (error) {
    console.error('Error deleting string:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getStringsByProjectId = async (req, res) => {
  try {
    console.log('Project ID:', req.params.projectId); // Debug log
    const strings = await String.findAll({ where: { projectId: req.params.projectId } });
    console.log('Retrieved Strings:', strings); // Debug log
    res.json(strings);
  } catch (error) {
    console.error('Error fetching strings:', error);
    res.status(500).json({ error: 'Unable to fetch strings' });
  }
};

exports.getStrings = async (req, res) => {
  try {
    const strings = await String.findAll();
    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching strings:', error);
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
    console.error('Error fetching string:', error);
    res.status(500).json({ error: 'Unable to fetch string' });
  }
};