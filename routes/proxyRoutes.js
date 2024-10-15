// routes/proxyRoutes.js
const express = require('express');
const { fetchData } = require('../services/proxyService');

const router = express.Router();

router.get('/proxy-request', async (req, res) => {
  try {
    const data = await fetchData(); // Call the proxy function
    res.status(200).json(data); // Return the data as JSON
  } catch (error) {
    res.status(500).send('Request failed');
  }
});

module.exports = router;
