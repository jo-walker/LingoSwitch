const { Op } = require('sequelize');
const { String } = require('../models'); // Import models
const { translateText } = require('../utils/translateService');
const languageMapping = {
  en: 'eng_us',
  fr: 'fr',
  de: 'de'
};
exports.createString = async (req, res) => {
  try {
    const { eng_us, fr, de, context, projectId } = req.body;

    // Validate context
    if (!context) {
      return res.status(400).json({ error: 'Context is required (e.g., masculine, feminine, plural).' });
    }
    if (!eng_us) {
      return res.status(400).json({ error: 'English text is required.' });
    }

    // Ensure userId is attached from the authenticated request
    const userId = req.user ? req.user.id : null;

    // Translate English string to French and German (if not provided)
    const frTranslation = fr || await translateText(eng_us, 'fr');
    const deTranslation = de || await translateText(eng_us, 'de');

    // Build history for the string creation
    const history = [{
      action: 'created',
      userId: userId,
      projectId: projectId,
      createdAt: new Date().toISOString(),
    }];

    // Create a new string in the database with history and optional projectId
    const newString = await String.create({
      eng_us,
      fr: frTranslation,
      de: deTranslation,
      context, // Pass context as part of the record
      userId: userId,
      projectId: projectId,
      history,
    });

    // Send success response with the new string
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

    const updatedBy = req.user ? req.user.id : null;

    // Capture the old values, including context
    const oldString = {
      eng_us: string.eng_us,
      fr: string.fr,
      de: string.de,
      context: string.context,
    };

    // Build history entry for the update
    const updateHistory = {
      action: 'updated',
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy,
      oldString: oldString,
    };

    // Update the string and add the new history entry
    const updatedString = await string.update({
      ...req.body,
      history: [...(string.history || []), updateHistory],
    });

    res.status(200).json(updatedString);
  } catch (error) {
    console.error('Error updating string:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteString = async (req, res) => {
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
    console.log('Retrieved Strings:', strings); 
    res.json(strings);
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
exports.getAllStrings = async (req, res) => {
  try {
    const strings = await String.findAll();
    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching all strings:', error);
    res.status(500).json({ error: 'Unable to fetch strings' });
  }
};

exports.getActiveStrings = async (req, res) => {
  try {
    const strings = await String.findAll({
      where: { status: 'active' },
    });
    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching active strings:', error);
    res.status(500).json({ error: 'Unable to fetch active strings' });
  }
};
// a method to update the status of a string. Here's a method for toggling between active and inactive
exports.toggleStringStatus = async (req, res) => {
  try {
    const string = await String.findByPk(req.params.id); 
    if (!string) {
      return res.status(404).json({ error: 'String not found' });
    }

    // Toggle the status
    string.active = !string.active;
    await string.save();

    res.status(200).json({ message: 'String status updated', active: string.active });
  } catch (error) {
    console.error('Error toggling string status:', error);
    res.status(500).json({ error: 'Unable to toggle string status' });
  }
};
exports.getStrings = async (req, res) => {
  try {
    const statusFilter = req.query.status;
    let condition = {};

    if (statusFilter && statusFilter !== 'all') {
      condition.active = statusFilter === 'active' ? true : false;
    }

    const strings = await String.findAll({
      where: condition,
    });

    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching strings:', error);
    res.status(500).json({ error: 'Unable to fetch strings' });
  }
};
// a method to translate a string into French and German using the Google Translate API
exports.translateString = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text to translate is missing.' });
    }

    // Translate the text into French and German
    const frTranslation = await translateText(text, 'fr');
    const deTranslation = await translateText(text, 'de');

    // Return the translations to the frontend
    res.status(200).json({ fr: frTranslation, de: deTranslation });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Unable to translate string' });
  }
};
exports.getStringByUrlAndLang = async (req, res) => {
  try {
    const { urlId, stringId, lang } = req.query;

    if (!urlId || !stringId || !lang) {
      return res.status(400).json({ error: 'URL ID, String ID, and language are required.' });
    }

    const string = await String.findOne({
      where: { urlId: urlId, id: stringId },
    });

    if (!string) {
      return res.status(404).json({ error: 'String not found.' });
    }

    // Select the correct language value
    let translation;
    if (lang === 'fr') {
      translation = string.fr;
    } else if (lang === 'de') {
      translation = string.de;
    } else {
      translation = string.eng_us;
    }

    res.status(200).json({ key: stringId, value: translation });
  } catch (error) {
    console.error('Error fetching string:', error);
    res.status(500).json({ error: 'Unable to fetch string' });
  }
};
exports.getStringsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    const column = languageMapping[language];  // Map the language code to the DB column

    if (!column) {
      return res.status(400).json({ error: 'Invalid language code.' });
    }

    const strings = await String.findAll({
      where: { [column]: { [Op.ne]: null } }  // Select where the language column is not null
    });

    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching strings by language:', error);
    res.status(500).json({ error: 'Unable to fetch strings by language' });
  }
};
exports.getStringsByContext = async (req, res) => {
  try {
    const { context } = req.params;

    const strings = await String.findAll({
      where: { context }
    });

    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching strings by context:', error);
    res.status(500).json({ error: 'Unable to fetch strings by context' });
  }
};
// exports.getFilteredStrings = async (req, res) => {
//   try {
//     const { status } = req.query;
//     let condition = {};

