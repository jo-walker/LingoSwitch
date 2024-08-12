const express = require('express');
const urlController = require('../controllers/urlController');
const router = express.Router();

router.get('/', urlController.getUrls);
router.post('/', urlController.createUrl);
router.get('/:id', urlController.getUrlById);
router.put('/:id', urlController.updateUrl);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;