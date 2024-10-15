require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth'); // Authentication routes
const proxyRoutes = require('./routes/proxyRoutes'); // New proxy route for Fixie
const url = require('url'); // Import url module for parsing FIXIE_URL
const { HttpProxyAgent } = require('http-proxy-agent'); // Import HttpProxyAgent

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
app.use('/auth', authRouter); // Base authentication routes
app.use('/proxy', proxyRoutes); // Proxy route for Fixie

// Default route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mine.html'));
});

// Fixie proxy configuration
const fixieUrl = url.parse(process.env.FIXIE_URL);
const fixieAuth = fixieUrl.auth.split(':');

// Connect to MongoDB using Fixie proxy
const connectMongoDB = async () => {
  try {
    const agent = new HttpProxyAgent(fixieUrl.href); // Create a new proxy agent using Fixie URL

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Set the connection agent to the proxy agent
      agent: agent,
    });

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
