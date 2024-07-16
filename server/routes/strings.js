const express = require('express');
const router = express.Router();
const stringController = require('../controllers/stringController');

router.get('/', stringController.getStrings);
router.post('/', stringController.addString);
// Add routes for update, delete etc.

module.exports = router;
