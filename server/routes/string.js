const express = require('express');
const { createString, getString, updateString, deleteString, getStringsByUrl } = require('../controllers/stringController');
const router = express.Router();

router.post('/', createString);
router.get('/:id', getString);
router.put('/:id', updateString);
router.delete('/:id', deleteString);
router.get('/by-url', getStringsByUrl);

module.exports = router;

// const express = require('express');
// const { createString, getStringsByProject } = require('../controllers/stringController');
// const router = express.Router();

// router.post('/', createString); // `createString` is correctly imported
// router.get('/:projectId', getStringsByProject); 
// module.exports = router;