// Load environment variables in local development
require('dotenv').config();

const axios = require('axios');
const url = require('url');

// Parse the Fixie proxy URL from the environment variables
const fixieUrl = url.parse(process.env.FIXIE_URL);
const fixieAuth = fixieUrl.auth.split(':');

// Function to make a request through the proxy
async function fetchData() {
  try {
    const response = await axios.get('https://example.com', {
      proxy: {
        protocol: 'http',   // Fixie uses HTTP
        host: fixieUrl.hostname,  // Proxy hostname
        port: fixieUrl.port,      // Proxy port
        auth: {                   // Proxy authentication
          username: fixieAuth[0],
          password: fixieAuth[1],
        },
      },
    });

    // Log response data
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

  } catch (error) {
    console.error('Error making request:', error);
  }
}

