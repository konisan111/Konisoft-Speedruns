//  _           _         ___ _   
// | |_ ___ ___|_|___ ___|  _| |_ 
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
// 
/**
 * mod-view.js
 * Handles the moderator view, including video uploads, theme management, 
 * leaderboard generation, and user profile interactions.
 */

// --- Module Imports ---
import { getCountryCode } from "../flagcdn-api/get-country.js";
import { showToast } from "../elements/toast-error.js";
import { countries } from "../data/translations.js";

// --- State Management ---
let isHungarian = false;
let currentProfileData = null;

/**
 * Retrieves the translated name of a country.
 * @param {string} englishName - The English name of the country.
 * @param {string} lang - The target language code ('en' or 'hu').
 * @returns {string} - The translated country name.
 */
const getTranslatedCountry = (englishName, lang) => {
  if (!englishName || englishName === "Unknown") return "Unknown";
  const country = countries.find((c) => c.en === englishName);
  return country ? country[lang] : englishName;
};

// --- DOM Elements: Video Upload ---
const uploadBtn = document.getElementById("nav-upload");
const uploadBtnMobile = document.getElementById("nav-upload-mobile");
const uploadModal = document.getElementById("upload-modal");
const closeUploadModal = document.getElementById("close-upload-modal");
const selectVideoBtn = document.getElementById("select-video-btn");
const videoFileInput = document.getElementById("video-file-input");
const startUploadBtn = document.getElementById("start-upload-btn");
const cancelUploadBtn = document.getElementById("cancel-upload-btn");
const fileNameDisplay = document.getElementById("selected-file-name");

[uploadBtn, uploadBtnMobile].forEach((btn) => {
  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    uploadModal.classList.add("show");
  });
});

// --- Event Listeners: Modal Controls ---
closeUploadModal?.addEventListener("click", () =>
  uploadModal.classList.remove("show"),
);
cancelUploadBtn?.addEventListener("click", () =>
  uploadModal.classList.remove("show"),
);

uploadModal?.addEventListener("click", (e) => {
  if (e.target === uploadModal) {
    uploadModal.classList.remove("show");
  }
});

selectVideoBtn?.addEventListener("click", () => videoFileInput.click());
// Update display when a video file is selected
videoFileInput?.addEventListener("change", () => {
  if (videoFileInput.files.length > 0) {
    fileNameDisplay.textContent = videoFileInput.files[0].name;
  }
});

