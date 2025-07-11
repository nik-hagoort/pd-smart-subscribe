// Background script for PagerDuty Smart Subscribe extension

chrome.runtime.onInstalled.addListener((details) => {
  console.log("🚀 PagerDuty Smart Subscribe extension installed/updated", details);
  
  if (details.reason === 'install') {
    console.log("✅ Extension installed for the first time");
  } else if (details.reason === 'update') {
    console.log("🔄 Extension updated to version", chrome.runtime.getManifest().version);
  }
});

// Listen for tab updates to help with debugging
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('pagerduty.com')) {
    console.log("📍 PagerDuty page loaded:", tab.url);
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📨 Message received in background:", request);
  
  if (request.action === 'log') {
    console.log(`[${sender.tab?.url || 'unknown'}]`, request.message);
  }
  
  sendResponse({ success: true });
});

console.log("🔧 Background script loaded and ready");
