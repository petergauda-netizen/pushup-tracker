# Authentication & Cross-Device Sync Testing Guide

This document provides a comprehensive testing plan for the authentication and cross-device sync feature (US-AUTH-1).

## Test Environment Setup

### Prerequisites
1. Two different devices or browsers (for cross-device testing)
2. Google account for testing
3. Google Cloud project with Google Sheets API and Google Drive API enabled
4. Valid OAuth credentials configured in `config.js`

### Before Testing
- Clear localStorage on all test devices/browsers
- Clear any existing test spreadsheets from Google Drive
- Open browser DevTools console to monitor logs

---

## Test Suite: Authentication (Optional)

### AC-AUTH-1.1: App Works Without Sign-In ✓
**Test Steps:**
1. Open the app without signing in
2. Set a push-up goal
3. Log push-ups using quick-add buttons
4. View history, stats, and achievements

**Expected Result:**
- All features work normally
- Data is stored in localStorage
- No Google Sheets sync UI appears (or shows "Not connected")

---

### AC-AUTH-1.2: Optional Google Sign-In ✓
**Test Steps:**
1. Click "Sign in with Google" button
2. Complete OAuth consent flow
3. Grant required permissions

**Expected Result:**
- Google sign-in dialog appears
- After consent, user is signed in
- Sync status shows "Connected as [email]"

---

### AC-AUTH-1.3: Google Account ID as Unique Identifier ✓
**Test Steps:**
1. Sign in with Google account
2. Open DevTools → Application → Local Storage
3. Check `pushupTrackerSyncSettings` entry

**Expected Result:**
- Settings contain `userId` field
- `userId` is a numeric Google account ID (not email)
- Console logs show "Found existing spreadsheet for user: [userId]" if applicable

---

### AC-AUTH-1.4: Authentication Persists Across Reloads ✓
**Test Steps:**
1. Sign in with Google
2. Reload the page
3. Check sync status

**Expected Result:**
- User remains signed in after reload
- Sync status shows "Connected as [email]"
- No re-authentication required

---

### AC-AUTH-1.5: Sign-Out Does Not Delete Local Data ✓
**Test Steps:**
1. Log some push-ups while signed in
2. Click "Disconnect Google Sheets"
3. Check history and stats

**Expected Result:**
- All local push-up entries remain visible
- Stats and achievements are unchanged
- Sync status shows "Not connected"

---

## Test Suite: Local-Only Mode

### AC-AUTH-1.6: Local Storage When Not Signed In ✓
**Test Steps:**
1. Use app without signing in
2. Log 10 push-up entries
3. Check DevTools → Application → Local Storage → `pushupTrackerLogs`

**Expected Result:**
- All entries are stored in localStorage
- Data persists across page reloads
- No network requests to Google Sheets API

---

### AC-AUTH-1.7: All Features Work in Local-Only Mode ✓
**Test Steps:**
1. Without signing in, test all features:
   - Log push-ups
   - Edit entries
   - Delete entries
   - View statistics
   - Check achievements
   - View progress tracking

**Expected Result:**
- All features function correctly
- No errors in console
- UI is fully responsive

---

### AC-AUTH-1.8: Local Data Persists Across Sessions ✓
**Test Steps:**
1. Log push-ups without signing in
2. Close browser completely
3. Reopen app in new session

**Expected Result:**
- All previously logged push-ups appear
- Stats and achievements are correct
- No data loss

---

## Test Suite: Google Sheets Association (Signed-In Mode)

### AC-AUTH-1.9: One Sheet Per User ✓
**Test Steps:**
1. Sign in with Google account (Device A)
2. Check Google Drive for created spreadsheets
3. Note the spreadsheet ID from sync settings
4. Sign out and sign in again

**Expected Result:**
- Only one spreadsheet is created for this user
- Spreadsheet name: "Pushup Tracker - [Date]"
- Re-signing in uses the same spreadsheet

---

