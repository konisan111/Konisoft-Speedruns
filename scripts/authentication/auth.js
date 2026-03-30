//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * auth.js
 * Handles primary authentication workflows, including manual login,
 * registration, Google OAuth integration, and profile picture uploads.
 */

// --- Module Imports ---
import { showToast } from "../elements/toast-error.js";

// --- DOM Elements ---
const loginBtn = document.getElementById("login-button");
const uploadPfpBtn = document.getElementById("pfp-send-button");

// --- Global State ---
const isHungarian = localStorage.getItem("language") === "hu";
window.isGoogleAuthSetup = false;
let isGoogleRegistration = false;

// --- Utility: File Conversion ---
/**
 * Converts a file to a Base64 string.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>}
 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// --- Authentication: Login ---
loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  try {
    const response = await fetch(
      "https://konisoftspeedruns.onrender.com/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("token", result.token);
      showToast(
        isHungarian ? "Sikeres bejelentkezés!" : "Login was successful!",
        "success",
      );

      // Artificial delay for feedback before redirect
      await new Promise((resolve) => setTimeout(resolve, 1000));

      window.location.href = result.modViewEnabled
        ? "../sites/mod-view.html"
        : "../sites/lobby.html";
    } else {
      showToast(
        isHungarian ? "Sikertelen bejelentkezés!" : "Login was unsuccessful!",
        "error",
      );
    }
  } catch (err) {
    showToast(
      isHungarian
        ? "Hálózati hiba lépett fel!"
        : "There was a networking issue!",
      "error",
    );
  }
});

// --- Authentication: Google OAuth ---
/**
 * Callback for Google OAuth response.
 * @param {Object} googleResponse - Response from the Google Identity Services.
 */
window.handleGoogleResponse = async (googleResponse) => {
  try {
    const response = await fetch(
      "https://konisoftspeedruns.onrender.com/google-login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: googleResponse.credential }),
      },
    );

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("token", result.token);

      if (result.isNewUser) {
        isGoogleRegistration = true;

        const pfpPreview = document.getElementById("pfp-preview");
        if (pfpPreview && result.avatarUrl) {
          pfpPreview.style.backgroundImage = `url(${result.avatarUrl})`;
        }

        // Trigger pfp upload screen for new Google users
        if (typeof window.showPfpUploadScreen === "function") {
          window.showPfpUploadScreen();
        }
      } else {
        showToast(
          isHungarian
            ? `Sikeresen bejelentkeztél mint ${result.username}!`
            : `You successfully logged in as ${result.username}!`,
          "success",
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = "../sites/lobby.html";
      }
    } else {
      showToast(
        isHungarian
          ? `Hiba a bejelentkezés során: ${result.error}`
          : `There was an error while logging in: ${result.error}`,
        "error",
      );
    }
  } catch (err) {
    showToast(
      isHungarian
        ? "Hálózati hiba lépett fel!"
        : "There was a networking issue!",
      "error",
    );
  }
};

// --- Profile Completion & Registration ---
uploadPfpBtn?.addEventListener("click", async () => {
  const nationality = document.getElementById("country-input").value;
  const pfpFileInput = document.getElementById("pfp-file-input");

  let imageData = null;
  let fileName = null;

  // Handle image selection if a file was provided
  if (pfpFileInput.files.length > 0) {
    const file = pfpFileInput.files[0];
    const base64 = await convertToBase64(file);
    imageData = base64.split(",")[1];
    fileName = file.name;
  }

  if (isGoogleRegistration) {
    // --- Google Profile Completion ---
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://konisoftspeedruns.onrender.com/complete-google-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nationality, imageData, fileName }),
        },
      );

      if (response.ok) {
        window.location.href = "../sites/lobby.html";
      } else {
        const result = await response.json();
        showToast(result.error, "error");
      }
    } catch (err) {
      showToast(
        isHungarian
          ? "Hiba a Google profil befejezésénél!"
          : "Completing Google profile failed!",
        "error",
      );
    }
  } else {
    // --- Manual Registration ---
    const username = document.getElementById("username-input").value;
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    if (!username || !email || !password) {
      showToast(
        isHungarian ? "Hiányzó adatok!" : "Missing required information!",
        "error",
      );
      return;
    }

    const userData = {
      username,
      email,
      password,
      nationality,
      imageData,
      fileName,
    };

    try {
      const response = await fetch(
        "https://konisoftspeedruns.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        },
      );

      const result = await response.json();
      if (response.ok) {
        showToast(
          isHungarian ? "Sikeres regisztráció!" : "Successful registration!",
          "success",
        );
        localStorage.setItem("token", result.token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = "../sites/lobby.html";
      } else {
        showToast(result.error, "error");
      }
    } catch (err) {
      showToast(
        isHungarian
          ? `Hiba a regisztráció során: ${err}`
          : `Error during registration: ${err}`,
        "error",
      );
    }
  }
});
