//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * html-elements.js
 * Centralized export of DOM element references used throughout
 * the authentication and landing pages.
 */

// --- Global Containers ---
export const mainContainer = document.getElementById("container");
export const logo = document.getElementById("logo");
export const passwordLabels = document.getElementById("password-labels");
export const copyright = document.getElementById("copyright");

// --- Form Control Buttons ---
export const registerButton = document.getElementById("register-button");
export const backToLoginButton = document.getElementById("back-to-login");
export const loginButton = document.getElementById("login-button");
export const forgotPassword = document.getElementById("forgot-password");
export const loginSeparator = document.getElementById(
  "login-register-separator",
);
export const googleLoginButton = document.getElementById("google-login");

// --- Input Fields & Labels ---
export const usernameLabel = document.getElementById("username-label");
export const usernameInput = document.getElementById("username-input");
export const emailLabel = document.getElementById("email-label");
export const emailInput = document.getElementById("email-input");
export const passwordInput = document.getElementById("password-input");
export const repeatPasswordLabel = document.getElementById(
  "repeat-password-label",
);
export const repeatPasswordInput = document.getElementById(
  "repeat-password-input",
);

// --- Dropdowns & Selection ---
export const customCountryDropdown = document.getElementById(
  "custom-country-dropdown",
);
export const countryOptions = document.getElementById("country-options");
export const hiddenCountryInput = document.getElementById("country-input");

// --- Profile Picture Management ---
export const pfpUploadContainer = document.getElementById(
  "pfp-upload-container",
);
export const pfpPreview = document.getElementById("pfp-preview");
export const pfpUploadButton = document.getElementById("pfp-upload-button");
export const pfpSendButton = document.getElementById("pfp-send-button");
export const pfpFileInput = document.getElementById("pfp-file-input");
