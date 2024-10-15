const express = require('express');
const { fetchData } = require('../services/proxyService'); // Import from the new service file
const router = express.Router();

router.get('/proxy-request', async (req, res) => {
  try {
    await fetchData();  // Call the proxy request function
    res.status(200).send('Request successful');
  } catch (error) {
    res.status(500).send('Request failed');
  }
});

module.exports = router;
