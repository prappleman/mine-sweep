// server
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const gameRoutes = require('./routes/gameRoutes');

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

// Mount the auth routes
app.use('/auth', authRoutes); // Mount the auth routes under /auth path

// Use game routes
app.use('/api', gameRoutes);

// MongoDB connection
const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI; // MongoDB URI

    if (!mongoUri) {
      throw new Error('MONGODB_URI is missing from environment variables.');
    }

    // Connection options
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to MongoDB
    await mongoose.connect(mongoUri, connectionOptions);
    console.log('MongoDB connected');
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
