# PWA Installation Guide

## Epic 9: PWA & Deployment - Implementation Complete ✅

### What's Been Implemented

1. **Web App Manifest** ([manifest.json](manifest.json))
   - App name, short name, and description
   - Standalone display mode for native-like experience
   - Purple gradient theme color (#667eea)
   - Portrait orientation lock
   - App icons in SVG format (scalable for all sizes)

2. **iOS-Specific Meta Tags** ([index.html](index.html))
   - `apple-mobile-web-app-capable`: Enables full-screen mode
   - `apple-mobile-web-app-status-bar-style`: Black translucent status bar
   - `apple-mobile-web-app-title`: "Pushups" home screen name
   - `apple-touch-icon`: App icon for home screen
   - `viewport-fit=cover`: Ensures proper display on notched devices

3. **Enhanced Service Worker** ([sw.js](sw.js))
   - Updated cache version to v2
   - Caches manifest and icon files
   - Network-first strategy for Google APIs
   - Cache-first strategy for app shell
   - Offline fallback support

## How to Install on iPhone

### Prerequisites
- iPhone with iOS 11.3 or later
- Safari browser (required for PWA installation on iOS)
- The app must be served over HTTPS (or localhost for testing)

### Installation Steps

1. **Deploy the App**
   - Upload all files to a web server with HTTPS
   - Or use a local server for testing:
     ```bash
     # Using Python 3
     python3 -m http.server 8000

     # Using Node.js (npx)
     npx serve .

     # Using PHP
     php -S localhost:8000
     ```

2. **Access the App on iPhone**
   - Open Safari on your iPhone
   - Navigate to your app's URL (e.g., `https://yourdomain.com` or `http://localhost:8000`)
   - Make sure the app loads correctly

3. **Add to Home Screen**
   - Tap the **Share** button (square with arrow pointing up) at the bottom of Safari
   - Scroll down and tap **"Add to Home Screen"**
   - You'll see the app icon and name ("Pushups")
   - Tap **"Add"** in the top-right corner

4. **Launch the App**
   - Find the "Pushups" icon on your home screen
   - Tap it to launch the app in full-screen mode
   - The app will run without Safari's browser UI (no address bar, no browser controls)

### Testing Checklist

- [ ] App icon appears correctly on home screen
- [ ] App launches in full-screen mode (no Safari UI)
- [ ] Status bar color matches app theme (purple gradient)
- [ ] App works offline after first visit
- [ ] App orientation is portrait
- [ ] App loads quickly from cache
- [ ] Google Sheets sync still works when online

## User Stories Completed

### ✅ US-9.1: Install from Safari
The app can now be installed from Safari using the "Add to Home Screen" feature. The manifest.json file provides all necessary metadata for installation.

### ✅ US-9.2: Full-Screen Launch
The app launches in standalone mode with:
- No Safari browser UI
- Black translucent status bar
- Native app-like experience
- Proper viewport handling for notched devices

### ✅ US-9.3: Quick Loading
The app loads quickly through:
- Service worker caching of app shell
- Cache-first strategy for static assets
- Offline support after first visit
- Optimized cache management

## Technical Details

### Manifest Configuration
- **Display Mode**: `standalone` - Runs like a native app
- **Theme Color**: `#667eea` - Matches gradient
- **Background Color**: `#667eea` - Smooth launch experience
- **Icons**: SVG format for perfect scaling on all devices
- **Orientation**: `portrait` - Optimized for phone use

### Service Worker Strategy
- **App Shell**: Cache-first (instant loading)
- **Google APIs**: Network-only (always fresh)
- **Offline Fallback**: Returns index.html when offline
- **Cache Versioning**: Easy updates via version bumping

### iOS Safari Compatibility
- Full PWA support on iOS 11.3+
- No installation prompt (manual "Add to Home Screen")
- Standalone mode fully supported
- Push notifications NOT supported on iOS
- Background sync NOT supported on iOS

## Deployment Options

### Option 1: GitHub Pages (Free, HTTPS)
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Add PWA functionality"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/pushup-tracker.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Site will be available at: https://yourusername.github.io/pushup-tracker/
```

### Option 2: Netlify (Free, HTTPS)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant HTTPS deployment
4. Automatic updates via GitHub integration

### Option 3: Vercel (Free, HTTPS)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 4: Firebase Hosting (Free, HTTPS)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

## Notes for Production

1. **Replace SVG Icons with PNG** (Optional but Recommended)
   - Create 192x192px and 512x512px PNG icons
   - iOS prefers PNG for app icons
   - Update manifest.json to reference PNG files

2. **Add Splash Screens** (Optional)
   - Create iOS splash screens for different device sizes
   - Add `<link rel="apple-touch-startup-image">` tags

3. **Configure CSP Headers** (Security)
   - Add Content Security Policy headers on your server
   - Allow Google APIs domains

4. **Analytics** (Optional)
   - Consider adding analytics to track app usage
   - Monitor offline usage patterns

5. **Update Strategy**
   - Increment CACHE_NAME version in sw.js when updating
   - Old cache will be automatically cleared
   - Users get updates on next visit

## Troubleshooting

### App doesn't appear in "Add to Home Screen"
- Ensure you're using Safari (not Chrome or other browsers)
- Check that manifest.json is accessible
- Verify HTTPS is enabled (or using localhost)

### App shows Safari UI after installation
- Check `apple-mobile-web-app-capable` meta tag is set to "yes"
- Verify manifest.json has `"display": "standalone"`
- Try deleting and reinstalling the app

### Icons don't appear
- Check that icon files are accessible at the specified paths
- Verify icon paths in manifest.json are correct
- Clear browser cache and try again

### Service worker not updating
- Increment CACHE_NAME version in sw.js
- Hard refresh in Safari (clear cache)
- Uninstall and reinstall the app

## Resources

- [PWA on iOS](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
