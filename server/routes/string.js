const express = require('express');
const router = express.Router();
const stringController = require('../controllers/stringController');

// Define routes
router.get('/', stringController.getStrings);
router.get('/:id', stringController.getStringById);
router.post('/', stringController.createString);
router.put('/:id', stringController.updateString);
router.delete('/:id', stringController.deleteString);

module.exports = router;
