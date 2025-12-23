# Pushup Tracker PWA

A mobile-first Progressive Web App for tracking daily pushups with Google Sheets integration and offline functionality.

## Features

- Track daily pushup counts
- Google Sheets synchronization
- Offline support with service worker
- Installable as a PWA on mobile devices
- Beautiful gradient design optimized for mobile

## Deployment Instructions

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `pushup-tracker`)
3. **Do not** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

### 2. Push Code to GitHub

Run these commands in your terminal:

```bash
# Add the GitHub repository as remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/pushup-tracker.git

# Push your code
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top navigation)
3. Click on **Pages** (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions**
5. The deployment will automatically start

### 4. Access Your App

After deployment completes (usually 1-2 minutes), your app will be available at:
```
https://YOUR_USERNAME.github.io/pushup-tracker/
```

## Google Sheets Integration

To enable Google Sheets sync:

1. **Setup OAuth Credentials**:
   - Follow the detailed German guide: [GOOGLE_SHEETS_SETUP_DE.md](GOOGLE_SHEETS_SETUP_DE.md)
   - Or visit [Google Cloud Console](https://console.cloud.google.com) to create OAuth credentials

2. **Configure Locally**:
   ```bash
   # Copy the example config file
   cp config.example.js config.js

   # Edit config.js and add your credentials
   # Never commit config.js to git (it's in .gitignore)
   ```

3. **For Production Deployment**:
   - You'll need to manually upload `config.js` to your GitHub Pages deployment
   - Or use GitHub Secrets with Actions to generate it during deployment

**Important**: `config.js` contains your OAuth credentials and is excluded from git for security

## PWA Installation

Users can install the app on their mobile devices:
- **iOS**: Tap Share → Add to Home Screen
- **Android**: Tap menu → Install App

See [PWA_INSTALLATION.md](PWA_INSTALLATION.md) for detailed instructions.

## Development

This is a vanilla JavaScript PWA with no build process required. Simply edit the files and push to GitHub to deploy.

### Files

- `index.html` - Main application
- `manifest.json` - PWA manifest
- `sw.js` - Service worker for offline functionality
- `icon-192.svg`, `icon-512.svg` - App icons

## Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing instructions.
