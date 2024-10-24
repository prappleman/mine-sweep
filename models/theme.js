// models/theme.js
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: false,
    },
    board: {
        type: String,
        required: false,
    },
}, {
    collection: 'themes'
});

// Create the model
const Theme = mongoose.model('Theme', themeSchema);

// Export the model
module.exports = Theme;
