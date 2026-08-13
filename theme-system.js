/**
 * THEME SYSTEM - Light & Dark Mode Controller
 * Handles theme switching, persistence, and system preference detection
 */

(function() {
  'use strict';

  const ThemeSystem = {
    STORAGE_KEY: 'noble-cake-theme',
    THEMES: {
      LIGHT: 'light',
      DARK: 'dark'
    },

    // ============================================================
    // INITIALIZATION
    // ============================================================

    init() {
      this.currentTheme = this.getInitialTheme();
      this.applyTheme(this.currentTheme, false); // No transition on load
      this.setupToggleButton();
      this.setupSystemPreferenceListener();
      this.updateDynamicElements();

      console.log('🎨 Theme system initialized:', this.currentTheme);
    },

    // ============================================================
    // THEME DETECTION
    // ============================================================

    getInitialTheme() {
      // 1. Check localStorage first (user preference)
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme && Object.values(this.THEMES).includes(savedTheme)) {
        return savedTheme;
      }

      // 2. Check system preference
      if (window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT;
      }

      // 3. Default to light
      return this.THEMES.LIGHT;
    },

    // ============================================================
    // THEME APPLICATION
    // ============================================================

    applyTheme(theme, withTransition = true) {
      const html = document.documentElement;

      // Add transition class if needed
      if (withTransition) {
        html.classList.add('theme-transitioning');
      }

      // Set theme attribute
      html.setAttribute('data-theme', theme);
      this.currentTheme = theme;

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, theme);

      // Update dynamic elements that need JS updates
      this.updateDynamicElements();

      // Remove transition class after animation completes
      if (withTransition) {
        setTimeout(() => {
          html.classList.remove('theme-transitioning');
        }, 400);
      }

      // Dispatch custom event for other systems
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme }
      }));
    },

    toggleTheme() {
      const newTheme = this.currentTheme === this.THEMES.DARK
        ? this.THEMES.LIGHT
        : this.THEMES.DARK;

      this.applyTheme(newTheme, true);
    },

    // ============================================================
    // TOGGLE BUTTON
    // ============================================================

    setupToggleButton() {
      const button = document.getElementById('themeToggle');
      if (!button) {
        console.warn('Theme toggle button not found');
        return;
      }

      button.addEventListener('click', () => {
        this.toggleTheme();

        // Animate button
        button.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
          button.style.transform = '';
        }, 300);
      });

      // Update button label
      this.updateToggleLabel();
    },

    updateToggleLabel() {
      const label = document.querySelector('.theme-toggle__label');
      if (label) {
        label.textContent = this.currentTheme === this.THEMES.DARK ? 'Light' : 'Dark';
      }
    },

    // ============================================================
    // SYSTEM PREFERENCE LISTENER
    // ============================================================

    setupSystemPreferenceListener() {
      if (!window.matchMedia) return;

      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Listen for system theme changes
      darkModeQuery.addEventListener('change', (e) => {
        // Only apply system preference if user hasn't manually set theme
        const userSetTheme = localStorage.getItem(this.STORAGE_KEY);
        if (!userSetTheme) {
          const newTheme = e.matches ? this.THEMES.DARK : this.THEMES.LIGHT;
          this.applyTheme(newTheme, true);
        }
      });
    },

    // ============================================================
    // DYNAMIC ELEMENT UPDATES
    // ============================================================

    updateDynamicElements() {
      this.updateToggleLabel();
      this.updateGradients();
      this.updateCursorEffects();
      this.updateSealSVG();
    },

    updateGradients() {
      // Update dynamic mesh gradient colors based on theme
      const isLight = this.currentTheme === this.THEMES.LIGHT;

      // Update CSS custom properties for gradients if needed
      const root = document.documentElement;

      if (isLight) {
        root.style.setProperty('--mesh-intensity', '0.06');
      } else {
        root.style.setProperty('--mesh-intensity', '0.10');
      }
    },

    updateCursorEffects() {
      // Cursor effects are handled via CSS, but we can trigger reflow if needed
      const cursor = document.querySelector('.cursor');
      if (cursor) {
        cursor.style.opacity = '0.99';
        setTimeout(() => {
          cursor.style.opacity = '';
        }, 50);
      }
    },

    updateSealSVG() {
      // Update seal SVG colors dynamically
      const seals = document.querySelectorAll('.seal svg');
      const isLight = this.currentTheme === this.THEMES.LIGHT;

      seals.forEach(svg => {
        const bgCircle = svg.querySelector('circle[fill="#0A0C0A"]');
        const fgElements = svg.querySelectorAll('[fill="#F1F1E7"], [stroke="#F1F1E7"]');

        if (bgCircle) {
          bgCircle.setAttribute('fill', isLight ? '#FFFFFF' : '#0A0C0A');
        }

        fgElements.forEach(el => {
          if (el.hasAttribute('fill')) {
            el.setAttribute('fill', isLight ? '#1A1C18' : '#F1F1E7');
          }
          if (el.hasAttribute('stroke')) {
            el.setAttribute('stroke', isLight ? '#1A1C18' : '#F1F1E7');
          }
        });
      });
    },

    // ============================================================
    // PUBLIC API
    // ============================================================

    getTheme() {
      return this.currentTheme;
    },

    setTheme(theme) {
      if (!Object.values(this.THEMES).includes(theme)) {
        console.error('Invalid theme:', theme);
        return;
      }
      this.applyTheme(theme, true);
    },

    isDark() {
      return this.currentTheme === this.THEMES.DARK;
    },

    isLight() {
      return this.currentTheme === this.THEMES.LIGHT;
    }
  };

  // ============================================================
  // AUTO-INITIALIZE
  // ============================================================

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ThemeSystem.init();
    });
  } else {
    ThemeSystem.init();
  }

  // ============================================================
  // EXPOSE TO WINDOW
  // ============================================================

  window.NobleTheme = ThemeSystem;

  // ============================================================
  // LISTEN FOR THEME CHANGES FROM OTHER SYSTEMS
  // ============================================================

  window.addEventListener('themechange', (e) => {
    console.log('Theme changed to:', e.detail.theme);

    // Update gamification system colors if present
    if (window.NobleGamification && window.NobleGamification.updateTheme) {
      window.NobleGamification.updateTheme(e.detail.theme);
    }

    // Update animation system if present
    if (window.AnimationTriggers && window.AnimationTriggers.updateTheme) {
      window.AnimationTriggers.updateTheme(e.detail.theme);
    }
  });

  // ============================================================
  // KEYBOARD SHORTCUT (CMD/CTRL + K)
  // ============================================================

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      ThemeSystem.toggleTheme();
    }
  });

})();