### AC-AUTH-1.10: Same Sheet Across Devices ✓
**Test Steps:**
1. Sign in on Device A
2. Note the spreadsheet ID from sync settings
3. Sign in with same account on Device B
4. Check spreadsheet ID on Device B

**Expected Result:**
- Both devices show the same spreadsheet ID
- Spreadsheet URL is identical on both devices

---

### AC-AUTH-1.11: No Duplicate Sheets Created ✓
**Test Steps:**
1. Sign in on Device A
2. Sign out and sign in again multiple times
3. Check Google Drive for spreadsheets

**Expected Result:**
- Only one "Pushup Tracker" spreadsheet exists
- Multiple sign-ins don't create duplicates

---

## Test Suite: Data Writing (Signed-In Mode)

### AC-AUTH-1.12: Automatic Write to Google Sheets ✓
**Test Steps:**
1. Sign in with Google
2. Log a push-up entry
3. Wait 2 seconds
4. Open the Google Sheet (click link in sync settings)

**Expected Result:**
- Entry appears in Google Sheet automatically
- Row contains: ID, User ID, Date, Time, Amount
- No manual sync button needed

---

### AC-AUTH-1.13: User ID Included in Entries ✓
**Test Steps:**
1. Sign in with Google
2. Log multiple push-up entries
3. Open Google Sheet
4. Check column B (User ID)

**Expected Result:**
- All rows have User ID populated
- User ID matches the Google account ID
- User ID is consistent across all entries

---

### AC-AUTH-1.14: Writes Without Manual Action ✓
**Test Steps:**
1. Sign in with Google
2. Log push-ups using quick-add buttons
3. Monitor network tab in DevTools

**Expected Result:**
- API calls to Google Sheets happen automatically
- No "Sync Now" button click required
- Sync status updates to "Synced" automatically

---

## Test Suite: State Restoration (Signed-In Mode)

### AC-AUTH-1.15: Fetch Existing Data on New Device ✓
**Test Steps:**
1. On Device A: Sign in, log 20 push-ups
2. On Device B (fresh): Sign in with same account
3. Choose "Replace Local with Cloud Data" (if prompted)

**Expected Result:**
- Device B shows "Restoring data..." status
- All 20 entries appear on Device B
- Console shows "Restored X push-up entries from Google Sheets"

---

### AC-AUTH-1.16: Full State Reconstruction ✓
**Test Steps:**
1. On Device A: Create entries across multiple days, earn achievements
2. On Device B (fresh): Sign in with same account
3. Check all UI sections on Device B

**Expected Result:**
- Today's total is correct
- History shows all entries
- Achievements are unlocked correctly
- Streaks are calculated correctly
- Statistics show accurate charts

---

### AC-AUTH-1.17: App Usable After Sync ✓
**Test Steps:**
1. Restore data on new device (per AC-AUTH-1.15)
2. After sync completes, test all features:
   - Log new push-ups
   - Edit existing entries
   - Delete entries
   - View stats

**Expected Result:**
- All features work immediately
- New entries sync to cloud
- No errors or UI glitches

---

## Test Suite: Transition (Local → Signed-In)

### AC-AUTH-1.18: Prompt When Both Local and Cloud Data Exist ✓
**Test Steps:**
1. On Device A: Log 10 push-ups WITHOUT signing in
2. Sign in with Google account that has existing data
3. Observe dialog

**Expected Result:**
- Dialog appears: "Data Sync Strategy"
- Shows count of local entries
- Offers 3 options: Merge, Replace, Cancel

---

### AC-AUTH-1.19: Available Sync Options ✓
**Test Steps:**
1. Trigger sync strategy dialog (per AC-AUTH-1.18)
2. Read all available options

**Expected Result:**
- "Merge Local and Cloud Data" button visible
- "Replace Local with Cloud Data" button visible
- "Cancel" button visible
- Description text explains each option

---

### AC-AUTH-1.20: Strategy Applied Successfully ✓

