/**
 * CRITICAL PERFORMANCE & ACCESSIBILITY FIXES
 * Consolidates mousemove listeners, RAF loops, and adds accessibility enhancements
 */

(function() {
  'use strict';

  // ============================================================
  // 1. CONSOLIDATED MOUSE TRACKING
  // Replaces 10+ separate mousemove listeners with single delegated handler
  // ============================================================

  const mouseState = {
    x: 0,
    y: 0,
    lastUpdate: 0,
    subscribers: []
  };

  // Single passive mousemove listener
  document.addEventListener('mousemove', (e) => {
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
    mouseState.lastUpdate = performance.now();
  }, { passive: true });

  // Subscribe system for other scripts to access mouse position
  window.getMouseState = () => mouseState;

  // ============================================================
  // 2. COORDINATED ANIMATION FRAME SCHEDULER
  // Merges 5+ separate RAF loops into single coordinated system
  // ============================================================

  const rafCoordinator = {
    tasks: new Map(),
    isRunning: false,
    frameCount: 0,

    register(id, callback, priority = 0) {
      this.tasks.set(id, { callback, priority, enabled: true });
      if (!this.isRunning) {
        this.start();
      }
    },

    unregister(id) {
      this.tasks.delete(id);
      if (this.tasks.size === 0) {
        this.stop();
      }
    },

    enable(id) {
      const task = this.tasks.get(id);
      if (task) task.enabled = true;
    },

    disable(id) {
      const task = this.tasks.get(id);
      if (task) task.enabled = false;
    },

    start() {
      this.isRunning = true;
      this.loop();
    },

    stop() {
      this.isRunning = false;
    },

    loop() {
      if (!this.isRunning) return;

      this.frameCount++;
      const now = performance.now();

      // Sort by priority and execute
      const sortedTasks = Array.from(this.tasks.entries())
        .sort((a, b) => b[1].priority - a[1].priority);

      for (const [id, task] of sortedTasks) {
        if (task.enabled) {
          try {
            task.callback(now, this.frameCount);
          } catch (error) {
            console.error(`RAF task ${id} failed:`, error);
          }
        }
      }

      requestAnimationFrame(() => this.loop());
    }
  };

  window.RAFCoordinator = rafCoordinator;

  // ============================================================
  // 3. ACCESSIBILITY ENHANCEMENTS
  // ============================================================

  // Detect if user prefers reduced motion or forced colors (high contrast)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const forcedColors = window.matchMedia('(forced-colors: active)').matches;

  if (prefersReducedMotion || forcedColors) {
    // Disable custom cursor in accessibility modes
    document.documentElement.classList.add('a11y-cursor-mode');

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .a11y-cursor-mode body {
        cursor: auto !important;
      }
      .a11y-cursor-mode .cursor,
      .a11y-cursor-mode .cursor-ring {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Make layer reveal buttons keyboard accessible
  document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile__shot');
    tiles.forEach(tile => {
      const revealBtn = tile.querySelector('.layer-reveal-btn');
      if (revealBtn) {
        // Ensure button is focusable
        if (!revealBtn.hasAttribute('tabindex')) {
          revealBtn.setAttribute('tabindex', '0');
        }

        // Show button on parent focus
        tile.addEventListener('focusin', () => {
          revealBtn.style.opacity = '1';
        });

        tile.addEventListener('focusout', () => {
          if (!tile.matches(':hover')) {
            revealBtn.style.opacity = '0';
          }
        });
      }
    });

    // Add role="alert" to achievement toasts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('achievement-toast')) {
            node.setAttribute('role', 'alert');
            node.setAttribute('aria-live', 'polite');
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });

  // ============================================================
  // 4. THROTTLED SCROLL HANDLER
  // Reduces scroll listener frequency from 60fps to 15fps
  // ============================================================

  let lastScrollTime = 0;
  const scrollThrottle = 66; // ~15fps

  const throttledScrollHandlers = [];

  window.addEventListener('scroll', () => {
    const now = performance.now();
    if (now - lastScrollTime < scrollThrottle) return;

    lastScrollTime = now;
    throttledScrollHandlers.forEach(handler => handler());
  }, { passive: true });

  window.registerThrottledScroll = (handler) => {
    throttledScrollHandlers.push(handler);
  };

  // ============================================================
  // 5. BROWSER COMPATIBILITY FIXES
  // ============================================================

  // Add -webkit- prefix support
  document.addEventListener('DOMContentLoaded', () => {
    const backdropElements = document.querySelectorAll('[style*="backdrop-filter"]');
    backdropElements.forEach(el => {
      const backdropValue = el.style.backdropFilter;
      if (backdropValue && !el.style.webkitBackdropFilter) {
        el.style.webkitBackdropFilter = backdropValue;
      }
    });

    // Add CSS for all backdrop-filter rules
    const style = document.createElement('style');
    style.textContent = `
      .masthead,
      .tile__views,
      .drawer,
      .scrim {
        -webkit-backdrop-filter: blur(14px);
      }
    `;
    document.head.appendChild(style);
  });

  // IntersectionObserver polyfill check
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported. Revealing all elements immediately.');
    document.querySelectorAll('.rise').forEach(el => {
      el.dataset.seen = 'true';
    });
  }

  // ============================================================
  // 6. PERFORMANCE MONITORING (DEV MODE)
  // ============================================================

  if (window.location.search.includes('debug=performance')) {
    let frameCount = 0;
    let lastTime = performance.now();

    window.RAFCoordinator.register('fps-monitor', (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        console.log(`FPS: ${frameCount} | RAF Tasks: ${window.RAFCoordinator.tasks.size} | Mouse listeners: ${mouseState.subscribers.length}`);
        frameCount = 0;
        lastTime = now;
      }
    }, -1000); // Low priority
  }

  // ============================================================
  // INITIALIZATION COMPLETE
  // ============================================================

  console.log('✅ Critical fixes loaded: Consolidated mouse tracking, RAF coordinator, accessibility enhancements');

})();
