const Game = require('../models/game');

const INITIALS_PATTERN = /^[A-Z0-9]{3}$/;

const saveScore = async (req, res) => {
  const initials = String(req.body.initials || '').trim().toUpperCase();
  const timeMs = Number(req.body.timeMs);

  if (!INITIALS_PATTERN.test(initials) || !Number.isFinite(timeMs) || timeMs < 0) {
    return res.status(400).json({ message: 'Invalid score' });
  }

  try {
    const score = await Game.create({ initials, timeMs, won: true });
    return res.status(201).json(score);
  } catch (error) {
    console.error('Error saving score:', error);
    return res.status(500).json({ message: 'Error saving score' });
  }
};

const getScores = async (req, res) => {
  try {
    const scores = await Game.find({ won: true, timeMs: { $exists: true } })
      .sort({ timeMs: 1 })
      .limit(10)
      .lean();
    return res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    return res.status(500).json({ message: 'Error fetching scores' });
  }
};

module.exports = { saveScore, getScores };
