// routes/string.js
const express = require('express');
const stringController = require('../controllers/stringController');
const router = express.Router();

router.post('/', stringController.createString);
router.get('/', stringController.getStrings);
router.get('/:id', stringController.getStringById); 
router.put('/:id', stringController.updateString);
router.delete('/:id', stringController.deleteString);
router.put('/toggle-status/:id', stringController.toggleStringStatus);

module.exports = router;