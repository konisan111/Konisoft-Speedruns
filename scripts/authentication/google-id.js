//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * google-id.js
 * Manages the initialization and rendering of the Google Sign-In button
 * using the Google Identity Services client.
 */

// --- State Management ---
let isInitialized = false;

// --- UI Configuration ---

/**
 * Initializes and renders the Google login button.
 * @param {string} lang - The locale code for the button (e.g., 'en', 'hu').
 */
export function updateGoogleButton(lang) {
  if (typeof google !== "undefined" && google.accounts.id) {
    // --- Google Identity Services Initialization ---
    if (!isInitialized) {
      google.accounts.id.initialize({
        client_id:
          "362122696928-cppghj9ccgtf34qd4t1ugohbhptsaaco.apps.googleusercontent.com",
        callback: window.handleGoogleResponse,
        auto_select: false,
        use_fedcm: false,
      });
      isInitialized = true;
    }

    // --- Render the Login Button ---
    const target = document.getElementById("google-button-target");
    if (target) {
      target.innerHTML = ""; // Clear previous button instance
      google.accounts.id.renderButton(target, {
        type: "standard",
        theme: "outline",
        size: "large",
        locale: lang,
      });
    }
  }
}
