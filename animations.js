/* =============================================================
   NOBLE CAKE - ANIMATION TRIGGER LOGIC
   JavaScript handlers for micro-interactions
   ============================================================= */

(function () {
  "use strict";

  /* -------------------------------------------------------------
     UTILITY FUNCTIONS
     ------------------------------------------------------------- */

  // Add class, remove after animation completes
  function playAnimation(element, className, duration = 600) {
    if (!element) return;
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, duration);
  }

  // Debounce helper for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /* -------------------------------------------------------------
     BUTTON FEEDBACK
     Success and loading states
     ------------------------------------------------------------- */

  function setButtonLoading(button, isLoading = true) {
    if (isLoading) {
      button.classList.add("btn--loading");
      button.setAttribute("aria-busy", "true");
      button.disabled = true;
    } else {
      button.classList.remove("btn--loading");
      button.removeAttribute("aria-busy");
      button.disabled = false;
    }
  }

  function setButtonSuccess(button, duration = 600) {
    playAnimation(button, "btn--success", duration);
  }

  /* -------------------------------------------------------------
     BASKET COUNT PULSE
     Animate badge when count changes
     ------------------------------------------------------------- */

  function pulseBasketCount() {
    const countEl = document.getElementById("basketCount");
    if (countEl) {
      playAnimation(countEl, "count-pulse", 300);
    }
  }

  /* -------------------------------------------------------------
     QUANTITY BUMP
     Animate number when +/- pressed
     ------------------------------------------------------------- */

  function bumpQuantity(qtyElement) {
    if (qtyElement) {
      playAnimation(qtyElement, "qty--bump", 300);
    }
  }

  /* -------------------------------------------------------------
     TILE ADD ANIMATION
     Success feedback when adding to cart
     ------------------------------------------------------------- */

  function animateTileAdd(button) {
    if (button) {
      playAnimation(button, "added-animation", 500);
    }
  }

  /* -------------------------------------------------------------
     TICKET TOTAL UPDATE
     Bump animation when price changes
     ------------------------------------------------------------- */

  function animateTotalChange() {
    const totalEl = document.querySelector(".ticket__total");
    if (totalEl) {
      playAnimation(totalEl, "total-change", 300);
    }
  }

  /* -------------------------------------------------------------
     TICKET PREVIEW UPDATE
     Flash effect when configuration changes
     ------------------------------------------------------------- */

  function animateTicketUpdate() {
    const picEl = document.querySelector(".ticket__pic");
    if (picEl) {
      playAnimation(picEl, "updating", 300);
    }
  }

  /* -------------------------------------------------------------
     TOAST NOTIFICATIONS
     Show temporary success/error messages
     ------------------------------------------------------------- */

  const toast = {
    container: null,

    init() {
      if (!this.container) {
        this.container = document.createElement("div");
        this.container.className = "toast";
        this.container.setAttribute("role", "status");
        this.container.setAttribute("aria-live", "polite");
        document.body.appendChild(this.container);
      }
    },

    show(message, type = "success", duration = 3000) {
      this.init();

      // Update content and type
      this.container.textContent = message;
      this.container.className = `toast toast--${type}`;

      // Show toast
      requestAnimationFrame(() => {
        this.container.classList.add("toast--visible");
      });

      // Auto-hide
      setTimeout(() => {
        this.hide();
      }, duration);
    },

    hide() {
      if (this.container) {
        this.container.classList.remove("toast--visible");
      }
    },

    success(message, duration) {
      this.show(message, "success", duration);
    },

    error(message, duration) {
      this.show(message, "error", duration);
    }
  };

  /* -------------------------------------------------------------
     CHECKMARK COMPONENT
     SVG checkmark for success feedback
     ------------------------------------------------------------- */

  function createCheckmark() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "checkmark");
    svg.setAttribute("viewBox", "0 0 52 52");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "checkmark__circle");
    circle.setAttribute("cx", "26");
    circle.setAttribute("cy", "26");
    circle.setAttribute("r", "25");
    circle.setAttribute("fill", "none");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "checkmark__check");
    path.setAttribute("fill", "none");
    path.setAttribute("d", "M14.1 27.2l7.1 7.2 16.7-16.8");

    svg.appendChild(circle);
    svg.appendChild(path);

    return svg;
  }

  function showCheckmark(containerEl) {
    if (!containerEl) return;

    const checkmark = createCheckmark();
    containerEl.appendChild(checkmark);

    setTimeout(() => {
      checkmark.remove();
    }, 1200);
  }

  /* -------------------------------------------------------------
     SCROLL HEADER BEHAVIOR
     Hide header on scroll down, show on scroll up
     ------------------------------------------------------------- */

  const scrollHeader = {
    lastScrollY: 0,
    threshold: 100,

    init() {
      const masthead = document.querySelector(".masthead");
      if (!masthead) return;

      const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < this.threshold) {
          // Always show at top
          masthead.classList.remove("masthead--hidden");
        } else if (currentScrollY > this.lastScrollY) {
          // Scrolling down - hide
          masthead.classList.add("masthead--hidden");
        } else {
          // Scrolling up - show
          masthead.classList.remove("masthead--hidden");
        }

        this.lastScrollY = currentScrollY;
      }, 100);

      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  };

  /* -------------------------------------------------------------
     STAGGERED LIST ANIMATIONS
     Progressive reveal for dynamic content
     ------------------------------------------------------------- */

  function staggerElements(container, itemSelector, baseDelay = 60) {
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * baseDelay}ms`;
    });
  }

  /* -------------------------------------------------------------
     DRAWER ROW STAGGER
     Animate rows when drawer opens
     ------------------------------------------------------------- */

  function animateDrawerRows() {
    const drawerBody = document.getElementById("drawerBody");
    if (drawerBody) {
      const rows = drawerBody.querySelectorAll(".row");
      rows.forEach((row, index) => {
        row.style.animationDelay = `${index * 60}ms`;
      });
    }
  }

  /* -------------------------------------------------------------
     INTEGRATION HOOKS
     Functions to call from main application code
     ------------------------------------------------------------- */

  window.AnimationTriggers = {
    // Button states
    setButtonLoading,
    setButtonSuccess,

    // Cart interactions
    pulseBasketCount,
    bumpQuantity,
    animateTileAdd,

    // Configurator
    animateTotalChange,
    animateTicketUpdate,

    // Notifications
    toast,
    showCheckmark,

    // Scroll behavior
    initScrollHeader: () => scrollHeader.init(),

    // List animations
    staggerElements,
    animateDrawerRows,

    // Utility
    playAnimation
  };

  /* -------------------------------------------------------------
     AUTO-INITIALIZATION
     Set up observers and listeners on load
     ------------------------------------------------------------- */

  function init() {
    // Initialize scroll header behavior
    scrollHeader.init();

    // Enhance existing "Add to box" buttons
    const addButtons = document.querySelectorAll(".tile__add");
    addButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        animateTileAdd(this);
        pulseBasketCount();
      });
    });

    // Enhance quantity buttons
    const qtyButtons = document.querySelectorAll(".qty button");
    qtyButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const qtyContainer = this.closest(".qty");
        bumpQuantity(qtyContainer);
        pulseBasketCount();
      });
    });

    // Enhance configurator chips
    const chips = document.querySelectorAll(".chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", function () {
        // Trigger ticket update animation
        setTimeout(() => {
          animateTicketUpdate();
          animateTotalChange();
        }, 50);
      });
    });

    // Observe drawer opening
    const drawer = document.getElementById("drawer");
    if (drawer) {
      const drawerObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-open"
          ) {
            if (drawer.dataset.open === "true") {
              // Drawer just opened, animate rows
              setTimeout(() => {
                animateDrawerRows();
              }, 50);
            }
          }
        });
      });

      drawerObserver.observe(drawer, {
        attributes: true,
        attributeFilter: ["data-open"]
      });
    }

    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "#top") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
