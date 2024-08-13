const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const urlController = require('../controllers/urlController');
const stringController = require('../controllers/stringController');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.get('/', authMiddleware, projectController.getAllProjects); //getting all projects
router.get('/:id', authMiddleware, projectController.getProjectById);
router.post('/', authMiddleware, projectController.createProjectWithStrings);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

// Separate routes for URLs and strings
router.post('/urls', authMiddleware, urlController.createUrl); 
router.post('/strings', authMiddleware, stringController.createString);

module.exports = router;