**Test Case 1: Merge Strategy**
1. Device A: 5 local entries (not signed in)
2. Sign in (cloud has 10 entries)
3. Choose "Merge Local and Cloud Data"
4. Check history

**Expected:**
- Total entries: 15 (or less if duplicates removed)
- All unique entries present
- Console shows "Merged X total entries"

**Test Case 2: Replace Strategy**
1. Device A: 5 local entries (not signed in)
2. Sign in (cloud has 10 entries)
3. Choose "Replace Local with Cloud Data"
4. Check history

**Expected:**
- Total entries: 10 (cloud data only)
- Local entries are discarded
- Console shows "Restored X push-up entries from Google Sheets"

---

## Test Suite: Offline Behavior

### AC-AUTH-1.21: Logging While Offline ✓

**Test Case 1: Local-Only Mode**
1. Don't sign in
2. Turn off internet (DevTools → Network → Offline)
3. Log push-ups

**Expected:**
- Entries are logged successfully
- Stored in localStorage
- No error messages

**Test Case 2: Signed-In Mode**
1. Sign in with Google
2. Turn off internet
3. Log push-ups

**Expected:**
- Entries are logged locally
- Queued for sync (check `pushupTrackerSyncQueue` in localStorage)
- Sync status shows pending count

---

### AC-AUTH-1.22: Offline Changes Queued and Synced ✓
**Test Steps:**
1. Sign in with Google
2. Turn off internet
3. Log 5 push-ups, edit 2, delete 1
4. Check DevTools → Local Storage → `pushupTrackerSyncQueue`
5. Turn internet back on
6. Wait 30 seconds

**Expected Result:**
- While offline: Queue contains 8 operations (5 adds, 2 edits, 1 delete)
- After online: Queue is empty
- Google Sheet reflects all changes
- Console shows "✓ Synced add operation for log [id]"

---

### AC-AUTH-1.23: Conflict Resolution Using Timestamps ✓
**Test Steps:**
1. Device A: Log entry with ID 123, amount 25, timestamp 10:00 AM
2. Go offline on both devices
3. Device A: Edit entry 123 to 30 at 10:05 AM
4. Device B: Edit entry 123 to 35 at 10:10 AM
5. Go online on both devices
6. Wait for sync

**Expected Result:**
- Final value in Google Sheet: 35 (most recent)
- Both devices show amount: 35
- Console logs show conflict resolution
- No duplicate entries

---

## Test Suite: Security & Privacy

### AC-AUTH-1.24: Minimal Google Scopes ✓
**Test Steps:**
1. Sign in with Google
2. Check OAuth consent screen
3. Review granted permissions

**Expected Result:**
- Only requests:
  - View your email address
  - See, edit, create, and delete your Google Drive files
  - View and manage Google Sheets

---

### AC-AUTH-1.25: User Data Isolated Per Account ✓
**Test Steps:**
1. Sign in with Account A, log 10 push-ups
2. Sign out
3. Sign in with Account B, log 5 push-ups
4. Check Google Sheet

**Expected Result:**
- Sheet has 15 total rows
- Column B (User ID) shows two different IDs
- Each account only sees their own entries in the app
- Filtering by User ID in Sheet shows isolated data

---

### AC-AUTH-1.26: No Direct Credential Storage ✓
**Test Steps:**
1. Sign in with Google
2. Check DevTools → Application → Local Storage
3. Inspect `pushupTrackerSyncSettings`

**Expected Result:**
- `accessToken` is present (OAuth token)
- No `password` or `client_secret` fields
- Token is temporary (expires after 1 hour)
- Token can be revoked via Google account settings

---

## Test Suite: Token Management

### Token Auto-Refresh ✓
**Test Steps:**
1. Sign in with Google
2. Check token expiration in localStorage (`tokenExpiresAt`)
3. Wait 50 minutes (or manually set `tokenExpiresAt` to near expiry)
4. Perform an action that requires API access (log a push-up)
5. Monitor console logs

