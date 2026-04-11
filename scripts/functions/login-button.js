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
  if (isRegistering) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add("input-error");
    showToast(isHungarian ? "Érvénytelen email cím!" : "Invalid email address!", "error");
    return;
  }

  if (!password) {
    passwordInput.classList.add("input-error");
    showToast(isHungarian ? "Kérjük, adja meg a jelszót!" : "Please enter your password!", "error");
    return;
  }

  showToast(isHungarian ? "Sikeres bejelentkezés!" : "Login successful!", "success");
}