// routes/themeRoutes
const express = require('express');
const { saveTheme, getTheme } = require('../controllers/themeController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Route to save user theme preferences
router.post('/save', saveTheme);

// Route to get user theme preferences
router.get('/get', getTheme);

module.exports = router;
