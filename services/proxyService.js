const mongoose = require('mongoose');
const HttpsProxyAgent = require('https-proxy-agent');

// Retrieve the Fixie proxy URL from the environment
const fixieUrl = process.env.FIXIE_URL;  // Example: 'http://username:password@fixie-proxy.herokuapp.com:1080'

// Create an HTTPS proxy agent
const fixieAgent = new HttpsProxyAgent(fixieUrl);

// Your MongoDB connection string (replace with your actual MongoDB URI)
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Connect to MongoDB using Mongoose and the Fixie proxy agent
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  httpAgent: fixieAgent  // Pass the Fixie proxy agent to Mongoose
})
  .then(() => {
    console.log('Successfully connected to MongoDB through the Fixie proxy');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });