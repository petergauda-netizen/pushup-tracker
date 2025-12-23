# Google Sheets Synchronization Setup Guide

This guide will walk you through setting up Google Sheets synchronization for your Push-up Tracker app.

## Overview

The app now includes automatic backup and synchronization to Google Sheets. All your push-up entries will be saved to a Google Sheet that's automatically created for you.

## Features

- ✅ **Automatic sync** on app open and close
- ✅ **Cross-device sync** - your data follows you across all your devices
- ✅ **Smart conflict resolution** - automatically merges data using timestamps
- ✅ **Offline queue** - changes made offline will sync when you reconnect
- ✅ **Real-time updates** - edits and deletions sync to Google Sheets
- ✅ **Auto-create sheet** - no manual setup required
- ✅ **Sync status indicator** - always know if your data is backed up
- ✅ **Token auto-refresh** - stays connected without requiring re-authentication

## Prerequisites

- A Google account
- A Google Cloud project (free to create)

## Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Enter a project name (e.g., "Pushup Tracker")
4. Click **Create**

### Step 2: Enable Required APIs

1. In your Google Cloud Console, make sure your project is selected
2. Go to **APIs & Services** → **Library**
3. Search for and enable these APIs:
   - **Google Sheets API** (required for storing push-up data)
   - **Google Drive API** (required for finding and managing your spreadsheets across devices)

### Step 3: Create API Credentials

#### Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key that appears
4. Click **Edit API key** to restrict it:
   - Under **API restrictions**, select **Restrict key**
   - Check **Google Sheets API**
   - Click **Save**

#### Create OAuth 2.0 Client ID

1. First, configure the OAuth consent screen:
   - Go to **APIs & Services** → **OAuth consent screen**
   - Select **External** user type
   - Click **Create**
   - Fill in the required fields:
     - App name: "Pushup Tracker"
     - User support email: your email
     - Developer contact: your email
   - Click **Save and Continue**
   - Skip the scopes section (click **Save and Continue**)
   - Add test users (your email address) if you want to test before publishing
   - Click **Save and Continue**

2. Create the OAuth client:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Name: "Pushup Tracker Web Client"
   - Under **Authorized JavaScript origins**, add:
     - `http://localhost` (for local testing)
     - `http://127.0.0.1` (for local testing)
     - Any domain where you'll host the app (e.g., `https://yourdomain.com`)
   - Click **Create**
   - Copy the **Client ID** that appears

### Step 4: Add Credentials to Your App

1. Open the `index.html` file in a text editor
2. Find this section near the top of the `<script>` tag (around line 1400):

```javascript
// Google Sheets Configuration
const GOOGLE_CONFIG = {
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID_HERE', // Replace this
    API_KEY: 'YOUR_GOOGLE_API_KEY_HERE', // Replace this
    DISCOVERY_DOCS: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    SCOPES: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file'
};
```

3. Replace:
   - `YOUR_GOOGLE_CLIENT_ID_HERE` with your OAuth 2.0 Client ID
   - `YOUR_GOOGLE_API_KEY_HERE` with your API Key

4. Save the file

### Step 5: Test the Integration

1. Open `index.html` in your web browser
2. Set up your push-up goal if you haven't already
3. You should see a "Sign in with Google" button in the sync status section
4. Click the button and sign in with your Google account
5. Grant the requested permissions (read/write access to Google Sheets and Drive)
6. The app will automatically create a new Google Sheet and sync your data

## How It Works

### Data Structure

Your Google Sheet will have the following columns:
- **ID**: Unique identifier for each entry
- **User ID**: Your Google account ID (for multi-user sheets)
- **Date**: The date of the push-up session (MM/DD/YYYY)
- **Time**: The time of the push-up session (12-hour format)
- **Amount**: Number of push-ups completed

### Sync Behavior

- **On app open**: All local data is synced to Google Sheets
- **When adding entries**: Immediately queued for sync
- **When editing entries**: Changes are synced to update the corresponding row
- **When deleting entries**: The row is removed from the sheet
- **On app close**: Any pending changes are synced

### Offline Support

If you make changes while offline:
- Changes are stored in a local queue
- The sync status will show "Pending Changes"
- When you reconnect and open the app, all queued changes will be synced automatically

## Sync Status Indicators

- ☁️ **Not connected**: You haven't signed in yet
- 🔄 **Syncing**: Data is being uploaded to Google Sheets
- ✅ **Synced**: All data is backed up successfully
- ❌ **Error**: Something went wrong (check the console for details)

## Troubleshooting

### "Sign in failed" Error

- Make sure you've added the correct authorized JavaScript origins in your OAuth client settings
- If testing locally, ensure you're using `http://localhost` or `http://127.0.0.1` (not `file://`)

### "API key not valid" Error

- Check that your API key is correctly copied
- Verify that the Google Sheets API is enabled for your project
- Make sure the API key restrictions allow the Google Sheets API

### Sync Stuck on "Syncing..."

- Check your browser's console for error messages (F12 → Console tab)
- Try disconnecting and reconnecting
- Verify your access token hasn't expired (tokens last 1 hour, the app should refresh automatically)

### Data Not Appearing in Sheet

- Open the Google Sheets link shown in the sync settings
- Check the "Push-up Logs" tab
- Make sure you're signed in with the same Google account

## Privacy & Security

- Your data is only stored in your Google Drive (not on any third-party servers)
- The app only requests minimal permissions: read/write access to Google Sheets and Drive
- Access tokens are stored locally in your browser's localStorage
- You can disconnect at any time by clicking "Disconnect Google Sheets"

## Managing Your Sheet

You can:
- ✅ Open and view your sheet at any time (click the link in sync settings)
- ✅ Manually edit values in the sheet (changes won't sync back to the app)
- ✅ Share the sheet with others (each person's data is isolated by User ID)
- ✅ Export to CSV or Excel
- ✅ Create charts and visualizations
- ✅ Filter by User ID to see only specific user's data
- ⚠️ Don't delete the "ID" or "User ID" columns (used to match entries and users)
- ⚠️ Don't rename the "Push-up Logs" sheet (sync will fail)

## Advanced Configuration

### Hosting the App

If you want to host this app on a web server:

1. Upload all files to your web server
2. Update the OAuth client's authorized JavaScript origins:
   - Add your domain: `https://yourdomain.com`
3. Test the app to ensure sign-in works

### Multiple Devices

The app now supports **true cross-device synchronization**:

1. **First device**: Sign in with your Google account
   - The app creates a Google Sheet and uploads your data

2. **Second device**: Sign in with the same Google account
   - The app automatically finds your existing spreadsheet
   - If you have local data, you'll be prompted to choose:
     - **Merge**: Combine local and cloud data (recommended)
     - **Replace**: Discard local data and restore from cloud
   - The app downloads all your push-ups and restores your full state

3. **Ongoing sync**: All devices stay synchronized
   - New entries sync to the cloud immediately
   - Edits and deletions are reflected across all devices
   - Conflict resolution uses timestamps (most recent wins)

**Important**: Each user (Google account) has their own isolated data. The same spreadsheet can contain data from multiple Google accounts, but each user only sees their own push-ups.

## Support

If you encounter issues:
1. Check the browser console for error messages (F12 → Console)
2. Verify all setup steps were completed correctly
3. Try clearing localStorage and reconnecting
4. Create an issue in the project repository with error details

## Quota Limits

Google Sheets API has the following free tier limits:
- 100 requests per 100 seconds per user
- 500 requests per 100 seconds per project

For typical use (adding entries throughout the day), you'll stay well within these limits.
