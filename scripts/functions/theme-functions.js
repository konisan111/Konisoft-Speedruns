//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * theme-functions.js
 * Manages theme persistence and application (light/dark mode)
 * across the platform.
 */

/**
 * Determines the initial theme based on local storage or system preferences.
 * @returns {string} - 'dark' or 'light'.
 */
export function initialTheme() {
  return (
    localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

/**
 * Toggles between light and dark themes.
 *
 * @param {Object} THEME_FILES - Mapping of theme names to CSS file paths.
 * @param {HTMLLinkElement} themeLink - The stylesheet link element for the theme.
 * @param {boolean} isHungarian - Current language state (true if Hungarian).
 */
export function toggle(THEME_FILES, themeLink, isHungarian) {
  const cur = document.documentElement.dataset.theme || initialTheme();
  setTheme(
    cur === "dark" ? "light" : "dark",
    true,
    THEME_FILES,
    themeLink,
    isHungarian,
  );
}

/**
 * Applies a specific theme and optionally persists it.
 *
 * @param {string} name - The name of the theme to apply ('light' or 'dark').
 * @param {boolean} persist - Whether to save the theme choice to local storage.
 * @param {Object} THEME_FILES - Mapping of theme names to CSS file paths.
 * @param {HTMLLinkElement} themeLink - The stylesheet link element for the theme.
 * @param {boolean} isHungarian - Current language state (true if Hungarian).
 */
export function setTheme(name, persist, THEME_FILES, themeLink, isHungarian) {
  const href = THEME_FILES[name];
  if (!href) return;

  themeLink.href = href;
  document.documentElement.dataset.theme = name;

  if (persist) {
    localStorage.setItem("theme", name);
  }

  // --- UI Update: Switcher Text ---
  const themeText = document.getElementById("theme-switcher-text");
  if (themeText) {
    if (isHungarian) {
      themeText.textContent = name === "dark" ? "Világos" : "Sötét";
    } else {
      themeText.textContent = name === "dark" ? "Light" : "Dark";
    }
  }
}
