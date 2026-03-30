//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * register-button.js
 * Handles the logic for the registration button, including input validation,
 * password matching, and transitioning to the profile picture upload screen.
 */

/**
 * Handles the registration button click event.
 * Performs validation or toggles the UI to registration mode.
 *
 * @param {boolean} isRegistering - Indicates if the user is currently in the registration view.
 * @param {Function} toggleUI - Function to switch between login and registration views.
 * @param {HTMLInputElement} usernameInput - The username input field.
 * @param {HTMLInputElement} emailInput - The email input field.
 * @param {HTMLInputElement} passwordInput - The password input field.
 * @param {HTMLInputElement} repeatPasswordInput - The repeat password input field.
 * @param {boolean} isHungarian - Current language state (true if Hungarian).
 * @param {Function} showToast - Function to display feedback messages to the user.
 */
export function registerButtonFunction(
  isRegistering,
  toggleUI,
  usernameInput,
  emailInput,
  passwordInput,
  repeatPasswordInput,
  isHungarian,
  showToast,
) {
  // If we are not in registration mode, switch to it
  if (!isRegistering) {
    toggleUI();
    return;
  }

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  let hasError = false;

  // Reset previous error states
  [usernameInput, emailInput, passwordInput, repeatPasswordInput].forEach(
    (el) => {
      el.classList.remove("input-error");
    },
  );

  // --- Input Validation ---
  if (!username) {
    usernameInput.classList.add("input-error");
    hasError = true;
  }
  if (!email) {
    emailInput.classList.add("input-error");
    hasError = true;
  }
  if (!password) {
    passwordInput.classList.add("input-error");
    hasError = true;
  }
  if (!repeatPassword) {
    repeatPasswordInput.classList.add("input-error");
    hasError = true;
  }

  if (hasError) {
    showToast(
      isHungarian
        ? "Kérjük, töltsön ki minden mezőt!"
        : "Please fill in all fields!",
      "error",
    );
    return;
  }

  // --- Password Match Check ---
  if (password !== repeatPassword) {
    passwordInput.classList.add("input-error");
    repeatPasswordInput.classList.add("input-error");
    showToast(
      isHungarian ? "A jelszavak nem egyeznek!" : "Passwords do not match!",
      "error",
    );
    return;
  }

  // If all validations pass, move to the next screen
  if (typeof window.showPfpUploadScreen === "function") {
    window.showPfpUploadScreen();
  }
}
