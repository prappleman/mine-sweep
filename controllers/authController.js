// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Retrieve the Fixie URL from environment variables
const fixieUrl = process.env.FIXIE_URL;

// Extract username and password from the Fixie URL
const [user, password] = fixieUrl.split('//')[1].split(':');

// Create an Axios instance with Fixie proxy configuration
const instance = axios.create({
  baseURL: 'https://mine-sweeper-game-ec76a0d26f8b.herokuapp.com', // Replace with your target API
  proxy: {
    host: 'fixie',
    port: 80,
    auth: {
      username: user,
      password: password.split('@')[0],
    },
  },
});

const signup = async (req, res) => {
  try {
    const { firstname, email, password } = req.body;
    console.log('Attempting signup for user:', email);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the new user
    const user = new User({ firstname, email, password });
    await user.save();
    
    console.log('User created successfully:', email);

    // Generate token
    const token = generateToken(user);
    res.status(201).json({ token });
  } 
  catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error signing up' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Attempting login for user:', email);
    
    // Make a request using the Axios instance to your Heroku API for login
    const response = await instance.post('/api/login', req.body); // Adjust as necessary
    res.status(200).json(response.data); // Respond with the data from the API
  } 
  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { signup, login };
