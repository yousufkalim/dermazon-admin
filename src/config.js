let baseUrl = 'http://localhost:5000/api';
let mediaUrl = 'http://localhost:5000';

if (window.location.host === 'dermazon-dev.falconweb.app') {
  baseUrl = 'https://dermazon-api-dev.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-dev.falconweb.app';
} else if (window.location.host === 'dermazon-qa.falconweb.app') {
  baseUrl = 'https://dermazon-api-qa.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-qa.falconweb.app';
} else if (window.location.host === 'dermazon-staging.falconweb.app') {
  baseUrl = 'https://dermazon-api-staging.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-staging.falconweb.app';
} else if (window.location.host === 'dermazon-prod.falconweb.app/') {
  baseUrl = 'https://dermazon-api-prod.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-prod.falconweb.app';
}

module.exports = { baseUrl, mediaUrl };
