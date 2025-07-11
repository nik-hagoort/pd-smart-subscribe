# Privacy Policy for PagerDuty Smart Subscribe Extension

**Effective Date:** July 11, 2025  
**Last Updated:** July 11, 2025

## Overview

The PagerDuty Smart Subscribe browser extension ("Extension") is designed to enhance your PagerDuty experience by simplifying the process of subscribing to multiple business services. This privacy policy explains what data we collect, how we use it, and your rights regarding your information.

## Data Collection

### What We DO NOT Collect

The PagerDuty Smart Subscribe extension **does not collect, store, transmit, or share any personal information**. Specifically, we do not collect:

- ❌ Personal identification information (names, email addresses, phone numbers)
- ❌ Authentication credentials (passwords, tokens, API keys)
- ❌ Financial or payment information
- ❌ Health information
- ❌ Location data
- ❌ Browsing history outside of PagerDuty
- ❌ User activity data or analytics
- ❌ Personally identifiable information of any kind

### What Data We Access (Locally Only)

The extension only accesses the following data locally within your browser:

- **PagerDuty Service Names**: Only the names of business services you explicitly select for subscription
- **User Navigation Data**: Your PagerDuty user ID (read from page content) to construct proper subscription URLs
- **Page Content**: Limited to PagerDuty status pages and subscription pages for functionality

## Data Storage and Processing

### Local Storage Only

All data used by the extension is stored locally in your browser using:

- **Browser Local Storage**: Temporarily stores selected service names during the subscription process
- **No External Servers**: No data is sent to, stored on, or processed by external servers
- **Automatic Cleanup**: All temporary data is automatically deleted after successful subscription or within 24 hours

### Data Flow

1. **Selection Phase**: When you select services, their names are stored locally in your browser
2. **Navigation Phase**: The extension reads your user ID from the current page to navigate correctly
3. **Subscription Phase**: Selected services are used to auto-fill the subscription form
4. **Cleanup Phase**: All temporary data is automatically deleted

## Data Sharing and Third Parties

- **No Data Sharing**: We do not share any data with third parties
- **No Analytics**: We do not use analytics services or tracking tools
- **No External Communication**: The extension does not communicate with external servers
- **PagerDuty Only**: The extension only operates on PagerDuty domains (`*.pagerduty.com`)

## Permissions and Their Purpose

The extension requests the following browser permissions:

### Storage Permission
- **Purpose**: Temporarily store selected service names during the subscription workflow
- **Scope**: Local browser storage only, no cloud storage
- **Duration**: Data is automatically deleted after successful subscription

### Scripting Permission
- **Purpose**: Inject checkboxes and buttons into PagerDuty pages to enhance functionality
- **Scope**: Limited to adding user interface elements for service selection
- **Data Access**: Only reads service names and user IDs visible on the page

### Host Permission (`*.pagerduty.com`)
- **Purpose**: Enable the extension to function on PagerDuty websites
- **Scope**: Only works on PagerDuty domains, no access to other websites
- **Functionality**: Required to detect service cards and auto-fill subscription forms

## Security Measures

- **Client-Side Only**: All processing happens locally in your browser
- **No Network Transmission**: No data is sent over the internet
- **Minimal Data Access**: Only accesses data necessary for core functionality
- **Automatic Cleanup**: Ensures no persistent storage of temporary data
- **Open Source**: Code is publicly available for security review

## Your Rights and Controls

### Data Control
- **Full Control**: You have complete control over what services you select
- **No Persistent Data**: No long-term data storage means no data to delete
- **Uninstall Anytime**: Simply remove the extension to stop all data processing

### Transparency
- **Open Source**: The extension code is publicly available for review
- **No Hidden Functionality**: All features are documented and visible
- **Audit Trail**: All actions are logged in the browser console for transparency

## Changes to Data Handling

If future versions of the extension require different data handling:

- **Notification**: Users will be notified of any privacy policy changes
- **Consent**: New permissions will require explicit user consent
- **Version Control**: Privacy policy version will be clearly indicated
- **Opt-Out**: Users can always uninstall the extension

## Compliance

### Privacy Standards
- **Data Minimization**: We collect the absolute minimum data necessary
- **Purpose Limitation**: Data is only used for the stated subscription functionality
- **Storage Limitation**: Data is stored only as long as necessary (typically minutes)
- **Transparency**: Clear documentation of all data practices

### Browser Extension Guidelines
- **Chrome Web Store Policies**: Compliant with Google's extension privacy requirements
- **Manifest V3**: Uses the latest extension security standards
- **Permission Justification**: All permissions have clear, documented purposes

## Contact Information

For questions about this privacy policy or the extension's data practices:

- **Repository Issues**: [Create an issue on GitHub](https://github.com/[your-username]/pd-smart-subscribe/issues)

## Technical Details for Developers

### Code Transparency
- **GitHub Repository**: Full source code available at [repository URL]
- **No Obfuscation**: All code is readable and reviewable
- **Regular Updates**: Code is maintained and updated regularly

### Data Flow Documentation
```
User Selection → Local Storage → Auto-Fill → Cleanup
     ↓              ↓              ↓          ↓
   No Upload    No Transmission  No Retention  No Traces
```

## Definitions

- **Extension**: The PagerDuty Smart Subscribe browser extension
- **Personal Information**: Any data that can identify an individual
- **Local Storage**: Browser-based storage that remains on your device
- **PagerDuty Domains**: Websites under the `*.pagerduty.com` domain

## Policy Updates

### Version History
- **v1.0 (July 11, 2025)**: Initial privacy policy

### Future Changes
We may update this privacy policy to:
- Reflect changes in browser extension functionality
- Comply with new privacy regulations
- Improve clarity and transparency

Users will be notified of material changes through:
- Extension update notifications
- GitHub repository updates
- Version notes in the Chrome Web Store

---

## Summary

**The PagerDuty Smart Subscribe extension is designed with privacy as a core principle:**

✅ **No personal data collection**  
✅ **Local processing only**  
✅ **Automatic data cleanup**  
✅ **Transparent operation**  
✅ **Open source code**  
✅ **Minimal permissions**  

If you have any questions about this privacy policy or how the extension handles data, please don't hesitate to contact us through the channels listed above.

---

*This privacy policy is effective as of July 11, 2025, and applies to version 1.1 and later of the PagerDuty Smart Subscribe extension.*
