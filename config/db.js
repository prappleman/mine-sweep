const mongoose = require('mongoose');
const axios = require('axios');

const connectDB = async () => {
  try {
    // Fixie Proxy configuration using environment variables
    const fixieProxy = new URL(process.env.FIXIE_URL);

    // Configure axios to use the Fixie Proxy for all requests
    axios.defaults.proxy = {
      host: fixieProxy.hostname,
      port: fixieProxy.port,
    };

    // Check if MONGODB_URI is defined
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
