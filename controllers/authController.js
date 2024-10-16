// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!(await user.matchPassword(password))) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);
    console.log('1 Login successful, token:', token);
    res.json({ token });
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