**Expected Result:**
- Console shows "Token refreshed successfully"
- New `accessToken` and `tokenExpiresAt` in localStorage
- API call succeeds without user intervention

---

### Token Expiry Handling ✓
**Test Steps:**
1. Sign in with Google
2. Manually set `tokenExpiresAt` to a past timestamp in localStorage
3. Reload the page

**Expected Result:**
- Sync status shows "Token expired"
- User is signed out automatically
- Message: "Please sign in again"

---

## Test Suite: Edge Cases

### Empty Cloud Data ✓
**Test Steps:**
1. Create fresh Google account
2. Sign in on Device A (no existing spreadsheet)
3. Don't log any push-ups
4. Sign in on Device B with same account

**Expected Result:**
- No errors
- Sync status shows "No data to restore"
- App works normally

---

### Empty Local Data ✓
**Test Steps:**
1. Device A: Sign in, log 10 push-ups
2. Device B: Fresh browser, sign in (no local data)

**Expected Result:**
- No sync strategy dialog (automatically restores)
- All 10 entries appear on Device B
- No merge prompt needed

---

### Duplicate Entry IDs ✓
**Test Steps:**
1. Device A: Go offline, log entry at 10:00 AM (ID: timestamp)
2. Device B: Go offline, log entry at 10:00 AM (same timestamp)
3. Both go online

**Expected Result:**
- Conflict resolution merges correctly
- No duplicate IDs in Google Sheet
- Most recent entry wins

---

### Large Dataset ✓
**Test Steps:**
1. Create 500 push-up entries via script:
   ```javascript
   for (let i = 0; i < 500; i++) {
       LogManager.addLog(Math.floor(Math.random() * 50) + 10);
   }
   ```
2. Sign in with Google
3. Wait for full sync

**Expected Result:**
- All 500 entries sync successfully
- Google Sheet shows all rows
- App remains responsive
- No timeout errors

---

## Test Suite: Definition of Done

### DoD-1: App Works Fully Without Login ✓
Run all tests in "Local-Only Mode" suite.

### DoD-2: Sign-In Enables Google Sheets Sync ✓
Run all tests in "Data Writing (Signed-In Mode)" suite.

### DoD-3: Second Device Restores Full State ✓
Run all tests in "State Restoration (Signed-In Mode)" suite.

### DoD-4: No Data Loss When Switching Modes ✓
**Test Steps:**
1. Start local-only, log 10 push-ups
2. Sign in → choose "Merge"
3. Check all 10 entries present
4. Sign out
5. Check all 10 entries still present
6. Sign in again
7. Check all 10 entries still present

**Expected:**
- No data loss at any step
- Entries persist through mode transitions

---

## Automated Test Checklist

Before deploying to production, verify:

- [ ] All 26 Acceptance Criteria pass
- [ ] All edge cases handled gracefully
- [ ] No console errors during normal usage
- [ ] Token refresh works after 55+ minutes
- [ ] Offline queue processes correctly
- [ ] Merge strategy produces correct results
- [ ] Replace strategy discards local data properly
- [ ] Multiple devices stay in sync
- [ ] User data isolation verified
- [ ] Google Drive API enabled in Cloud Console
- [ ] Documentation updated and accurate

---

## Known Limitations

1. **One-Way Sheet Edits**: Manual edits in Google Sheets don't sync back to the app
2. **Sheet Name**: Renaming "Push-up Logs" sheet breaks sync
3. **Token Lifetime**: Access tokens expire after 1 hour (auto-refresh implemented)
4. **Browser Storage**: Clearing localStorage logs user out

---

## Reporting Issues

If any test fails:
1. Note the acceptance criteria number
2. Copy console error messages
3. Include browser/device information
4. Describe steps to reproduce
5. Report in GitHub Issues

---

## Summary

This test plan covers all acceptance criteria from US-AUTH-1. Each test is designed to be run manually or adapted for automation. Follow the test suites in order to ensure comprehensive coverage of the authentication and cross-device sync feature.
