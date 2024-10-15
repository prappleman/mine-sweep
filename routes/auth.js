const express = require('express');
const authController = require('../controllers/authController');
const { fetchData } = require('../services/proxyService'); // Adjust path to proxyService.js

const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Proxy request route
router.get('/proxy-request', async (req, res) => {
  try {
    await fetchData();  // Call the proxy function
    res.status(200).send('Request successful');
  } catch (error) {
    res.status(500).send('Request failed');
  }
});

module.exports = router;
