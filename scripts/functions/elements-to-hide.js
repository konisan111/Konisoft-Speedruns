//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * elements-to-hide.js
 * Provides a list of DOM element IDs that should be hidden
 * when transitioning between different authentication views.
 */

// --- Configuration ---

/**
 * Array of element IDs to be hidden during UI transitions.
 * @type {string[]}
 */
export const elementsToHide = [
  "username-label",
  "username-input",
  "email-label",
  "email-input",
  "password-input",
  "repeat-password-label",
  "repeat-password-input",
  "register-button",
  "back-to-login",
  "login-register-separator",
  "google-login",
  "logo",
  "password-labels",
  "login-button",
];
