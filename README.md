# PagerDuty Smart Subscribe Browser Extension

A Chrome/Edge browser extension that simplifies subscribing to multiple PagerDuty business services from status pages with just a few clicks.

## 🚀 Features

- **✅ Smart Service Selection**: Add checkboxes to any business service on PagerDuty status pages
- **🔄 Batch Subscription**: Subscribe to multiple services at once instead of one-by-one
- **🎯 Auto-Fill Forms**: Automatically fills subscription forms with your selected services
- **👤 Smart Navigation**: Automatically detects your user ID and navigates to the correct subscription page
- **🎨 Native Integration**: Styled to match PagerDuty's design system
- **🧹 Clean Data**: Automatically cleans up temporary data after successful subscription

## 📦 Installation

### Option 1: Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](#) (link coming soon)
2. Click "Add to Chrome"
3. Confirm installation

### Option 2: Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your browser toolbar

## 🎯 How to Use

### Step 1: Navigate to Status Page
Go to any PagerDuty status page that displays business service status cards.

### Step 2: Select Services
- Checkboxes will automatically appear next to each business service
- Check the boxes for services you want to subscribe to
- Use the **"Select All"** button to quickly select all services

### Step 3: Subscribe
- Click the green **"Subscribe to Selected Services"** button (appears in bottom-right corner)
- You'll be automatically redirected to your subscription management page
- The extension will auto-fill the subscription form with your selected services

### Step 4: Confirmation
- Services are automatically added to your subscriptions
- You'll see a success notification when complete
- Temporary data is automatically cleaned up

## 🛠️ Technical Details

### Browser Compatibility
- Chrome 88+ (Manifest V3)
- Microsoft Edge 88+
- Other Chromium-based browsers

### Permissions Required
- **Storage**: Temporarily store selected service names during the subscription process
- **Scripting**: Inject interactive UI elements into PagerDuty pages
- **Host Permissions**: Access to `*.pagerduty.com` domains only

### Files Structure
```
pd-smart-subscribe/
├── manifest.json           # Extension configuration
├── content.js             # Main script for status pages
├── subscriptions.js       # Auto-fill script for subscription pages
├── background.js          # Background service worker
├── popup.html            # Extension popup with instructions
├── debug-subscription-page.js  # Debug utilities
├── icons/                # Extension icons
└── README.md             # This file
```

## 🔧 Development

### Local Development
1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon for this extension
4. Test on a PagerDuty status page

### Debugging
- Open browser console (F12 → Console) while on PagerDuty pages
- Look for extension logs prefixed with emoji indicators:
  - ✅ Success messages
  - ⚠️ Warning messages  
  - ❌ Error messages
  - 🔍 Debug information

### Debug Tools
Run the debug script in browser console on subscription pages:
```javascript
// Copy and paste debug-subscription-page.js content into console
```

## 🔒 Privacy & Security

- **No External Data**: Extension only works on PagerDuty domains
- **Local Storage Only**: Temporary data stored locally in your browser
- **Auto-Cleanup**: All temporary data is automatically deleted after use
- **No Tracking**: No analytics, tracking, or data collection
- **Client-Side Only**: All functionality runs entirely in your browser

## 🎨 Customization

### Adding Custom Service Detection
Edit the service detection logic in `content.js`:
```javascript
// Modify the service card selector if needed
const cards = document.querySelectorAll('[data-cy="business-service-status-item"]');
```

### Styling Changes
Modify button styles in `content.js`:
```javascript
// Update button styles in the injectButtons function
subscribeBtn.style.cssText = `
  padding: 12px 24px;
  background-color: #048A24;  // Change colors here
  // ... other styles
`;
```

## 🐛 Troubleshooting

### Extension Not Working
1. ✅ Verify you're on a PagerDuty domain (`*.pagerduty.com`)
2. ✅ Refresh the page and wait for it to fully load
3. ✅ Check browser console for error messages (F12 → Console)
4. ✅ Ensure extension is enabled in `chrome://extensions/`

### Checkboxes Not Appearing
1. ✅ Make sure you're on a status page with business service cards
2. ✅ Look for elements with `data-cy="business-service-status-item"`
3. ✅ Try refreshing the page
4. ✅ Check if the page structure has changed

### Auto-Fill Not Working
1. ✅ Ensure you selected services before clicking the subscribe button
2. ✅ Verify you're redirected to the correct subscription page URL
3. ✅ Check that the subscription form search input is visible
4. ✅ Service names must match exactly (case-sensitive)

### User ID Detection Issues
The extension tries multiple methods to detect your user ID:
1. Scanning page URLs for user links (`/users/USERID`)
2. Searching page content for PagerDuty user ID patterns
3. Falls back to manual detection if needed

## 📋 Changelog

### v1.1 (Current)
- ✨ Enhanced user ID detection with multiple fallback methods
- 🔧 Improved auto-fill reliability with better element selectors
- 🎨 Updated UI styling to match PagerDuty design system
- 🛡️ Better error handling and user notifications
- 📚 Comprehensive documentation and debug tools

### v1.0
- 🎉 Initial release
- ✅ Basic checkbox injection functionality
- 🔄 Auto-fill subscription forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly on PagerDuty pages
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add console logging for debugging
- Test on multiple PagerDuty page types
- Update documentation for new features

## 📄 License

This project is provided as-is for community use. See [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
1. 📖 Check the [troubleshooting section](#-troubleshooting) above
2. 🔍 Review browser console logs for error details
3. 🐛 [Create an issue](../../issues) with:
   - Browser version and extension version
   - Steps to reproduce the problem
   - Console error messages (if any)
   - Screenshots (if helpful)

### Frequently Asked Questions

**Q: Does this work on all PagerDuty pages?**  
A: The extension only works on status pages and subscription pages. It's designed specifically for the business service subscription workflow.

**Q: Is my data secure?**  
A: Yes! All data stays in your browser. Nothing is sent to external servers.

**Q: Can I use this on Safari?**  
A: Currently only Chrome/Edge are supported. Safari support would require a different extension format.

**Q: Will this break if PagerDuty updates their interface?**  
A: The extension uses robust selectors, but major UI changes might require updates. We monitor for changes and update accordingly.

## 🙏 Acknowledgments

- Built for the PagerDuty community
- Inspired by the need to simplify bulk service subscriptions
- Thanks to all contributors and testers

---

**Made with ❤️ for PagerDuty users who want to subscribe to services efficiently**
