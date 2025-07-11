# PagerDuty Smart Subscribe Browser Extension

A Chrome/Edge browser extension that simplifies subscribing to specific PagerDuty business services from status pages.

## Features

- 🎯 **Smart Service Detection**: Automatically identifies key business services (Employee, Legacy (WWW), Timecard, Punch In/Punch Out)
- ✅ **Easy Selection**: Add checkboxes to service cards for quick selection
- 🔄 **Auto-Fill Subscriptions**: Automatically fills the subscription form with selected services
- 👤 **Dynamic User Detection**: Automatically detects your user ID for proper navigation
- 🎨 **PagerDuty UI Integration**: Styled to match PagerDuty's design system

## Installation

1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" 
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your browser toolbar

## How to Use

### Step 1: Navigate to Status Page
Go to any PagerDuty status page in your organization that displays business service status cards.

### Step 2: Select Services
- Look for business service cards labeled "Employee", "Legacy (WWW)", "Timecard", or "Punch In/Punch Out"
- Check the boxes that appear next to the services you want to subscribe to
- The checkboxes are automatically injected by the extension

### Step 3: Subscribe
- Click the green "Subscribe to Selected Services" button that appears in the bottom-right corner
- You'll be automatically redirected to your subscription management page
- The extension will auto-fill the subscription form with your selected services

### Step 4: Confirmation
- The services will be automatically added to your subscriptions
- You'll see a success notification when complete
- The extension cleans up temporary data automatically

## Technical Details

### Files Structure
- `manifest.json` - Extension configuration and permissions
- `content.js` - Main script for status pages (adds checkboxes and button)
- `subscriptions.js` - Auto-fill script for subscription pages
- `background.js` - Background service worker for logging and messaging
- `popup.html` - Extension popup with usage instructions

### Permissions Required
- `storage` - To temporarily store selected service names
- `scripting` - To inject content scripts
- `host_permissions` - Access to `*.pagerduty.com` domains

### Browser Compatibility
- Chrome 88+ (Manifest V3)
- Microsoft Edge 88+
- Other Chromium-based browsers

## Troubleshooting

### Extension Not Working
1. Check that you're on a PagerDuty domain (`*.pagerduty.com`)
2. Look for service cards with the target service names
3. Check browser console for error messages (F12 → Console)

### Services Not Auto-Filling
1. Ensure you're redirected to the correct subscription page
2. Check that the search dropdown is visible and functional
3. Verify the service names match exactly

### User ID Detection Issues
The extension tries multiple methods to detect your user ID:
1. Scanning page URLs for user links
2. Searching page content for user ID patterns
3. Falls back to a default ID if needed

## Customization

### Adding More Target Services
Edit the `TARGET_NAMES` array in `content.js`:

```javascript
const TARGET_NAMES = ["Employee", "Legacy (WWW)", "Timecard", "Punch In/Punch Out", "Your Service Name"];
```

### Styling Changes
Modify the CSS styles in the `content.js` and `popup.html` files to match your preferences.

## Development

### Testing
1. Make changes to the code
2. Click the refresh icon in `chrome://extensions/` for your extension
3. Navigate to a PagerDuty status page to test functionality

### Debugging
- Check browser console logs (F12 → Console)
- Look for extension logs prefixed with emoji indicators
- Use the background script logs for cross-tab debugging

## Version History

### v1.1 (Current)
- Enhanced user ID detection
- Improved auto-fill reliability
- Better error handling and notifications
- Updated UI styling to match PagerDuty design
- Added comprehensive documentation

### v1.0
- Initial release
- Basic checkbox injection and subscription auto-fill

## Security & Privacy

- Extension only accesses PagerDuty domains
- No data is sent to external servers
- Temporary data is stored locally and cleaned up automatically
- All functionality runs client-side in your browser

## Contributing

1. Fork the repository
2. Make your changes
3. Test thoroughly on PagerDuty pages
4. Submit a pull request with a clear description

## License

This project is provided as-is for internal use. Please ensure compliance with your organization's browser extension policies.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console logs for error details
3. Create an issue in the repository with detailed information about your environment and the problem
