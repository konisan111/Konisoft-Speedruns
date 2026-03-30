//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * login-button.js
 * Contains the logic for the login button, including input validation
 * and error handling for the authentication form.
 */

/**
 * Handles the login button click event.
 * Validates the email and password inputs before proceeding.
 *
 * @param {boolean} isRegistering - Indicates if the user is currently in the registration view.
 * @param {HTMLInputElement} emailInput - The email input field element.
 * @param {HTMLInputElement} passwordInput - The password input field element.
 * @param {boolean} isHungarian - Current language state (true if Hungarian).
 * @param {Function} showToast - Function to display feedback messages to the user.
 */
export function loginButtonFunction(
  isRegistering,
  emailInput,
  passwordInput,
  isHungarian,
  showToast,
) {
  // If we are in registration mode, the login button should not perform login logic
  if (isRegistering) {
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let hasError = false;

  // Reset previous error states
  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");

  // --- Input Validation ---
  if (!email) {
    emailInput.classList.add("input-error");
    hasError = true;
  }

  if (!password) {
    passwordInput.classList.add("input-error");
    hasError = true;
  }

  // Display error message if validation fails
  if (hasError) {
    showToast(
      isHungarian
        ? "Kérjük, töltsön ki minden mezőt!"
        : "Please fill in all fields!",
      "error",
    );
    return;
  }
}
