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
} else if (window.location.host === 'dermazon-admin-prod.falconweb.app/') {
  baseUrl = 'https://dermazon-api-prod.falconweb.app/api';
  mediaUrl = 'https://dermazon-api-prod.falconweb.app';
}

module.exports = { baseUrl, mediaUrl };
