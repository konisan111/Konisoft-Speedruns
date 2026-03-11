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
    const baseDelay = 0.15;
    const step = 0.15;
    element.style.animationDelay = (baseDelay + i * step) + 's';
  });

  const domImgSrcs = Array.from(document.images).map(img => img.src);

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

document.addEventListener("DOMContentLoaded", () => {
  const languageButtons = [
    document.getElementById("language"),
    document.getElementById("language-mobile")
  ];

  const translations = {
    en: {  
      "": ""
    },
    hu: {
      "": ""
    }
  };

  let currentLanguage = "en";

  const updateTexts = () => {
    const lang = currentLanguage;

    Object.keys(translations[lang]).forEach(id => {
      if (Array.isArray(translations[lang][id])) return;

      const el = document.getElementById(id);
      if (el) el.textContent = translations[lang][id];
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

  updateTexts();
  updateFlags();
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

document.addEventListener("DOMContentLoaded", () => {

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