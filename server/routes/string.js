// routes/string.js
const express = require('express');
const stringController = require('../controllers/stringController');
const router = express.Router();

router.get('/string-by-url-and-lang', stringController.getStringByUrlAndLang);
router.get('/filter', stringController.getFilteredStrings);
router.get('/language/:language', stringController.getStringsByLanguage);
router.get('/context/:context', stringController.getStringsByContext);
router.get('/:id', stringController.getStringById);
router.put('/:id', stringController.updateString);
router.put('/toggle-status/:id', stringController.toggleStringStatus);
router.delete('/:id', stringController.deleteString);
router.post('/', stringController.createString);
router.post('/translate', stringController.translateString);
router.get('/', stringController.getStrings);
router.get('/strings', async (req, res) => {
  const { first, rows, sortField, sortOrder } = req.query;

  const sortOptions = {};
  if (sortField) {
    sortOptions[sortField] = sortOrder === '1' ? 1 : -1;  // Ascending or Descending
  }

  const strings = await StringModel.find()
    .sort(sortOptions)
    .skip(parseInt(first))
    .limit(parseInt(rows));

  const totalRecords = await StringModel.countDocuments();

  res.json({ strings, totalRecords });
});

// router.get('/strings', async (req, res) => {
//   try {
//     const { status, language, sort, order, page, pageSize } = req.query;
//     let filter = {};

//     if (status) {
//       filter.active = status === 'active';
//     }
//     if (language) {
//       filter.language = language;
//     }

//     let sortOptions = {};
//     if (sort) {
//       sortOptions[sort] = order === 'desc' ? -1 : 1;
//     }

//     const pageNum = parseInt(page) || 1;
//     const size = parseInt(pageSize) || 10;
//     const skip = (pageNum - 1) * size;

//     const strings = await StringModel.find(filter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(size);

//     res.json(strings);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
router.get('/strings', async (req, res) => {
  try {
    // Your existing code...
  } catch (error) {
    console.error('Error fetching strings:', error); // More descriptive error logging
    res.status(500).json({ error: 'Server error' });
  }
});
  
module.exports = router;