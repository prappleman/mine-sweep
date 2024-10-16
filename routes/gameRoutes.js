// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { saveGameData } = require('../controllers/gameController');

// Define the POST route for saving game data
router.post('/games', saveGameData);

module.exports = router;
