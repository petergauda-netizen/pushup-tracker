# Mobile-First Redesign Testing Guide

## Quick Start Testing

### 1. Open in Browser
```bash
# Navigate to the project directory
cd /Users/peter/Documents/Pushups

# Open in your default browser (macOS)
open index.html

# Or serve with a local server
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### 2. Test Mobile View (Desktop Browser)
1. Open Chrome DevTools (F12 or Cmd+Option+I)
2. Click "Toggle Device Toolbar" (Cmd+Shift+M)
3. Select device: iPhone 12 Pro or similar
4. Refresh page

## Test Checklist

### Mobile View (< 769px)

#### Card Order
- [ ] Log Card is at the TOP (after settings/sync)
- [ ] "At a Glance" card is second
- [ ] Statistics card is third
- [ ] History card is fourth
- [ ] Settings card is at BOTTOM

#### Log Card (Most Important!)
- [ ] "Today's Total" is prominently displayed
- [ ] Quick-add buttons (5, 10, 25, 50) are large and easy to tap
- [ ] Custom input and "Log" button work correctly
- [ ] Tapping quick-add updates today's total immediately
- [ ] Error message shows for invalid input

#### "At a Glance" Card
- [ ] Shows target goal
- [ ] Shows end date (or "Not set")
- [ ] Shows days remaining (if end date set)
- [ ] Shows daily pace needed (if end date set)
- [ ] Progress bar displays correctly with percentage
- [ ] Shows "Completed" and "Remaining" counts
- [ ] Current streak and longest streak shown side-by-side
- [ ] Status indicator works (ahead/on-track/behind)
- [ ] Badges scroll horizontally
- [ ] Can swipe badges left/right smoothly

#### Touch Targets
- [ ] All buttons are easy to tap with thumb
- [ ] No accidental taps when scrolling
- [ ] Quick-add buttons respond immediately
- [ ] Tabs are easy to switch between
- [ ] No double-tap zoom on buttons

#### Layout & Spacing
- [ ] Cards have compact padding (not too cramped)
- [ ] Text is readable without zooming
- [ ] No horizontal scrolling (except badges)
- [ ] Scrolling is smooth
- [ ] Cards fit width of screen nicely

#### Typography
- [ ] Headers are clear but not overwhelming
- [ ] Body text is easily readable
- [ ] Numbers in stats are prominent
- [ ] Labels are clear

### Desktop View (≥ 769px)

#### Layout Enhancements
- [ ] Cards have more generous padding
- [ ] Fonts are larger and easier to read
- [ ] Hover effects work on buttons
- [ ] Badges display in grid (not scrollable)
- [ ] Container is centered with max-width

#### Responsive Breakpoint
- [ ] Resize browser window slowly
- [ ] At 769px, layout should shift
- [ ] No awkward intermediate states
- [ ] Smooth transition between mobile/desktop

### Functionality Tests

#### Initial Setup
- [ ] Settings form appears on first visit
- [ ] Can enter target goal
- [ ] Can enter end date (optional)
- [ ] "Save Goal" button works
- [ ] After saving, redirected to main view
- [ ] All cards appear after setup

#### Logging Push-ups
- [ ] Click quick-add button (e.g., "25")
- [ ] Today's total updates immediately
- [ ] Success message appears
- [ ] History card updates with new entry
- [ ] Statistics update accordingly
- [ ] "At a Glance" progress bar updates

#### Custom Logging
- [ ] Enter custom amount (e.g., 37)
- [ ] Click "Log" button
- [ ] Validation works (rejects negative, zero, decimals)
- [ ] Valid entries are logged
- [ ] Input clears after successful log

#### History Management
- [ ] Recent entries appear at top
- [ ] Click "Edit" on an entry
- [ ] Modify the amount
- [ ] Click "Save" - updates reflected everywhere
- [ ] Click "Delete" on an entry
- [ ] Confirm deletion
- [ ] Entry removed, stats recalculated

#### Statistics
- [ ] Switch between tabs (Overview, Trends, Periods, Performance)
- [ ] Charts render correctly
- [ ] Data is accurate
- [ ] Period selectors work (7, 14, 30, 90 days)

#### Settings Edit
- [ ] Scroll to bottom settings card
- [ ] Click "Edit Goal Settings"
- [ ] Returns to settings form
- [ ] Can modify target/end date
- [ ] Save updates all cards

### Google Sheets Sync (If Configured)

#### Connection
- [ ] Sync status shows at top
- [ ] Can click "Sign in with Google"
- [ ] OAuth flow works
- [ ] After sign-in, status updates
- [ ] Sheet name link appears

#### Syncing
- [ ] Log push-ups when online
- [ ] Check Google Sheet - entry appears
- [ ] Edit entry in app
- [ ] Check sheet - reflects edit
- [ ] Delete entry in app
- [ ] Check sheet - entry removed

#### Offline Mode
- [ ] Turn off network (DevTools → Network → Offline)
- [ ] Offline indicator appears at top
- [ ] Log push-ups while offline
- [ ] Entries stored locally
- [ ] "Pending Changes" count increases
- [ ] Turn network back on
- [ ] Pending changes sync automatically

### Edge Cases

#### Empty States
- [ ] Fresh install - no data
- [ ] Statistics show "No data" states correctly
- [ ] History shows empty state
- [ ] Charts handle no data gracefully

#### Progress Complete
- [ ] Set low target (e.g., 10)
- [ ] Log enough to exceed target
- [ ] Progress bar shows 100%
- [ ] Status shows "Goal Achieved!"

#### Streaks
- [ ] Log push-ups for multiple days in a row
- [ ] Current streak increments
- [ ] Skip a day
- [ ] Streak resets to 0
- [ ] Longest streak preserved

#### Badges
- [ ] Earn first badge (1 push-up)
- [ ] Badge appears earned (no lock icon)
- [ ] Scroll through badges on mobile
- [ ] Locked badges have lock icon

### Cross-Browser Testing

#### iOS Safari
- [ ] Open on iPhone (real device preferred)
- [ ] Touch interactions feel native
- [ ] Scrolling is smooth
- [ ] No issues with input zoom
- [ ] PWA install works

#### Android Chrome
- [ ] Open on Android device
- [ ] Touch targets work well
- [ ] No issues with form inputs
- [ ] PWA install works

#### Desktop Browsers
- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Edge: All features work

### Performance Tests

#### Load Time
- [ ] Initial page load < 2 seconds
- [ ] No flash of unstyled content
- [ ] Progressive rendering works

#### Interactions
- [ ] Button clicks respond instantly
- [ ] Logging updates UI within 100ms
- [ ] Scrolling is smooth (60fps)
- [ ] Animations are smooth

#### Memory
- [ ] Open DevTools → Performance → Memory
- [ ] Log 100+ entries
- [ ] Check for memory leaks
- [ ] Page should stay responsive

### Accessibility Tests

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Can activate buttons with Enter/Space
- [ ] Can submit forms with Enter

#### Screen Reader (Optional)
- [ ] VoiceOver (macOS): Cmd+F5
- [ ] NVDA/JAWS (Windows)
- [ ] All elements have labels
- [ ] Form fields are announced correctly

#### Color Contrast
- [ ] Text is readable on all backgrounds
- [ ] Status colors are distinguishable
- [ ] No reliance on color alone

### Regression Tests

#### Core Functionality
- [ ] All features from original version work
- [ ] No JavaScript errors in console
- [ ] LocalStorage persists correctly
- [ ] Settings are remembered
- [ ] Logs are preserved across sessions

## Common Issues & Solutions

### Issue: Cards Not Showing
**Solution:** Check browser console for errors. Ensure settings are saved.

### Issue: Progress Not Updating
**Solution:** Open DevTools, check Network tab. Verify JavaScript is running.

### Issue: Sync Not Working
**Solution:** Check Google API credentials in code (CLIENT_ID, API_KEY)

### Issue: Mobile View on Desktop
**Solution:** Resize browser to > 769px or turn off device emulation

### Issue: Touch Targets Too Small
**Solution:** Verify viewport meta tag is present. Check browser zoom is 100%.

## Automated Testing (Optional)

### Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8000 --view
```

