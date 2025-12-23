// Google Sheets OAuth Configuration Template
//
// SETUP INSTRUCTIONS:
// 1. Copy this file to 'config.js' in the same directory
// 2. Replace the placeholder values below with your actual Google OAuth credentials
// 3. Never commit config.js to git (it's already in .gitignore)
//
// To get your credentials:
// - Follow the setup guide in GOOGLE_SHEETS_SETUP_DE.md (German)
// - Or visit: https://console.cloud.google.com/apis/credentials

const GOOGLE_CONFIG = {
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com',
    API_KEY: 'YOUR_GOOGLE_API_KEY_HERE',
    DISCOVERY_DOCS: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    SCOPES: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file'
};
