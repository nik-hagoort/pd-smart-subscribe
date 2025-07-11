(function () {
  console.log("✅ PD Smart Extension Loaded");

  const seen = new WeakSet();

  // Function to detect current user ID from the page
  function getCurrentUserId() {
    // Try to get user ID from the page URL or meta tags
    const userLinks = document.querySelectorAll('a[href*="/users/"]');
    for (const link of userLinks) {
      const match = link.href.match(/\/users\/([A-Z0-9]+)/);
      if (match) {
        console.log("🔍 Detected user ID:", match[1]);
        return match[1];
      }
    }
    
    // Fallback: try to find it in the page content
    const pageText = document.body.innerText;
    const userIdMatch = pageText.match(/PT[A-Z0-9]{5}/);
    if (userIdMatch) {
      console.log("🔍 Detected user ID from content:", userIdMatch[0]);
      return userIdMatch[0];
    }
    
    console.warn("⚠️ Could not detect user ID, using fallback");
    return "PT2ST7G"; // Fallback based on the HTML analysis
  }

  function tryInject() {
    console.log("⏳ Looking for service cards...");

    // Find all service cards using a more specific selector
    const cards = [...document.querySelectorAll('[data-cy="business-service-status-item"]')]
      .filter(card => {
        if (seen.has(card)) return false;
        
        // Find the service name span within each card
        const serviceNameSpan = card.querySelector('span[title]');
        if (serviceNameSpan) {
          const serviceName = serviceNameSpan.getAttribute('title');
          // Accept any service that has a valid name (not empty)
          return serviceName && serviceName.trim().length > 0;
        }
        return false;
      });

    console.log("🔍 Found cards:", cards.length);

    if (cards.length === 0) {
      setTimeout(tryInject, 1000);
      return;
    }

    cards.forEach((card) => {
      if (card.querySelector("input[type=checkbox]")) return;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.marginRight = "8px";
      checkbox.className = "pd-service-checkbox";
      checkbox.style.accentColor = "#048A24"; // PagerDuty green
      checkbox.style.transform = "scale(1.2)";

      // Add event listener to update button text when checkbox state changes
      checkbox.addEventListener('change', () => {
        updateButtonText();
        updateSelectAllButtonText();
      });

      // Find the flex container with the service info
      const flexContainer = card.querySelector('.d-flex.align-items-center');
      if (flexContainer) {
        // Insert checkbox at the beginning of the flex container
        flexContainer.insertBefore(checkbox, flexContainer.firstChild);
      } else {
        // Fallback to prepending to the card if flex container not found
        card.prepend(checkbox);
      }
      
      seen.add(card);
    });

    injectButtons();
  }

  function updateButtonText() {
    const btn = document.querySelector("#pd-subscribe-button");
    if (!btn) return;
    
    const selectedCount = document.querySelectorAll("input.pd-service-checkbox:checked").length;
    if (selectedCount > 0) {
      btn.textContent = `Subscribe to Selected Services (${selectedCount})`;
    } else {
      btn.textContent = "Subscribe to Selected Services";
    }
  }

  function selectAllServices() {
    const checkboxes = document.querySelectorAll("input.pd-service-checkbox");
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    // If all are checked, uncheck all. Otherwise, check all.
    checkboxes.forEach(cb => {
      cb.checked = !allChecked;
    });
    
    updateButtonText();
    updateSelectAllButtonText();
  }

  function updateSelectAllButtonText() {
    const selectAllBtn = document.querySelector("#pd-select-all-button");
    if (!selectAllBtn) return;
    
    const checkboxes = document.querySelectorAll("input.pd-service-checkbox");
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    selectAllBtn.textContent = allChecked ? "Unselect All" : "Select All";
  }

  function injectButtons() {
    if (document.querySelector("#pd-subscribe-button")) return;

    console.log("🚀 Injecting buttons...");

    // Create container for buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    `;

    // Subscribe button
    const subscribeBtn = document.createElement("button");
    subscribeBtn.textContent = "Subscribe to Selected Services";
    subscribeBtn.id = "pd-subscribe-button";
    subscribeBtn.style.cssText = `
      padding: 12px 24px;
      background-color: #048A24;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.2s ease;
    `;

    // Select All button
    const selectAllBtn = document.createElement("button");
    selectAllBtn.textContent = "Select All";
    selectAllBtn.id = "pd-select-all-button";
    selectAllBtn.style.cssText = `
      padding: 8px 16px;
      background-color: #0066cc;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.2s ease;
    `;

    // Hover effects for subscribe button
    subscribeBtn.onmouseover = () => {
      subscribeBtn.style.backgroundColor = "#037020";
      subscribeBtn.style.transform = "translateY(-1px)";
      subscribeBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    };

    subscribeBtn.onmouseout = () => {
      subscribeBtn.style.backgroundColor = "#048A24";
      subscribeBtn.style.transform = "translateY(0)";
      subscribeBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    };

    // Hover effects for select all button
    selectAllBtn.onmouseover = () => {
      selectAllBtn.style.backgroundColor = "#0052a3";
      selectAllBtn.style.transform = "translateY(-1px)";
      selectAllBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    };

    selectAllBtn.onmouseout = () => {
      selectAllBtn.style.backgroundColor = "#0066cc";
      selectAllBtn.style.transform = "translateY(0)";
      selectAllBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    };

    // Click handlers

    // Click handlers
    selectAllBtn.onclick = selectAllServices;

    subscribeBtn.onclick = () => {
      const selectedServices = [...document.querySelectorAll("input.pd-service-checkbox:checked")]
        .map(cb => {
          // Get the service name from the title attribute of the span
          const serviceNameSpan = cb.parentElement.querySelector('span[title]');
          return serviceNameSpan ? serviceNameSpan.getAttribute('title') : 'Unknown Service';
        });

      if (selectedServices.length === 0) {
        alert("Please select at least one business service to subscribe to.");
        return;
      }

      console.log("✅ Selected services:", selectedServices);
      localStorage.setItem("pd_selected_services", JSON.stringify(selectedServices));

      const userId = getCurrentUserId();
      const baseUrl = window.location.origin;
      const targetUrl = `${baseUrl}/users/${userId}/subscriptions`;
      
      console.log("🔗 Navigating to:", targetUrl);
      window.location.href = targetUrl;
    };

    // Add buttons to container
    buttonContainer.appendChild(selectAllBtn);
    buttonContainer.appendChild(subscribeBtn);

    document.body.appendChild(buttonContainer);
  }

  // Check if we're on a status page that might have service cards
  function isStatusPage() {
    return window.location.pathname.includes('/status') || 
           document.querySelector('[data-cy="business-service-status-item"]') !== null;
  }

  // Only inject on status pages
  if (isStatusPage()) {
    // Delay until full DOM is ready
    window.addEventListener("load", () => {
      setTimeout(tryInject, 1000);
    });

    // Also try after a longer delay in case content loads dynamically
    setTimeout(tryInject, 3000);
  }
})();
