const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const urlController = require('../controllers/urlController');
const stringController = require('../controllers/stringController');

// Define routes
router.get('/', projectController.getAllProjects); //getting all projects
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProjectWithStrings);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Separate routes for URLs and strings
router.post('/urls', urlController.createUrl); 
router.post('/strings', stringController.createString);

module.exports = router;