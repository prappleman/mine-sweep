// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const httpProxy = require('http-proxy');
const authRoutes = require('./routes/auth'); // Import your auth routes

const app = express();
const port = process.env.PORT || 3001;
const proxy = httpProxy.createProxyServer({});

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = ['https://mine-sweeper-game-ec76a0d26f8b.herokuapp.com'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mine.html'));
});

// MongoDB connection
const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI; // MongoDB URI
    if (!mongoUri) throw new Error('MONGODB_URI is missing from environment variables.');
    
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Invoke the MongoDB connection function
connectMongoDB();

// Proxy route for API requests
const fixieUrl = process.env.FIXIE_URL; // This should be set in Heroku's environment variables
app.use('/api', (req, res) => {
  // Forward the request to the Fixie proxy
  proxy.web(req, res, { target: fixieUrl }, (error) => {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Proxy error occurred' });
  });
});

// Use the authentication routes
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
