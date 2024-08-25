// routes/string.js
const express = require('express');
const stringController = require('../controllers/stringController');
const router = express.Router();

router.get('/filter', stringController.getFilteredStrings);
router.get('/string-by-url-and-lang', stringController.getStringByUrlAndLang);
router.get('/language/:language', stringController.getStringsByLanguage);
router.get('/context/:context', stringController.getStringsByContext);
router.put('/toggle-status/:id', stringController.toggleStringStatus);
router.get('/:id', stringController.getStringById); 
router.post('/', stringController.createString);
router.get('/', stringController.getStrings);
router.get('/:id', stringController.getStringById); 
router.put('/:id', stringController.updateString);
router.delete('/:id', stringController.deleteString);
router.post('/translate', stringController.translateString); // for google api translation 
// router.get('/language/:language', stringController.getStringsByLanguage);
// router.get('/context/:context', stringController.getStringsByContext);
// router.get('/filter', stringController.getFilteredStrings);
// router.get('/filter', (req, res) => {
//     console.log('Filter route hit!');
//     stringController.getFilteredStrings(req, res);
//   });
router.get('/string-by-url-and-lang', stringController.getStringByUrlAndLang);

module.exports = router;