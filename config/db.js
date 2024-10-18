const mongoose = require('mongoose');
const SocksProxyAgent = require('socks-proxy-agent').SocksProxyAgent;

const connectDB = async () => {
  try {
    // Check if FIXIE_URL and MONGODB_URI are defined
    if (!process.env.FIXIE_URL || !process.env.MONGODB_URI) {
      throw new Error('FIXIE_URL or MONGODB_URI is not defined in the environment variables.');
    }

    // Create a SOCKS proxy agent using the FIXIE_URL
    const proxyAgent = new SocksProxyAgent(process.env.FIXIE_URL);

    // Connect to MongoDB using mongoose without the agent option
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // agent: proxyAgent // Remove this line
    });

    console.log('MongoDB connected through Fixie SOCKS Proxy');
  } catch (error) {
    console.error('Error connecting to MongoDB through Fixie SOCKS Proxy:', error.message);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
