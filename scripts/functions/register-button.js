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
  if (!isRegistering) {
    toggleUI();
    return;
  }

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;

  [usernameInput, emailInput, passwordInput, repeatPasswordInput].forEach(
    (el) => el.classList.remove("input-error")
  );

  if (username.length < 3 || username.length > 10) {
    usernameInput.classList.add("input-error");
    showToast(isHungarian ? "A felhasználónév 3-10 karakter kell legyen!" : "Username must be 3-10 characters!", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add("input-error");
    showToast(isHungarian ? "Érvénytelen email cím!" : "Invalid email address!", "error");
    return;
  }

  // Changed from {4,8} to {4,} to allow passwords longer than 8 characters
  if (!/^(?=.*[A-Z])(?=.*\d).{4,}$/.test(password)) {
    passwordInput.classList.add("input-error");
    showToast(isHungarian ? "A jelszó legalább 4 karakter, 1 nagybetű és 1 szám szükséges!" : "Password must be at least 4 characters with 1 capital and 1 number!", "error");
    return;
  }

  if (password !== repeatPassword) {
    passwordInput.classList.add("input-error");
    repeatPasswordInput.classList.add("input-error");
    showToast(isHungarian ? "A jelszavak nem egyeznek!" : "Passwords do not match!", "error");
    return;
  }

  showToast(isHungarian ? "Sikeres regisztráció!" : "Registration successful!", "success");
  if (typeof window.showPfpUploadScreen === "function") {
    window.showPfpUploadScreen();
  }
}