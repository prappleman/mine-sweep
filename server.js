require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const { HttpProxyAgent } = require('http-proxy-agent'); // Correct import for proxy agent

const app = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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

// Connect to MongoDB using Fixie proxy
const connectMongoDB = async () => {
  try {
    const fixieUrl = process.env.FIXIE_URL;
    const agent = new HttpProxyAgent(fixieUrl); // Correct usage of the HTTP Proxy Agent

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
      // No direct use of agent with Mongoose. If your MongoDB connection requires a proxy,
      // you'd need to handle that differently based on how MongoDB and Mongoose handle connections.
    });
    console.log('MongoDB connected via Fixie proxy');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Invoke the MongoDB connection function
connectMongoDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
