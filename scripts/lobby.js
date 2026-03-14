const themes = {
    light: "../style/light-theme.css",
    dark: "../style/dark-theme.css",
};

let isHungarian = false;

const timeForImage = 5;
let currentImageIndex = 0;

let settingsMobile = document.getElementById('settings-mobile');
const menuButtons = document.querySelectorAll('.menu-button');
const dropdownMenuButtons = document.querySelectorAll('.dropdown-menu-button');
const dropdownMenu = document.getElementById('dropdown-menu');

const gameVideos = [
    'videos/lumi.mp4',
    'videos/speedruns.mp4'
];

function preloadImages(urls) {
    const unique = Array.from(new Set(urls.filter(Boolean)));
    const loaders = unique.map(url => new Promise(resolve => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
    }));
    return Promise.all(loaders);
}

window.addEventListener('load', async () => {
  document.querySelectorAll('.fade-in').forEach((element, i) => {
    const baseDelay = 0;
    const step = 0.0;
    element.style.animationDelay = (baseDelay + i * step) + 's';
  });

  const domImgSrcs = Array.from(document.images).map(img => img.src);
  const gameCovers = []; 
  await preloadImages([...domImgSrcs, ...gameCovers]);

  document.querySelectorAll('.text-loading').forEach(el => el.classList.remove('text-loading'));
  document.querySelectorAll('.image-loading').forEach(el => el.classList.remove('image-loading'));
  document.querySelectorAll('.video-loading').forEach(el => el.classList.remove('video-loading'));
});

const THEME_FILES = { light: "../style/light-theme.css", dark: "../style/dark-theme.css" };

let themeLink = document.getElementById("theme-css");
if (!themeLink) {
    themeLink = document.createElement("link");
    themeLink.id = "theme-css";
    themeLink.rel = "stylesheet";
    document.head.appendChild(themeLink);
}

function setTheme(name, persist) {
    const href = THEME_FILES[name];
    if (!href) return console.error("Unknown theme:", name);
    themeLink.href = href;
    document.documentElement.dataset.theme = name;
    if (persist) localStorage.setItem("theme", name);
}

function initialTheme() {
  return localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function toggle() {
    const cur = document.documentElement.dataset.theme || initialTheme();
    setTheme(cur === "dark" ? "light" : "dark", true);
}

setTheme(initialTheme(), false);

["#theme-switcher", "#theme-switcher-mobile"].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.addEventListener("click", toggle);
});

function SelectOption(selectedButton, fromDropdown = false) {
    menuButtons.forEach(button => button.style.fontWeight = '500');
    dropdownMenuButtons.forEach(button => button.style.fontWeight = 'normal');

    selectedButton.style.fontWeight = 'bold';

    if (fromDropdown) {
        const index = Array.from(dropdownMenuButtons).indexOf(selectedButton);
        if (index !== -1 && menuButtons[index]) {
            menuButtons[index].style.fontWeight = 'bold';
        }
    } else {
        const index = Array.from(menuButtons).indexOf(selectedButton);
        if (index !== -1 && dropdownMenuButtons[index]) {
            dropdownMenuButtons[index].style.fontWeight = 'bold';
        }
    }
}

if(dropdownMenuButtons.length > 0) {
    dropdownMenuButtons[0].style.fontWeight = 'bold';
}

dropdownMenuButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        SelectOption(event.currentTarget, true);
        ToggleDropdown(settingsMobile);
    });
});

menuButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        SelectOption(event.currentTarget, false);
    });
});

if(settingsMobile) {
    settingsMobile.addEventListener('click', (event) => {
        ToggleDropdown(event.currentTarget)
    });
}

