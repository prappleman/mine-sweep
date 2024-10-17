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
}, { 
    timestamps: true,
    collection: 'games'
});

// Create the model
const Game = mongoose.model('Game', gameSchema, 'games');

// Logging the export process
console.log('GAME Exporting Game model to MongoDB...', gameSchema);

// Export the model
module.exports = Game;

console.log('GAME Game model exported successfully.', gameSchema);
