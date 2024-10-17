// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { saveGameData } = require('../controllers/gameController');

// Define the POST route for saving game data
router.post('/games', (req, res, next) => {
    console.log('GAMEROUTES Received request to save game data:', req.body); // Log incoming request body
    next(); // Pass control to the next middleware/controller
}, saveGameData);

module.exports = router;
