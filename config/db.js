const mongoose = require('mongoose');
const axios = require('axios');

const connectDB = async () => {
  try {
    // Ensure FIXIE_URL is defined and log it for debugging
    if (!process.env.FIXIE_URL) {
      throw new Error('FIXIE_URL is not defined in the environment variables.');
    }

    const fixieProxy = new URL(process.env.FIXIE_URL);

    // Log the full proxy details for debugging (optional)
    console.log('Fixie Proxy Host:', fixieProxy.hostname);
    console.log('Fixie Proxy Username:', fixieProxy.username);
    console.log('Fixie Proxy Password:', fixieProxy.password);

    // Configure axios to use Fixie Proxy with hardcoded port 80
    axios.defaults.proxy = {
      host: fixieProxy.hostname,
      port: 80, // Hardcoded port 80 for HTTP
    };

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }

    // Connect to MongoDB using mongoose
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected through Fixie Proxy');
  } catch (error) {
    console.error('Error connecting to MongoDB through Fixie Proxy:', error.message);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
