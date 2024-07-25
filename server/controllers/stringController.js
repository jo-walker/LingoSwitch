const { String, Project, URL, User } = require('../models');

exports.createString = async (req, res) => {
  try {
    const { projectId, urlId, eng_us, fr, de, userId } = req.body;
    const newString = await String.create({
      projectId,
      urlId,
      eng_us,
      fr,
      de,
      userId,
      oldValue: '',
      newValue: ''
    });
    res.status(201).json({ message: 'String created', newString });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getString = async (req, res) => {
  try {
    const { id } = req.params;
    const string = await String.findByPk(id, { include: [Project, URL, User] });
    res.json(string);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateString = async (req, res) => {
  try {
    const { id } = req.params;
    const { eng_us, fr, de, urls } = req.body;
    const string = await String.findByPk(id);
    const oldValue = JSON.stringify({ eng_us: string.eng_us, fr: string.fr, de: string.de });
    const newValue = JSON.stringify({ eng_us, fr, de });
    await string.update({ eng_us, fr, de, oldValue, newValue });
    res.json({ message: 'String updated', string });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteString = async (req, res) => {
  try {
    const { id } = req.params;
    await String.destroy({ where: { id } });
    res.json({ message: 'String deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStringsByUrl = async (req, res) => {
  try {
    const { urlId } = req.query;
    const strings = await String.findAll({ where: { urlId } });
    res.json(strings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const String = require('../models/String');

// exports.createString = async (req, res) => {
//   console.log("create str request body: ",req.body); //
//   try {
//     const { projectId, values, urls } = req.body;
//     const key = `S_${new Date().getTime()}`;
//     const string = new String({ key, values, urls, projectId });
//     await string.save();
//     res.status(201).json({ message: 'String created', string });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getStringsByProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const strings = await String.find({ projectId, isDeleted: false });
//     res.json(strings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };