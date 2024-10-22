const express = require('express');
const router = express.Router();
const { saveGameData, getAllGames } = require('../controllers/gameController');

// POST route for saving game data
router.post('/games', (req, res, next) => {
    console.log('GAMEROUTES Received request to save game data:', req.body);
    next();
}, saveGameData);

// GET route to fetch all games
router.get('/games', getAllGames);

module.exports = router;
