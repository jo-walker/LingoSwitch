const express = require('express');
const router = express.Router();
const stringController = require('../controllers/stringController');

router.get('/', stringController.getStrings);
router.post('/', stringController.addString);

module.exports = router;
