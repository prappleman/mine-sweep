// routes/proxyRoutes.js
const express = require('express');
const { fetchData } = require('../services/proxyService');

const router = express.Router();

// Route to handle proxy requests
router.get('/proxy-request', async (req, res) => {
  try {
    const data = await fetchData(); // Call the proxy function
    res.status(200).json(data); // Return the data as JSON
  } catch (error) {
    console.error('Error in proxy route:', error);
    res.status(500).send('Request failed');
  }
});

module.exports = router;
