//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * pfp-send-button.js
 * Handles the final step of the registration process, validating the
 * country selection before submitting the user's profile data.
 */

/**
 * Validates the country selection and proceeds with registration.
 *
 * @param {HTMLElement} customCountryDropdown - The country dropdown element.
 * @param {HTMLInputElement} hiddenCountryInput - The hidden input storing the selected country value.
 * @param {boolean} isHungarian - Current language state (true if Hungarian).
 * @param {Function} showToast - Function to display feedback messages to the user.
 */
export function pfpSendButtonFunction(
  customCountryDropdown,
  hiddenCountryInput,
  isHungarian,
  showToast,
) {
  let isValid = false;

  // Reset previous error states
  customCountryDropdown.classList.remove("input-error");

  // --- Validation ---
  if (hiddenCountryInput.value === "") {
    customCountryDropdown.classList.add("input-error");
    showToast(
      isHungarian ? "Kérlek válassz egy országot." : "Please select a country.",
      "error",
    );
    isValid = false;
  }
  else { isValid = true; }

  if (isValid) {
    console.log("Registration complete! Valid country selected.");
  }
}
