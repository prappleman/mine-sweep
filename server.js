require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth'); // Authentication routes
const proxyRoutes = require('./routes/proxyRoutes');  // New proxy route

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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// CORS configuration
const allowedOrigins = ['https://mine-sweeper-game-ec76a0d26f8b.herokuapp.com']; // Update with your frontend URL

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if necessary
  credentials: true, // Allow credentials if needed (like cookies, authorization headers)
}));

// Register routes
app.use('/auth', authRouter);  // Base authentication routes
app.use('/proxy', proxyRoutes);  // Proxy route for Fixie

// Default route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mine.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
