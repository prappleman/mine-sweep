const Game = require('../models/game');

const saveGameData = async (req, res) => {
    const { totalTime, minesLeft, userFirstName } = req.body;

    // Log the received game data to ensure the request is working
    console.log('GAMECONTROLLER Received game data:', { totalTime, minesLeft, userFirstName });

    // Get the current date and format it to "MM/DD/YYYY"
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    try {
        // Create a new game instance
        const newGame = new Game({ 
            totalTime, 
            minesLeft, 
            userFirstName, 
            date: formattedDate 
        });
        
        console.log('GAMECONTROLLER Preparing to save the game with data:', newGame);
        // Save the new game document
        const savedGame = await newGame.save();
        
        // Log the saved game document for confirmation
        console.log('GAMECONTROLLER Game data saved successfully:', savedGame);

        // Respond with success
        res.status(201).json({ message: 'Game data saved', game: savedGame });
    } catch (error) {
        console.error('Error saving game data:', error); // Log error details
        res.status(400).json({ message: 'Error saving game data', error });
    }
};

// Controller to fetch all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({}); // Fetch all games
        res.json(games); // Send all games as JSON
    } catch (error) {
        console.error('Error fetching all games:', error);
        res.status(500).json({ message: 'Error fetching all game data' });
    }
};

module.exports = { saveGameData, getAllGames };