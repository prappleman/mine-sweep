// services/proxyService.js
const axios = require('axios');
const url = require('url');

// Parse the FIXIE_URL to get authentication details
const fixieUrl = url.parse(process.env.FIXIE_URL);
const fixieAuth = fixieUrl.auth ? fixieUrl.auth.split(':') : ['', '']; // Fallback if auth is undefined

// Function to make a request using Fixie
const fetchData = async () => {
  try {
    const response = await axios.get('https://your-database-url.com', {
      proxy: {
        host: fixieUrl.hostname,
        port: fixieUrl.port,
        auth: {
          username: fixieAuth[0],
          password: fixieAuth[1],
        },
      },
    });
    return response.data; // Handle the response data as needed
  } catch (error) {
    console.error('Error fetching data through Fixie:', error);
    throw error; // Propagate the error
  }
};

module.exports = { fetchData };