**Expected Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90
- PWA: > 80

### Visual Regression (Optional)
Use BackstopJS or Percy.io to compare screenshots before/after

## Reporting Issues

If you find bugs, note:
1. Device/Browser (e.g., iPhone 12, iOS 15, Safari)
2. Screen size (e.g., 375x812)
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots if applicable
6. Console errors (if any)

## Success Criteria

The redesign is successful if:
- ✓ Mobile users can log push-ups in < 5 seconds
- ✓ No excessive scrolling needed on mobile
- ✓ All touch targets are easy to tap
- ✓ Desktop experience is not degraded
- ✓ All original features work correctly
- ✓ No JavaScript errors
- ✓ Performance is maintained or improved

## Next Steps After Testing

1. Test on real devices (iPhone, Android)
2. Get user feedback from mobile users
3. Monitor analytics (if implemented)
4. Iterate based on feedback
5. Consider A/B testing if large user base

## Backup & Rollback

If issues are found:
```bash
# Original version backed up at:
/Users/peter/Documents/Pushups/index.html.original

# To rollback:
cp index.html.original index.html
```

## Questions?

Refer to:
- `MOBILE_FIRST_REDESIGN.md` - Technical details
- `BEFORE_AFTER_COMPARISON.md` - What changed
- Original code at `index.html.original` - Reference
