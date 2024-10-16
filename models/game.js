const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    totalTime: {
        type: String,
        required: true,
    },
    minesLeft: {
        type: Number,
        required: true,
    },
    userFirstName: {
        type: String,
        required: true,
    },
    date: {
        type: String, // Store as a string in "MM/DD/YYYY" format
        required: true,
    },
});

// Export the model
module.exports = mongoose.model('Game', gameSchema, 'games');
