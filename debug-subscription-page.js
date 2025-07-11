// Debug script to check subscription page elements
// Run this in the browser console on the subscription page

console.log("=== PD Subscription Page Debug ===");

// Check localStorage
const storedServices = localStorage.getItem("pd_selected_services");
console.log("📋 Stored services:", storedServices);
console.log("📋 Parsed services:", JSON.parse(storedServices || "[]"));

// Check for search input
const searchSelectors = [
  'input.pdx-dropdown-input[placeholder*="Search by business service name"]',
  'input.pdx-dropdown-input',
  'input[placeholder*="Search"]',
  'input[placeholder*="business service"]',
  '.subscription-search input',
  '[data-cy="add-subscriptions-section-content"] input'
];

console.log("🔍 Checking for search input...");
searchSelectors.forEach(selector => {
  const element = document.querySelector(selector);
  console.log(`  ${selector}:`, element);
});

// Check for add button
const addButtonSelectors = [
  'button[data-cy="save-changes"]',
  '.AddSubscriptionsSection_saveButton__1jgdA',
  'button[class*="save"]',
  'button[class*="add"]'
];

console.log("🔍 Checking for add button...");
addButtonSelectors.forEach(selector => {
  const element = document.querySelector(selector);
  console.log(`  ${selector}:`, element);
  if (element) {
    console.log(`    Disabled: ${element.disabled}`);
    console.log(`    Text: ${element.textContent}`);
  }
});

// Also check for button containing specific text
const addButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
  btn.textContent.includes('Add Business Services')
);
console.log("  Buttons containing 'Add Business Services':", addButtons.length);

// Check for dropdown container
const dropdownSelectors = [
  '.dropdownItemContainer--1kYobvaTp_6m1KNweQ6vFd',
  '.dropdown-menu',
  '[role="listbox"]',
  '.dropdown-item'
];

console.log("🔍 Checking for dropdown containers...");
dropdownSelectors.forEach(selector => {
  const elements = document.querySelectorAll(selector);
  console.log(`  ${selector}: ${elements.length} elements found`);
});

// Check current page structure
console.log("🏗️ Page structure check:");
console.log("  Is subscription page:", window.location.pathname.includes('/subscriptions'));
console.log("  Has subscription page marker:", !!document.querySelector('[data-cy="user-subscriptions-page"]'));
console.log("  Current URL:", window.location.href);

// Check if subscriptions.js is loaded
console.log("🔧 Extension status:");
console.log("  subscriptions.js should have run by now");
console.log("  Check for any error messages above");

console.log("=== End Debug Info ===");