// --- Video Upload Logic ---
startUploadBtn?.addEventListener("click", async () => {
  const file = videoFileInput.files[0];

  const mins = parseInt(document.getElementById("time-minutes").value) || 0;
  const secs = parseInt(document.getElementById("time-seconds").value) || 0;
  const ms = parseInt(document.getElementById("time-milliseconds").value) || 0;
  const totalMs = mins * 60000 + secs * 1000 + ms;

  const token = localStorage.getItem("token");

  if (!file || totalMs <= 0) {
    showToast(
      isHungarian
        ? "Kérjük, válasszon egy fájlt, és adjon meg érvényes időt!"
        : "Please select a file and enter a valid time!",
      "error",
    );
    return;
  }

  const formData = new FormData();
  formData.append("video", file);
  formData.append("speedrunTime", totalMs);

  startUploadBtn.disabled = true;
  startUploadBtn.textContent = isHungarian
    ? "Feltöltés folyamatban..."
    : "Uploading...";

  try {
    // Submit the video and speedrun data to the backend
    const response = await fetch(
      "https://konisoftspeedruns.onrender.com/upload-video",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    if (response.ok) {
      showToast(
        isHungarian
          ? "Feltöltés sikeres! Várakozás az adminisztrátori jóváhagyásra."
          : "Upload successful! Waiting for admin approval.",
        "success",
      );
      uploadModal.classList.remove("show");
    } else {
      showToast(
        isHungarian
          ? "Sikertelen feltöltés! Próbálja újra később."
          : "Upload failed! Try again later.",
        "error",
      );
    }
  } catch (err) {
    showToast(
      isHungarian
        ? "Szerverhiba a feltöltés során."
        : "Server error during upload.",
      "error",
    );
  } finally {
    startUploadBtn.disabled = false;
    startUploadBtn.textContent = isHungarian ? "Feltöltés" : "Upload";
  }
});

// --- DOM Elements: Settings & Navigation ---
let settingsMobile = document.getElementById("settings-mobile");
const menuButtons = document.querySelectorAll(".menu-button");
// --- DOM Elements: Dropdown Menus ---
const dropdownMenuButtons = document.querySelectorAll(".dropdown-menu-button");
const dropdownMenu = document.getElementById("dropdown-menu");

// --- Theme Configuration ---
const THEME_FILES = {
  light: "../style/light-theme.css",
  dark: "../style/dark-theme.css",
};
let themeLink = document.getElementById("theme-css");
if (!themeLink) {
  themeLink = document.createElement("link");
  themeLink.id = "theme-css";
  themeLink.rel = "stylesheet";
  document.head.appendChild(themeLink);
}

/**
 * Applies the selected theme to the document.
 * @param {string} name - Theme name ('light' or 'dark').
 * @param {boolean} persist - Whether to save the preference to localStorage.
 */
function setTheme(name, persist) {
  const href = THEME_FILES[name];
  if (!href) return;
  themeLink.href = href;
  document.documentElement.dataset.theme = name;
  if (persist) localStorage.setItem("theme", name);
}

// Determine the initial theme based on storage or system preference
function initialTheme() {
  return (
    localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

// Toggle between light and dark themes
function toggle() {
  const cur = document.documentElement.dataset.theme || initialTheme();
  setTheme(cur === "dark" ? "light" : "dark", true);
}

setTheme(initialTheme(), false);

["#theme-switcher", "#theme-switcher-mobile"].forEach((id) => {
  const el = document.querySelector(id);
  if (el) el.addEventListener("click", toggle);
});

// --- Dropdown Menu Logic ---
function SelectOption(selectedButton, fromDropdown = false) {
  menuButtons.forEach((button) => (button.style.fontWeight = "500"));
  dropdownMenuButtons.forEach((button) => (button.style.fontWeight = "normal"));

  selectedButton.style.fontWeight = "bold";

  if (fromDropdown) {
    const index = Array.from(dropdownMenuButtons).indexOf(selectedButton);
    if (index !== -1 && menuButtons[index]) {
      menuButtons[index].style.fontWeight = "bold";
    }
  } else {
    const index = Array.from(menuButtons).indexOf(selectedButton);
    if (index !== -1 && dropdownMenuButtons[index]) {
      dropdownMenuButtons[index].style.fontWeight = "bold";
    }
  }
}

if (dropdownMenuButtons.length > 0) {
  dropdownMenuButtons[0].style.fontWeight = "bold";
}

dropdownMenuButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    SelectOption(event.currentTarget, true);
    ToggleDropdown(settingsMobile);
  });
});

menuButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    SelectOption(event.currentTarget, false);
  });
});

if (settingsMobile) {
  settingsMobile.addEventListener("click", (event) => {
    ToggleDropdown(event.currentTarget);
  });
}

function ToggleDropdown(button) {
  if (dropdownMenu.classList.contains("dropdown-menu-down")) {
    dropdownMenu.classList.add("dropdown-menu-up");
    dropdownMenu.classList.remove("dropdown-menu-down");
    if (settingsMobile) {
      settingsMobile.classList.add("dropdown-menu-up");
      settingsMobile.classList.remove("dropdown-menu-down");
    }
  } else {
    dropdownMenu.classList.add("dropdown-menu-down");
    dropdownMenu.classList.remove("dropdown-menu-up");
    if (settingsMobile) {
      settingsMobile.classList.add("dropdown-menu-down");
      settingsMobile.classList.remove("dropdown-menu-up");
    }
  }
}