function ToggleDropdown(button) {
    if (dropdownMenu.classList.contains('dropdown-menu-down')) {
        dropdownMenu.classList.add('dropdown-menu-up')
        dropdownMenu.classList.remove('dropdown-menu-down')
        settingsMobile.classList.add('dropdown-menu-up')
        settingsMobile.classList.remove('dropdown-menu-down')
    }
    else {
        dropdownMenu.classList.add('dropdown-menu-down')
        dropdownMenu.classList.remove('dropdown-menu-up')
        settingsMobile.classList.add('dropdown-menu-down')
        settingsMobile.classList.remove('dropdown-menu-up')
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const languageButtons = [
    document.getElementById("language"),
    document.getElementById("language-mobile")
  ];

  const uiTranslations = {
    en: {
      "account-information": "Information about account",
      "logout-button": "Logout",
      "leaderboard-profile-title": "Profile",
      "leaderboard-date-title": "Date",
      "leaderboard-time-title": "Time",
      "footer-text-1": "Konisoft Indie Game Studio since 2024.",
      "footer-text-2": "Games for gamers!",
      "footer-text-3": "All rights reserved.",
      "username": "User1234"
    },
    hu: {
      "account-information": "Fiók információk",
      "logout-button": "Kijelentkezés",
      "leaderboard-profile-title": "Profil",
      "leaderboard-date-title": "Dátum",
      "leaderboard-time-title": "Idő",
      "footer-text-1": "Konisoft Indie Game Studio 2024 óta.",
      "footer-text-2": "Játékok gamereknek!",
      "footer-text-3": "Minden jog fenntartva.",
      "username": "Felhasználó1234"
    }
  };

  let currentLanguage = "en";

  const updateTexts = () => {
    const lang = currentLanguage;
    Object.keys(uiTranslations[lang]).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = uiTranslations[lang][id];
    });
  };

  const updateFlags = () => {
    const flag = currentLanguage === "hu" ? "lang_en.webp" : "lang_hu.webp";
    languageButtons.forEach(btn => {
      if (btn) btn.style.backgroundImage = `url(../images/${flag})`;
    });
  };

  const handleLanguageSwitch = () => {
    currentLanguage = currentLanguage === "en" ? "hu" : "en";
    isHungarian = currentLanguage === "hu";
    updateFlags();
    updateTexts();
    generateLeaderboard();
  };

  languageButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      btn.style.opacity = 0;
      setTimeout(() => {
        handleLanguageSwitch();
        btn.style.opacity = 1;
      }, 300);
    });
  });

  const leaderboardData = [
    { username: "koni111", date: "2026.11.23", time: "12:21:41", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_hu.webp" },
    { username: "SpeedyGonzales", date: "2026.11.24", time: "12:45:10", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "PlayerOne", date: "2026.11.25", time: "13:05:22", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "ShadowRunner", date: "2026.11.25", time: "13:30:00", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_hu.webp" },
    { username: "GhostInTheShell", date: "2026.11.26", time: "14:12:15", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "NeonNinja", date: "2026.11.26", time: "14:40:55", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_hu.webp" },
    { username: "RetroGamer", date: "2026.11.27", time: "15:10:33", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "PixelKing", date: "2026.11.28", time: "16:00:01", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_hu.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" },
    { username: "TimeWalker", date: "2026.11.29", time: "16:45:59", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp" }
  ];

  const generateLeaderboard = () => {
    const wrapper = document.getElementById("leaderboard-card-container");
    if (!wrapper) return;
    
    wrapper.innerHTML = "";

    leaderboardData.forEach(entry => {
      const dateParts = entry.date.split('.');
      const formattedDate = currentLanguage === 'en' 
          ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` 
          : entry.date;

      const card = document.createElement("div");
      card.className = "leaderboard-card";
      
      card.innerHTML = `
        <div class="leaderboard-user-information">
            <div class="leaderboard-profile-picture" style="background-image: url('${entry.pfp}'); background-size: cover; background-position: center;"></div>
            <div class="leaderboard-flag" style="background-image: url('${entry.flag}'); background-size: cover; background-position: center;"></div>
            <div class="leaderboard-username">${entry.username}</div>
        </div>
        <div class="leaderboard-date">${formattedDate}</div>
        <div class="leaderboard-time">${entry.time}</div>
      `;
      wrapper.appendChild(card);
    });
  };

  updateTexts();
  updateFlags();
  generateLeaderboard();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-section").forEach(el => {
    observer.observe(el);
  });
});

function setAnchorDisabled(a, disabled) {
  if (!a) return;
  if (disabled) {
    if (!a.dataset.originalHref) a.dataset.originalHref = a.getAttribute("href") || "";
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
    a.setAttribute("tabindex", "-1");
    a.style.pointerEvents = "none";
    a.style.cursor = "not-allowed";
  } else {
    const href = a.dataset.originalHref || a.getAttribute("href");
    if (href) a.setAttribute("href", href);
    a.removeAttribute("aria-disabled");
    a.removeAttribute("tabindex");
    a.style.pointerEvents = "";
    a.style.cursor = "";
  }
}