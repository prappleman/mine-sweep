// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const gameRoutes = require('./routes/gameRoutes');
const connectDB = require('./config/db'); // Import the MongoDB connection function

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
const allowedOrigins = [
  'https://mine-sweep.onrender.com', // Production
  'http://localhost:3001', // Local development (adjust the port if necessary)
];
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
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
