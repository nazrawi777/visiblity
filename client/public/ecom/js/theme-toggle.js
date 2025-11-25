// Dark/Light Mode Toggle with localStorage

class ThemeManager {
  constructor() {
    this.storageKey = 'ecom_theme';
    this.theme = this.loadTheme();
    this.init();
  }

  loadTheme() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) return stored;
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  saveTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
    this.theme = theme;
  }

  init() {
    this.applyTheme(this.theme);
    this.setupToggleListeners();
    this.watchSystemPreference();
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    this.updateToggleIcon();
  }

  toggle() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.saveTheme(newTheme);
    this.applyTheme(newTheme);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: newTheme } 
    }));
  }

  setupToggleListeners() {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => this.toggle());
    });
  }

  updateToggleIcon() {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      const icon = toggle.querySelector('.theme-icon');
      if (icon) {
        icon.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
      }
    });
  }

  watchSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(this.storageKey)) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.saveTheme(newTheme);
        this.applyTheme(newTheme);
      }
    });
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.ThemeManager = themeManager;
}
