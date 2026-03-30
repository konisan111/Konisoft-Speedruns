//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * toast-error.js
 * Handles the creation and display of transient feedback messages (toasts)
 * to notify users of successes or errors.
 */

/**
 * Displays a toast message in the UI.
 *
 * @param {string} message - The text content to display.
 * @param {string} type - The type of toast ('success' or 'error').
 */
export function showToast(message, type = "error") {
  let container = document.getElementById("toast-container");

  // Create the container if it doesn't exist
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  // Create the toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // Setup the status icon
  const icon = document.createElement("img");
  icon.className = "toast-icon";
  icon.src =
    type === "success"
      ? "../images/check_icon.png"
      : "../images/error_icon.png";
  icon.alt = type === "success" ? "Success" : "Error";

  // Setup the message text
  const textNode = document.createElement("span");
  textNode.textContent = message;

  // Assemble and display the toast
  toast.appendChild(icon);
  toast.appendChild(textNode);
  container.appendChild(toast);

  // Auto-remove the toast after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 5000);
}
