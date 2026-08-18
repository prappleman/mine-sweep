const express = require('express');
const { saveScore, getScores } = require('../controllers/gameController');

const router = express.Router();

router.post('/scores', saveScore);
router.get('/scores', getScores);

module.exports = router;
