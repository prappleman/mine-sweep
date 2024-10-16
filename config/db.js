// config/db.js
const mongoose = require('mongoose');
const axios = require('axios');
const tunnel = require('axios-tunnel');

const connectDB = async () => {
  try {
    // Fixie Proxy configuration using environment variables
    const fixieProxy = new URL(process.env.FIXIE_URL);

    // Configure axios to use the Fixie Proxy for all requests
    axios.defaults.proxy = false; // Disable axios's default proxy handling
    axios.defaults.httpsAgent = tunnel.httpsOverHttp({
      proxy: {
        host: fixieProxy.hostname,
        port: fixieProxy.port,
        auth: {
          username: fixieProxy.username,
          password: fixieProxy.password,
        },
      },
    });

    // Connect to MongoDB using mongoose
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected through Fixie Proxy');
  } catch (error) {
    console.error('Error connecting to MongoDB through Fixie Proxy:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
