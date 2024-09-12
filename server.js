require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Authentication routes
app.use('/auth', authRouter);

// Serve mine.html
app.get('/mine.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mine.html'));
});

// Default route
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