// --- Lobby Initialization ---
const initLobby = () => {
  const languageButtons = [
    document.getElementById("language"),
    document.getElementById("language-mobile"),
  ];

  // --- Localization Data ---
  const uiTranslations = {
    en: {
      "nav-home": "Leaderboard",
      "nav-upload": "Upload your time",
      "nav-logout": "Logout",
      "nav-home-mobile": "Leaderboard",
      "nav-upload-mobile": "Upload your time",
      "nav-logout-mobile": "Logout",
      "leaderboard-main-title": "Leaderboard",
      "leaderboard-recordings-title": "Recordings",
      "leaderboard-scope": "global",
      "opt-nation": "By Nation",
      "opt-time": "By Time",
      "opt-game": "By Game",
      "opt-nation-1": "Global",
      "opt-time-1": "Shortest Time",
      "opt-time-2": "Longest Time",
      "opt-game-1": "All Games",
      "opt-game-2": "Lumi Dungeon of Dreadspire",
      "leaderboard-profile-title": "Profile",
      "leaderboard-country-title": "Country",
      "leaderboard-game-title": "Game",
      "leaderboard-date-title": "Date",
      "leaderboard-time-title": "Time",
      "profile-member-since": "Member since:",
      "profile-mini-title": "Leaderboard",
      "profile-logout-button": "Logout",
      "footer-text-1": "Konisoft Indie Game Studio",
      "footer-text-2": "info@konisoft.hu",
      "footer-text-3": "All rights reserved.",
      "opt-upload": "By Upload date",
      "opt-upload-1": "Newest",
      "opt-upload-2": "Oldest",
      "upload-modal-title": "Upload Time",
      "select-video-btn": "Select video file",
      "upload-time-label": "Speedrun Time:",
      "upload-time-min": "min",
      "upload-time-sec": "sec",
      "upload-time-ms": "ms",
      "start-upload-btn": "Upload",
      "cancel-upload-btn": "Cancel",
      "watch-text": "WATCH VIDEO",
    },
    hu: {
      "nav-home": "Ranglista",
      "nav-upload": "Idő feltöltése",
      "nav-logout": "Kijelentkezés",
      "nav-home-mobile": "Ranglista",
      "nav-upload-mobile": "Idő feltöltése",
      "nav-logout-mobile": "Kijelentkezés",
      "leaderboard-main-title": "Ranglista",
      "leaderboard-recordings-title": "Felvételek",
      "leaderboard-scope": "globális",
      "opt-nation": "Nemzet szerint",
      "opt-time": "Idő szerint",
      "opt-game": "Játék szerint",
      "opt-nation-1": "Globális",
      "opt-time-1": "Legrövidebb idő",
      "opt-time-2": "Leghosszabb idő",
      "opt-game-1": "Összes játék",
      "opt-game-2": "Lumi Dungeon of Dreadspire",
      "leaderboard-profile-title": "Profil",
      "leaderboard-country-title": "Ország",
      "leaderboard-game-title": "Játék",
      "leaderboard-date-title": "Dátum",
      "leaderboard-time-title": "Idő",
      "profile-member-since": "Fiók létrehozva:",
      "profile-mini-title": "Ranglista",
      "profile-logout-button": "Kijelentkezés",
      "footer-text-1": "Konisoft Indie Játék Stúdió",
      "footer-text-2": "info@konisoft.hu",
      "footer-text-3": "Minden jog fenntartva.",
      "opt-upload": "Dátum szerint",
      "opt-upload-1": "Legújabb",
      "opt-upload-2": "Legrégebbi",
      "upload-modal-title": "Idő Feltöltése",
      "select-video-btn": "Videófájl kiválasztása",
      "upload-time-label": "Speedrun Idő:",
      "upload-time-min": "perc",
      "upload-time-sec": "mp",
      "upload-time-ms": "ms",
      "start-upload-btn": "Feltöltés",
      "cancel-upload-btn": "Mégse",
      "watch-text": "VIDEÓ MEGTEKINTÉSE",
    },
  };

  // Default language state
  let currentLanguage = "en";

  // Update all UI text elements based on the current language
  const updateTexts = () => {
    const lang = currentLanguage;
    Object.keys(uiTranslations[lang]).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = uiTranslations[lang][id];
    });

    if (currentProfileData) {
      const profileNat = document.getElementById("profile-country-name-static");
      if (profileNat) {
        profileNat.textContent = getTranslatedCountry(
          currentProfileData.nationality,
          lang,
        );
      }

      const profileDate = document.getElementById("profile-creation-date");
      if (profileDate && currentProfileData.accountCreation) {
        const dateObj = new Date(currentProfileData.accountCreation);
        const formattedDate =
          lang === "en"
            ? dateObj.toLocaleDateString("en-US")
            : dateObj.toLocaleDateString("hu-HU");

        profileDate.innerHTML = `<span id="profile-member-since">${uiTranslations[lang]["profile-member-since"]}</span> ${formattedDate}`;
      }
    }
  };

  // Update the language toggle button icon
  const updateFlags = () => {
    const flag = currentLanguage === "hu" ? "lang_en.webp" : "lang_hu.webp";
    languageButtons.forEach((btn) => {
      if (btn) btn.style.backgroundImage = `url(../images/${flag})`;
    });
  };

  // Handle language switch: update UI and refresh data
  const handleLanguageSwitch = () => {
    currentLanguage = currentLanguage === "en" ? "hu" : "en";
    isHungarian = currentLanguage === "hu";
    updateFlags();
    updateTexts();

    document.querySelectorAll(".dropdown-text").forEach((header) => {
      if (header.dataset.selectedId) {
        header.textContent =
          uiTranslations[currentLanguage][header.dataset.selectedId];
      } else if (header.dataset.value) {
        header.textContent = getTranslatedCountry(
          header.dataset.value,
          currentLanguage,
        );
      }
    });

    document.querySelectorAll(".nation-item").forEach((item) => {
      if (item.id === "opt-nation-1") {
        item.textContent = uiTranslations[currentLanguage]["opt-nation-1"];
      } else {
        item.textContent = getTranslatedCountry(
          item.dataset.value,
          currentLanguage,
        );
      }
    });

    generateLeaderboard(false);
    generateMiniLeaderboard(false);
  };

  window.handleLanguageSwitchExternal = handleLanguageSwitch;
  window.updateTextsExternal = updateTexts;

  languageButtons.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      btn.style.opacity = 0;
      setTimeout(() => {
        handleLanguageSwitch();
        btn.style.opacity = 1;
      }, 300);
    });
  });

  // --- Leaderboard Generation ---
  const generateLeaderboard = async (animate = true) => {
    const wrapper = document.getElementById("leaderboard-card-container");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    try {
      // Retrieve the latest speedrun data for moderators
      const response = await fetch(
        "https://konisoftspeedruns.onrender.com/mod-leaderboard",
      );
      if (!response.ok) throw new Error("Hiba a letöltéskor");

      const rawData = await response.json();

      // Extract current filter values from the UI
      const nationFilterEl = document.getElementById("opt-nation");
      const nationFilterValue = nationFilterEl?.dataset.value;
      const timeFilterText = document.getElementById("opt-time")?.textContent;
      const uploadFilterText =
        document.getElementById("opt-upload")?.textContent;

      let realData = rawData;

      // Apply nation-based filtering
      if (nationFilterValue && nationFilterValue !== "Global") {
        realData = rawData.filter(
          (entry) => entry.nationality === nationFilterValue,
        );
      }

      const newestTextEN = uiTranslations.en["opt-upload-1"];
      const newestTextHU = uiTranslations.hu["opt-upload-1"];
      const oldestTextEN = uiTranslations.en["opt-upload-2"];
      const oldestTextHU = uiTranslations.hu["opt-upload-2"];

      const longestTextEN = uiTranslations.en["opt-time-2"];
      const longestTextHU = uiTranslations.hu["opt-time-2"];

      // Sort data based on selected criteria (Upload Date or Time)
      if (
        uploadFilterText === newestTextEN ||
        uploadFilterText === newestTextHU
      ) {
        realData.sort(
          (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate),
        );
      } else if (
        uploadFilterText === oldestTextEN ||
        uploadFilterText === oldestTextHU
      ) {
        realData.sort(
          (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate),
        );
      } else if (
        timeFilterText === longestTextEN ||
        timeFilterText === longestTextHU
      ) {
        realData.sort((a, b) => b.speedrunTime - a.speedrunTime);
      } else {
        realData.sort((a, b) => a.speedrunTime - b.speedrunTime);
      }

      const currentUser =
        document.getElementById("profile-username")?.textContent || "";

      realData.forEach((entry, index) => {
        // Map data fields to local variables
        const formattedTime = formatSpeedrunTime(entry.speedrunTime);
        const countryCode = getCountryCode(entry.nationality);
        const flagUrl =
          countryCode === "un"
            ? "../images/lang_en.webp"
            : `https://flagcdn.com/w80/${countryCode}.png`;
        const avatarUrl =
          entry.avatarUrl || "https://katona-konstanti.imgbb.com/";
        const videoLink = entry.videoUrl || entry.url || "#";
        const translatedCountryName = getTranslatedCountry(
          entry.nationality,
          currentLanguage,
        );

        const placement = index + 1;
        const isUser = entry.username === currentUser;

        const card = document.createElement("div");
        card.className = `leaderboard-card ${isUser ? "highlight-user" : ""}`;

        // Apply status-based styling (Approved vs. Pending)
        if (entry.approved) {
          card.style.backgroundColor = "rgba(0, 100, 0, 0.4)";
        } else {
          card.style.backgroundColor = "rgba(139, 0, 0, 0.4)";
        }

        // Apply entry animations for leaderboard cards
        if (animate) {
          card.style.opacity = "0";
          card.style.animation = `fadeSlideIn 0.4s ease forwards ${index * 0.05}s`;
        }
        // Generate the HTML structure for each leaderboard entry
        card.innerHTML = `
                <div class="leaderboard-user-information">
                    <div class="leaderboard-placement" style="font-weight: 800; margin-right: 10px; min-width: 25px; ${isUser ? "color: red;" : ""}">#${placement}</div>
                    <div class="leaderboard-profile-picture" style="background-image: url('${avatarUrl}'); background-size: cover; background-position: center;"></div>
                    <div class="leaderboard-username">${entry.username}</div>
                </div>
                <div class="leaderboard-country">
                    <div class="leaderboard-flag" style="background-image: url('${flagUrl}'); background-size: cover; background-position: center;"></div>
                    <span class="leaderboard-country-name">${translatedCountryName}</span>
                </div>
                <div class="leaderboard-game">Lumi Dungeon of Dreadspire</div>
                <div class="leaderboard-datetime">
                    <div class="leaderboard-date">${entry.uploadDate ? new Date(entry.uploadDate).toLocaleDateString() : new Date().toLocaleDateString()}</div>
                    <div class="leaderboard-time">${formattedTime}</div>
                </div>
                <div class="mod-controls" style="display: flex; align-items: center; gap: 15px;">
                    <a href="${videoLink}" target="_blank" class="leaderboard-watch-link">${uiTranslations[currentLanguage]["watch-text"]}</a>
                    ${
                      !entry.approved
                        ? `
                        <img src="../images/check_icon.png" class="mod-icon" title="Approve" onclick="verifyVideo('${entry.email}', '${entry.videoUrl}', true)" style="width: 20px; height: 20px; cursor: pointer;">
                        <img src="../images/error_icon.png" class="mod-icon" title="Reject" onclick="verifyVideo('${entry.email}', '${entry.videoUrl}', false)" style="width: 20px; height: 20px; cursor: pointer;">
                    `
                        : ""
                    }
                </div>
            `;
        wrapper.appendChild(card);
      });
    } catch (err) {
      showToast(
        isHungarian
          ? "Nem sikerült betölteni a ranglistát!"
          : "Loading the leaderboard was unsuccessful!",
        "error",
      );
      wrapper.innerHTML =
        "<p style='color: red;'>Hiba történt a ranglista betöltésekor.</p>";
    }
  };

  // We have to update everything to be displayed correctly.
  updateTexts();
  updateFlags();
  generateLeaderboard(true);

  const leaderboardContainer = document.getElementById("leaderboard-container");
  const profileContainer = document.getElementById("profile-container");

  const navHomeBtn = document.getElementById("nav-home");
  const navHomeMobileBtn = document.getElementById("nav-home-mobile");
  const navProfileBtn = document.getElementById("nav-profile");
  const navProfileMobileBtn = document.getElementById("nav-profile-mobile");

  const switchView = (fromEl, toEl, onStartFadeIn) => {
    if (fromEl.isAnimating || toEl.isAnimating) return;
    fromEl.isAnimating = true;
    toEl.isAnimating = true;

    document.body.style.overflow = "hidden";

    gsap.to(fromEl.children, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        const startWidth = fromEl.offsetWidth;
        const startHeight = fromEl.offsetHeight;

        fromEl.classList.add("hidden");
        gsap.set(fromEl.children, { clearProps: "opacity" });

        toEl.classList.remove("hidden");
        gsap.set(toEl.children, { opacity: 0 });

        const endWidth = toEl.offsetWidth;
        const endHeight = toEl.offsetHeight;

        gsap.set(toEl, {
          width: startWidth,
          height: startHeight,
          maxWidth: "none",
          overflow: "hidden",
          margin: "0 auto",
        });

        gsap.to(toEl, {
          duration: 0.4,
          width: endWidth,
          height: endHeight,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(toEl, {
              clearProps: "width,height,maxWidth,overflow,margin",
            });
            document.body.style.overflow = "";

            if (onStartFadeIn) onStartFadeIn();

            gsap.to(toEl.children, {
              duration: 0.3,
              opacity: 1,
              clearProps: "opacity",
              onComplete: () => {
                fromEl.isAnimating = false;
                toEl.isAnimating = false;
              },
            });
          },
        });
      },
    });
  };

  // --- View Management: Profile ---
  const openProfileView = async () => {
    if (!profileContainer.classList.contains("hidden")) return;

    await generateMiniLeaderboard();

    switchView(leaderboardContainer, profileContainer, () => {
      const userCard = document.querySelector(
        "#mini-leaderboard-cards .highlight-user",
      );
      const scrollContainer = document.getElementById("mini-leaderboard-cards");
      if (userCard && scrollContainer) {
        const scrollPos =
          userCard.offsetTop -
          scrollContainer.clientHeight / 2 +
          userCard.clientHeight / 2;
        scrollContainer.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    });
  };

  // --- View Management: Leaderboard ---
  const openHomeView = () => {
    if (!leaderboardContainer.classList.contains("hidden")) return;

    const wrapper = document.getElementById("leaderboard-card-container");
    if (wrapper) wrapper.innerHTML = "";

    switchView(profileContainer, leaderboardContainer, () => {
      generateLeaderboard(true);
    });
  };

  if (navProfileBtn) navProfileBtn.addEventListener("click", openProfileView);
  if (navProfileMobileBtn)
    navProfileMobileBtn.addEventListener("click", openProfileView);

  if (navHomeBtn) navHomeBtn.addEventListener("click", openHomeView);
  if (navHomeMobileBtn)
    navHomeMobileBtn.addEventListener("click", openHomeView);

  // --- Mini Leaderboard (Profile View) ---
  const generateMiniLeaderboard = async () => {
    const miniWrapper = document.getElementById("mini-leaderboard-cards");
    if (!miniWrapper) return;
    miniWrapper.innerHTML = "";

    try {
      const response = await fetch(
        "https://konisoftspeedruns.onrender.com/mod-leaderboard",
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const miniData = await response.json();

      miniData.sort((a, b) => a.speedrunTime - b.speedrunTime);

      const currentUser =
        document.getElementById("profile-username").textContent;

      miniData.forEach((entry, index) => {
        // Map data fields to local variables
        const formattedTime = formatSpeedrunTime(entry.speedrunTime);
        const countryCode = getCountryCode(entry.nationality);
        const flagUrl =
          countryCode === "un"
            ? "../images/lang_en.webp"
            : `https://flagcdn.com/w80/${countryCode}.png`;

        const isUser = entry.username === currentUser;
        const placement = index + 1;

        const card = document.createElement("div");
        card.className = `leaderboard-card mini-card ${isUser ? "highlight-user" : ""}`;

        // Generate the HTML structure for each leaderboard entry
        card.innerHTML = `
                <div class="mini-placement" ${isUser ? 'style="color: red;"' : ""}>#${placement}</div>
                <div class="leaderboard-user-information">
                    <div class="leaderboard-profile-picture" style="background-image: url('${entry.avatarUrl || ""}'); background-size: cover; background-position: center;"></div>
                    <div class="leaderboard-username">${entry.username}</div>
                </div>
                <div class="leaderboard-country">
                    <div class="leaderboard-flag" style="background-image: url('${flagUrl}'); background-size: cover; background-position: center;"></div>
                </div>
                <div class="leaderboard-time">${formattedTime}</div>
            `;
        miniWrapper.appendChild(card);
      });
    } catch (err) {
      miniWrapper.innerHTML = "<p>Error loading data.</p>";
    }
  };

  // Populate the nation filter dropdown with translated country names
  const populateCountries = () => {
    const nationList = document.getElementById("nation-dropdown-list");
    if (!nationList) return;

    countries.forEach((country) => {
      const item = document.createElement("div");
      item.className = "custom-dropdown-item nation-item";
      item.dataset.value = country.en;
      item.textContent = currentLanguage === "hu" ? country.hu : country.en;
      nationList.appendChild(item);
    });
  };

  populateCountries();

  // --- Custom Dropdown UI Components ---
  const customDropdowns = document.querySelectorAll(".custom-dropdown");
  customDropdowns.forEach((dropdown) => {
    const header = dropdown.querySelector(".custom-dropdown-header");
    const items = dropdown.querySelectorAll(".custom-dropdown-item");

    header.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasOpen = dropdown.classList.contains("open");
      customDropdowns.forEach((d) => d.classList.remove("open"));
      if (!wasOpen) {
        dropdown.classList.add("open");
      }
    });

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        dropdown.classList.remove("open");
        e.stopPropagation();

        const textDiv = header.querySelector(".dropdown-text");
        if (textDiv) {
          textDiv.textContent = item.textContent;
          if (item.dataset.value) textDiv.dataset.value = item.dataset.value;

          if (item.id) {
            textDiv.dataset.selectedId = item.id;
          } else {
            delete textDiv.dataset.selectedId;
          }
        }
        generateLeaderboard(true);
      });
    });
  });

  document.addEventListener("click", (e) => {
    customDropdowns.forEach((d) => d.classList.remove("open"));

    if (
      settingsMobile &&
      dropdownMenu &&
      dropdownMenu.classList.contains("dropdown-menu-down")
    ) {
      if (
        !dropdownMenu.contains(e.target) &&
        !settingsMobile.contains(e.target)
      ) {
        ToggleDropdown(settingsMobile);
      }
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in-section").forEach((el) => {
    observer.observe(el);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLobby);
} else {
  initLobby();
}

// --- App Entry Point ---
// --- User Profile Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    // Fetch current user data from the backend
    const response = await fetch("https://konisoftspeedruns.onrender.com/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();

      // Map profile-specific DOM elements
      const profileName = document.getElementById("profile-username");
      const profileImg = document.getElementById("profile-picture");
      const profileNat = document.getElementById("profile-country-name-static");
      const profileFlag = document.getElementById("profile-flag");
      const profileDate = document.getElementById("profile-creation-date");
      const logoutBtn = document.getElementById("profile-logout-button");
      const countryName = userData.nationality;
      if (profileFlag && countryName) {
        const code = getCountryCode(countryName);
        profileFlag.style.backgroundImage =
          `url('https://flagcdn.com/w80/${code}.png')` ||
          "https://i.ibb.co/20fL10wk/no-pfp.png";
      }

      // Format and display account creation date
      if (profileDate) {
        if (userData.accountCreation) {
          const dateObj = new Date(userData.accountCreation);
          profileDate.textContent = dateObj.toLocaleDateString("hu-HU");
        } else {
          profileDate.textContent = "???";
        }
      }

      if (profileName) profileName.textContent = userData.username || "???";

      if (profileNat) {
        const currentLang = isHungarian ? "hu" : "en";
        profileNat.textContent =
          getTranslatedCountry(userData.nationality, currentLang) || "???";

        currentProfileData = userData;
      }

      if (profileImg && userData.avatarUrl) {
        profileImg.style.backgroundImage = `url('${userData.avatarUrl}')`;
      }

      if (typeof window.updateTextsExternal === "function") {
        window.updateTextsExternal();
      }

      // --- Navigation Bar Profile Sync ---
      const navUserProfile = document.getElementById("nav-user-profile");
      const navUsername = document.getElementById("nav-username");
      const navProfilePicture = document.getElementById("nav-profile-picture");

      const dropdownIcons = document.getElementById("dropdown-menu-icons");
      let navUserProfileMobile = document.getElementById(
        "nav-user-profile-mobile",
      );

      if (!navUserProfileMobile && dropdownIcons) {
        navUserProfileMobile = document.createElement("div");
        navUserProfileMobile.id = "nav-user-profile-mobile";
        navUserProfileMobile.className = "hidden";
        navUserProfileMobile.innerHTML = `
                    <div id="nav-profile-picture-mobile"></div>
                    <span id="nav-username-mobile"></span>
                `;
        dropdownIcons.parentNode.insertBefore(
          navUserProfileMobile,
          dropdownIcons,
        );
      }

      const navUsernameMobile = document.getElementById("nav-username-mobile");
      const navProfilePictureMobile = document.getElementById(
        "nav-profile-picture-mobile",
      );

      if (navUsername) navUsername.textContent = userData.username || "???";
      if (navUsernameMobile)
        navUsernameMobile.textContent = userData.username || "???";

      if (navProfilePicture && userData.avatarUrl) {
        navProfilePicture.style.backgroundImage = `url('${userData.avatarUrl}')`;
      }
      if (navProfilePictureMobile && userData.avatarUrl) {
        navProfilePictureMobile.style.backgroundImage = `url('${userData.avatarUrl}')`;
      }

      // Dynamically set profile background color based on avatar palette
      if (userData.avatarUrl) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = userData.avatarUrl;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          canvas.width = 1;
          canvas.height = 1;

          ctx.drawImage(img, 0, 0, 1, 1);

          try {
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            const distToBlack = Math.sqrt(
              Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2),
            );
            const distToWhite = Math.sqrt(
              Math.pow(r - 255, 2) +
                Math.pow(g - 255, 2) +
                Math.pow(b - 255, 2),
            );

            if (distToBlack > 60 && distToWhite > 60) {
              if (navUserProfile)
                navUserProfile.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.25)`;
              if (navUserProfileMobile)
                navUserProfileMobile.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.25)`;
            }
          } catch (e) {}
        };
      }

      if (navUserProfile) {
        navUserProfile.classList.remove("hidden");
        navUserProfile.addEventListener("click", () => {
          const profileBtn = document.getElementById("nav-profile");
          if (profileBtn) profileBtn.click();
        });
      }

      if (navUserProfileMobile) {
        navUserProfileMobile.classList.remove("hidden");
        navUserProfileMobile.addEventListener("click", () => {
          const profileBtnMobile =
            document.getElementById("nav-profile-mobile");
          if (profileBtnMobile) profileBtnMobile.click();
          const settingsMobileBtn = document.getElementById("settings-mobile");
          if (settingsMobileBtn && typeof ToggleDropdown === "function") {
            ToggleDropdown(settingsMobileBtn);
          }
        });
      }

      // --- Authentication ---
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("token");
          window.location.href = "../../index.html";
        });
      }
    } else {
      showToast(
        isHungarian
          ? "Nem sikerült lekérni az adatokat!"
          : "There was an error while getting information!",
        "error",
      );
    }
  } catch (err) {
    showToast(isHungarian ? "Hiba történt!" : "There was an error!", "error");
  }
});

/**
 * Formats milliseconds into a MM:SS.mmm string.
 * @param {number} ms - Time in milliseconds.
 * @returns {string}
 */
const formatSpeedrunTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

/**
 * Moderator action: Approve or Reject a submitted video.
 */
window.verifyVideo = async (email, videoUrl, approved) => {
  try {
    const response = await fetch(
      "https://konisoftspeedruns.onrender.com/verify-video",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, videoUrl, approved }),
      },
    );

    if (response.ok) {
      showToast(
        isHungarian ? "Állapot frissítve!" : "Status updated!",
        "success",
      );
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};
