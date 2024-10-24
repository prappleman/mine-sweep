// controllers/themeControllers
const Theme = require('../models/theme');

// Function to save or update user theme preferences
const saveTheme = async (req, res) => {
    try {
        const { theme, board, userFirstName } = req.body;

        // Check if userFirstName is provided
        if (!userFirstName) {
            console.log(userFirstName)
            return res.status(400).json({ message: 'User first name is required' });
        }

        // Check if at least theme or board is provided
        if (!theme && !board) {
            return res.status(400).json({ message: 'At least theme or board must be provided' });
        }

        console.log('Received theme data:', { theme, board, userFirstName });

        // Check if a theme already exists for this user based on their first name
        let userTheme = await Theme.findOne({ userFirstName });

        if (userTheme) {
            // Update the existing theme settings (only the fields that are provided)
            if (theme) userTheme.theme = theme;
            if (board) userTheme.board = board;
            await userTheme.save();
        } else {
            // Create new theme settings for this user (only the fields that are provided)
            userTheme = new Theme({ userFirstName, theme, board });
            await userTheme.save();
        }

        return res.status(200).json({ message: 'Theme preferences saved successfully', data: userTheme });
    } catch (error) {
        console.error('Error in saveTheme:', error); // Log the error
        return res.status(500).json({ message: 'Error saving theme preferences', error });
    }
};

// Function to get user theme preferences
const getTheme = async (req, res) => {
    try {
        // Expecting userFirstName in the query parameters
        const { userFirstName } = req.query;
        console.log('Received userFirstName:', userFirstName); // Log the value for debugging

        // Check if userFirstName is provided
        if (!userFirstName) {
            return res.status(400).json({ message: 'User first name is required' });
        }

        // Find the user's theme preferences using userFirstName
        const userTheme = await Theme.findOne({ userFirstName });
        console.log('Query result:', userTheme); // Log the result of the query

        if (!userTheme) {
            return res.status(404).json({ message: 'No theme preferences found for user' });
        }

        return res.status(200).json({ data: userTheme });
    } catch (error) {
        console.error('Error retrieving theme preferences:', error);
        return res.status(500).json({ message: 'Error retrieving theme preferences', error });
    }
};



// Export all functions at the end
module.exports = { saveTheme, getTheme };
