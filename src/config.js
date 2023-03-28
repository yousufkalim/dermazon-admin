let baseUrl = 'http://localhost:5000/api';
let mediaUrl = 'http://localhost:5000';

if (window.location.host === 'dermazon-admin-dev.falconweb.app') {
  baseUrl = 'https://dermazon-api-dev.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-dev.falconweb.app';
} else if (window.location.host === 'dermazon-admin-qa.falconweb.app') {
  baseUrl = 'https://dermazon-api-qa.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-qa.falconweb.app';
} else if (window.location.host === 'dermazon-admin-staging.falconweb.app') {
  baseUrl = 'https://dermazon-api-staging.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-staging.falconweb.app';
} else if (window.location.host === 'dermazon.fr') {
  baseUrl = 'https://api.dermazon.fr/api';
  mediaUrl = 'https://api.dermazon.fr';
}

module.exports = { baseUrl, mediaUrl };
