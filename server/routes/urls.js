const express = require('express');
const { URL } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const url = await URL.create(req.body);
    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create URL' });
  }
});

module.exports = router;