// scripts/ping-search-engines.js
const https = require('https');

// List of search engines to ping
const searchEngines = [
  'https://www.google.com/ping?sitemap=https://www.voyagervrlab.co.uk/sitemap.xml',
  'https://www.bing.com/ping?sitemap=https://www.voyagervrlab.co.uk/sitemap.xml',
];

// Ping each search engine
searchEngines.forEach((url) => {
  https
    .get(url, (res) => {
      console.log(`Pinged ${url} - Status code: ${res.statusCode}`);
    })
    .on('error', (err) => {
      console.error(`Error pinging ${url}: ${err.message}`);
    });
});
