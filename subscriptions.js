(function () {
  console.log("🔄 PD Subscription Auto-Fill Started");
  
  const selectedServices = JSON.parse(localStorage.getItem("pd_selected_services") || "[]");
  console.log("📋 Services to subscribe to:", selectedServices);

  if (!selectedServices.length) {
    console.log("ℹ️ No services to subscribe to");
    return;
  }

  // Show notification to user
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      background-color: ${type === 'success' ? '#048A24' : type === 'error' ? '#dc3545' : '#007bff'};
      color: white;
      border-radius: 6px;
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      function check() {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`Element ${selector} not found after ${timeout}ms`));
        } else {
          setTimeout(check, 100);
        }
      }
      
      check();
    });
  }

  async function addServicesToSubscription() {
    try {
      console.log("🔄 Starting addServicesToSubscription function");
      console.log("📍 Current URL:", window.location.href);
      console.log("📋 Selected services from storage:", selectedServices);
      
      showNotification(`Adding ${selectedServices.length} service(s) to your subscriptions...`);

      // Try multiple selectors for the search input
      const searchInputSelectors = [
        'input.pdx-dropdown-input[placeholder*="Search by business service name"]',
        'input.pdx-dropdown-input',
        'input[placeholder*="Search"]',
        'input[placeholder*="business service"]',
        '.subscription-search input',
        '[data-cy="add-subscriptions-section-content"] input'
      ];
      
      let searchInput = null;
      for (const selector of searchInputSelectors) {
        try {
          searchInput = await waitForElement(selector, 2000);
          console.log("✅ Found search input with selector:", selector);
          break;
        } catch (e) {
          console.log("❌ Search input not found with selector:", selector);
        }
      }
      
      if (!searchInput) {
        throw new Error("Could not find search input with any selector");
      }

      // Try multiple selectors for the add button
      const addButtonSelectors = [
        'button[data-cy="save-changes"]',
        '.AddSubscriptionsSection_saveButton__1jgdA',
        'button[class*="save"]',
        'button:contains("Add Business Services")'
      ];
      
      let addButton = null;
      for (const selector of addButtonSelectors) {
        try {
          addButton = await waitForElement(selector, 2000);
          console.log("✅ Found add button with selector:", selector);
          break;
        } catch (e) {
          console.log("❌ Add button not found with selector:", selector);
        }
      }
      
      if (!addButton) {
        throw new Error("Could not find add button with any selector");
      }

      let servicesAdded = 0;

      for (let i = 0; i < selectedServices.length; i++) {
        const serviceName = selectedServices[i];
        console.log(`🔍 Adding service ${i + 1}/${selectedServices.length}: ${serviceName}`);

        try {
          console.log(`🔍 Processing service: ${serviceName}`);
          
          // Clear the input first
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          console.log("🧹 Cleared input field");
          
          await new Promise(resolve => setTimeout(resolve, 200));

          // Focus and type the service name
          searchInput.focus();
          console.log("🎯 Focused on input");
          
          searchInput.value = serviceName;
          console.log(`💬 Set input value to: ${serviceName}`);
          
          // Trigger input events
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          searchInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log("📡 Dispatched input events");
          
          // Wait for dropdown to appear and populate
          await new Promise(resolve => setTimeout(resolve, 800));

          // Look for dropdown items
          const dropdownContainer = document.querySelector('.dropdownItemContainer--1kYobvaTp_6m1KNweQ6vFd');
          console.log("📋 Dropdown container found:", !!dropdownContainer);
          if (dropdownContainer) {
            // Look for dropdown items
            const dropdownItems = dropdownContainer.querySelectorAll('[role="option"], .dropdown-item, .dropdownItem--Bx7a8BGWnHX08d7s7dGs');
            
            let itemFound = false;
            
            // First, try to find an exact match
            for (const item of dropdownItems) {
              const itemText = item.textContent.trim();
              if (itemText.toLowerCase() === serviceName.toLowerCase()) {
                console.log(`✅ Found exact match: ${itemText}`);
                item.click();
                itemFound = true;
                servicesAdded++;
                break;
              }
            }
            
            // If no exact match, try partial matches as fallback
            if (!itemFound) {
              console.log(`🔍 No exact match found for "${serviceName}", trying partial matches...`);
              for (const item of dropdownItems) {
                const itemText = item.textContent.trim();
                if (itemText.toLowerCase().includes(serviceName.toLowerCase())) {
                  console.log(`⚠️ Found partial match: ${itemText} (for ${serviceName})`);
                  item.click();
                  itemFound = true;
                  servicesAdded++;
                  break;
                }
              }
            }

            if (!itemFound) {
              console.warn(`⚠️ No dropdown match found for: ${serviceName}`);
              // Try pressing Enter as fallback
              searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
              await new Promise(resolve => setTimeout(resolve, 300));
            }
          } else {
            console.warn("⚠️ Dropdown container not found, trying Enter key");
            searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            await new Promise(resolve => setTimeout(resolve, 300));
          }

          // Wait between services
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
          console.error(`❌ Error adding service ${serviceName}:`, error);
        }
      }

      // Final wait before clicking add button
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if the add button is enabled
      if (!addButton.disabled) {
        console.log("🚀 Clicking Add Business Services button");
        addButton.click();
        
        showNotification(`Successfully added ${servicesAdded} business service(s)!`, 'success');
        
        // Clean up stored data
        setTimeout(() => {
          localStorage.removeItem("pd_selected_services");
          console.log("🧹 Cleaned up localStorage");
        }, 2000);
      } else {
        showNotification("No services were successfully selected. Please try manually.", 'error');
        console.warn("⚠️ Add button is still disabled - no services were successfully selected");
      }

    } catch (error) {
      console.error("❌ Error in addServicesToSubscription:", error);
      showNotification("Failed to add services. Please try adding them manually.", 'error');
    }
  }

  // Check if we're on the subscriptions page
  function isSubscriptionPage() {
    const urlCheck = window.location.pathname.includes('/subscriptions');
    const searchInputCheck = document.querySelector('input.pdx-dropdown-input[placeholder*="Search by business service name"]');
    const addButtonCheck = document.querySelector('button[data-cy="save-changes"]');
    const pageMarkerCheck = document.querySelector('[data-cy="user-subscriptions-page"]');
    const subscriptionContentCheck = document.querySelector('[data-cy="add-subscriptions-section-content"]');
    const manageSubscriptionsCheck = document.querySelector('.manage-subscriptions-title');
    
    console.log("🔍 Subscription page detection:");
    console.log("  URL includes '/subscriptions':", urlCheck);
    console.log("  Has search input:", !!searchInputCheck);
    console.log("  Has add button:", !!addButtonCheck);
    console.log("  Has user-subscriptions-page marker:", !!pageMarkerCheck);
    console.log("  Has add-subscriptions-section-content:", !!subscriptionContentCheck);
    console.log("  Has manage-subscriptions-title:", !!manageSubscriptionsCheck);
    
    // If URL is correct AND we have the key functional elements, consider it a subscription page
    return urlCheck && (searchInputCheck || addButtonCheck || pageMarkerCheck || subscriptionContentCheck || manageSubscriptionsCheck);
  }

  async function waitForSubscriptionPage(maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
      console.log(`� Attempt ${i + 1}/${maxAttempts} to detect subscription page...`);
      
      if (isSubscriptionPage()) {
        console.log("✅ Subscription page detected!");
        return true;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log("❌ Failed to detect subscription page after", maxAttempts, "attempts");
    return false;
  }

  console.log("🔍 Starting subscription page detection...");
  
  // Try immediate detection first
  if (isSubscriptionPage()) {
    console.log("✅ Immediate detection successful - starting auto-fill");
    setTimeout(addServicesToSubscription, 1000);
  } else {
    console.log("⏳ Page not ready yet, waiting for elements to load...");
    
    // Wait for subscription page to be ready
    waitForSubscriptionPage().then(isReady => {
      if (isReady) {
        console.log("✅ Page ready - starting auto-fill");
        setTimeout(addServicesToSubscription, 1000);
      } else {
        console.log("❌ Could not detect subscription page elements");
        console.log("📍 Current URL:", window.location.href);
        console.log("📍 Current pathname:", window.location.pathname);
      }
    });
  }
})();
