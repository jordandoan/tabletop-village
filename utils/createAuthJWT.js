const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.JWT({
  keyFile: 'keys.json',
  scopes: SCOPES,
});

module.exports = auth;