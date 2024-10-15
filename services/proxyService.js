const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

// Retrieve the Fixie proxy URL from the environment
const proxyUrl = process.env.FIXIE_URL;

// Create an HTTPS proxy agent
const agent = new HttpsProxyAgent(proxyUrl);

// Use axios with the proxy agent
axios.get('https://example.com', { httpsAgent: agent })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
