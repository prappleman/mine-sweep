const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  initials: {
    type: String,
    required: true,
    uppercase: true,
    minlength: 3,
    maxlength: 3,
  },
  timeMs: {
    type: Number,
    required: true,
    min: 0,
  },
  won: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  collection: 'games',
});

module.exports = mongoose.model('Game', gameSchema, 'games');