//     // Add a log to check the status filter value
//     console.log('Received status filter:', status);

//     if (status && status !== 'all') {
//       condition.active = status === 'active';  // Log the condition applied
//       console.log('Condition applied:', condition);
//     }

//     const strings = await String.findAll({
//       where: condition,
//     });

//     res.status(200).json(strings);
//   } catch (error) {
//     console.error('Error fetching strings:', error);
//     res.status(500).json({ error: 'Unable to fetch strings' });
//   }
// };
// exports.getFilteredStrings = async (req, res) => {
//   try {
//     let condition = { active: true };  // Hardcoded to only return active strings

//     const strings = await String.findAll({
//       where: condition,
//     });

//     res.status(200).json(strings);
//   } catch (error) {
//     console.error('Error fetching strings:', error);
//     res.status(500).json({ error: 'Unable to fetch strings' });
//   }
// // };
// exports.getFilteredStrings = async (req, res) => {
//   try {
//     const { status, language, context } = req.query;
//     let condition = {};

//     // Log the received query parameters
//     console.log('Received Query Params - Status:', status, 'Language:', language, 'Context:', context);

//     // Apply status filter
//     if (status && status !== 'all') {
//       condition.active = status === 'active';
//     }

//     // Apply language filter if provided and valid
//     if (language && language.trim() !== '') {
//       const column = languageMapping[language.trim()];
//       if (!column) {
//         return res.status(400).json({ error: 'Invalid language code.' });
//       }
//       condition[column] = { [Op.ne]: null };
//     }

//     // Apply context filter if provided
//     if (context && context.trim() !== '') {
//       condition.context = context.trim();
//     }

//     // Log the condition being applied to the query
//     console.log('Condition applied to the query:', condition);

//     // Query the database with the condition
//     const strings = await String.findAll({ where: condition });

//     // Check if any strings are found
//     if (strings.length === 0) {
//       console.log('No strings found for the applied filter');
//       return res.status(404).json({ error: 'String not found' });
//     }

//     res.status(200).json(strings);
//   } catch (error) {
//     console.error('Error fetching filtered strings:', error);
//     res.status(500).json({ error: 'Unable to fetch strings' });
//   }
// };
exports.getFilteredStrings = async (req, res) => {
  try {
    const { status } = req.query;
    let condition = {};

    if (status && status !== 'all') {
      condition.active = status === 'active';
    }

    const strings = await String.findAll({ where: condition });

    if (strings.length === 0) {
      return res.status(404).json({ error: 'String not found' });
    }

    res.status(200).json(strings);
  } catch (error) {
    console.error('Error fetching strings:', error);
    res.status(500).json({ error: 'Unable to fetch strings' });
  }
};

// exports.getFilteredStrings = async (req, res) => {
//   try {
//     const { language, context, status } = req.query;
//     let condition = {};

//     // Apply status filter if provided
//     if (status && status !== 'all') {
//       condition.active = status === 'active';
//     }

//     // Apply language filter if provided
//     if (language && language.trim() !== '') {
//       const column = languageMapping[language.trim()];
//       if (!column) {
//         return res.status(400).json({ error: 'Invalid language code.' });
//       }
//       condition[column] = { [Op.ne]: null };
//     }

//     // Apply context filter if provided
//     if (context && context.trim() !== '') {
//       condition.context = context.trim();
//     }

//     const strings = await String.findAll({ where: condition });

//     res.status(200).json(strings);
//   } catch (error) {
//     console.error('Error fetching strings:', error);
//     res.status(500).json({ error: 'Unable to fetch strings' });
//   }
// };

// const activeStrings = await String.findAll({
//   where: { active: true },
// });

// console.log(activeStrings);  // Log to check the output