import { getCountryCode } from "../flagcdn-api/get-country.js";
import { showToastError } from "./toast-error.js"; //

const uploadBtn = document.getElementById('nav-upload');
const uploadBtnMobile = document.getElementById('nav-upload-mobile');
const uploadModal = document.getElementById('upload-modal');
const closeUploadModal = document.getElementById('close-upload-modal');
const selectVideoBtn = document.getElementById('select-video-btn');
const videoFileInput = document.getElementById('video-file-input');
const startUploadBtn = document.getElementById('start-upload-btn');
const fileNameDisplay = document.getElementById('selected-file-name');

[uploadBtn, uploadBtnMobile].forEach(btn => {
    btn?.addEventListener('click', () => uploadModal.classList.remove('hidden'));
});

closeUploadModal?.addEventListener('click', () => uploadModal.classList.add('hidden'));

selectVideoBtn?.addEventListener('click', () => videoFileInput.click());

videoFileInput?.addEventListener('change', () => {
    if (videoFileInput.files.length > 0) {
        fileNameDisplay.textContent = videoFileInput.files[0].name;
    }
});

startUploadBtn?.addEventListener('click', async () => {
    const file = videoFileInput.files[0];
    const time = document.getElementById('speedrun-time-input').value;
    const token = localStorage.getItem('token'); //

    if (!file || !time) {
        showToastError("Please select a file and enter your time!");
        return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('speedrunTime', time);

    startUploadBtn.disabled = true;
    startUploadBtn.textContent = "Uploading...";

    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/upload-video', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (response.ok) {
            alert("Upload successful! o(*￣▽￣*)o Waiting for admin approval.");
            uploadModal.classList.add('hidden');
            location.reload();
        } else {
            showToastError("Upload failed! (´;ω;`) Try again later.");
        }
    } catch (err) {
        showToastError("Server error during upload.");
    } finally {
        startUploadBtn.disabled = false;
        startUploadBtn.textContent = "Upload";
    }
});
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
    if (!href) return;
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
        if(settingsMobile) {
            settingsMobile.classList.add('dropdown-menu-up')
            settingsMobile.classList.remove('dropdown-menu-down')
        }
    }
    else {
        dropdownMenu.classList.add('dropdown-menu-down')
        dropdownMenu.classList.remove('dropdown-menu-up')
        if(settingsMobile) {
            settingsMobile.classList.add('dropdown-menu-down')
            settingsMobile.classList.remove('dropdown-menu-up')
        }
    }
}

const initLobby = () => {
  const languageButtons = [
    document.getElementById("language"),
    document.getElementById("language-mobile")
  ];

  const countryTranslations = {
    "Hungary": { en: "Hungary", hu: "Magyarország" },
    "USA": { en: "USA", hu: "USA" },
    "UK": { en: "UK", hu: "Egyesült Királyság" },
    "Canada": { en: "Canada", hu: "Kanada" }
  };

  const uiTranslations = {
    en: {
      "nav-home": "Leaderboard",
      "nav-upload": "Upload your time",
      "nav-profile": "Profile",
      "nav-logout": "Logout",
      "nav-home-mobile": "Leaderboard",
      "nav-upload-mobile": "Upload your time",
      "nav-profile-mobile": "Profile",
      "nav-logout-mobile": "Logout",
      
      "leaderboard-main-title": "Leaderboard",
      "leaderboard-scope": "global",
      
      "opt-nation": "by nation",
      "opt-time": "by time",
      "opt-game": "by game",
      
      "opt-nation-1": "Global",
      "opt-nation-2": "Hungary",
      "opt-time-1": "All Time",
      "opt-time-2": "Monthly",
      "opt-game-1": "All Games",
      "opt-game-2": "Lumi Dungeon of Dreadspire",
      
      "leaderboard-profile-title": "Profile",
      "leaderboard-country-title": "Country",
      "leaderboard-game-title": "Game",
      "leaderboard-date-title": "Date",
      "leaderboard-time-title": "Time",
      
      "profile-member-since": "Member since:",
      "profile-country-name-static": "Hungary",
      "profile-mini-title": "Leaderboard",
      "profile-logout-button": "Logout",
      
      "footer-text-1": "Konisoft Indie Game Studio",
      "footer-text-2": "info@konisoft.hu",
      "footer-text-3": "All rights reserved."
    },
    hu: {
      "nav-home": "Ranglista",
      "nav-upload": "Idő feltöltése",
      "nav-profile": "Profil",
      "nav-logout": "Kijelentkezés",
      "nav-home-mobile": "Ranglista",
      "nav-upload-mobile": "Idő feltöltése",
      "nav-profile-mobile": "Profil",
      "nav-logout-mobile": "Kijelentkezés",
      
      "leaderboard-main-title": "Ranglista",
      "leaderboard-scope": "globális",
      
      "opt-nation": "nemzet szerint",
      "opt-time": "idő szerint",
      "opt-game": "játék szerint",
      
      "opt-nation-1": "Globális",
      "opt-nation-2": "Magyarország",
      "opt-time-1": "Összesített",
      "opt-time-2": "Havi",
      "opt-game-1": "Összes játék",
      "opt-game-2": "Lumi Dungeon of Dreadspire",
      
      "leaderboard-profile-title": "Profil",
      "leaderboard-country-title": "Ország",
      "leaderboard-game-title": "Játék",
      "leaderboard-date-title": "Dátum",
      "leaderboard-time-title": "Idő",
      
      "profile-member-since": "Fiók létrehozva:",
      "profile-country-name-static": "Magyarország",
      "profile-mini-title": "Ranglista",
      "profile-logout-button": "Kijelentkezés",
      
      "footer-text-1": "Konisoft Indie Játék Stúdió",
      "footer-text-2": "info@konisoft.hu",
      "footer-text-3": "Minden jog fenntartva."
    }
  };

  let currentLanguage = "en";

  const updateTexts = () => {
    const lang = currentLanguage;
    Object.keys(uiTranslations[lang]).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = uiTranslations[lang][id];
    });

    const profileCreationEl = document.getElementById("profile-creation-date");
    if (profileCreationEl) {
      const userCreationDate = "2024.01.15";
      const dateParts = userCreationDate.split('.');
      const formattedDate = lang === 'en' 
          ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` 
          : userCreationDate;
      
      profileCreationEl.innerHTML = `<span id="profile-member-since">${uiTranslations[lang]["profile-member-since"]}</span> ${formattedDate}`;
    }
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
    generateLeaderboard(false);
    generateMiniLeaderboard(false);
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

  const generateLeaderboard = async (animate = true) => {
    const wrapper = document.getElementById("leaderboard-card-container");
    if (!wrapper) return;
    
    wrapper.innerHTML = "";

    try {
        // Lekérjük a valódi adatokat a szerverről
        const response = await fetch('https://konisoftspeedruns.onrender.com/leaderboard');
        if (!response.ok) throw new Error("Hiba a letöltéskor");
        
        const realData = await response.json();

        realData.forEach((entry, index) => {
            // Idő formázása (perc:másodperc.tized)
            const formattedTime = formatSpeedrunTime(entry.speedrunTime);
            
            // Zászló kód lekérése
            const countryCode = getCountryCode(entry.nationality);
            const flagUrl = countryCode === "un" ? "../images/lang_en.webp" : `https://flagcdn.com/w80/${countryCode}.png`;
            
            // Profilkép (ha nincs, akkor placeholder)
            const avatarUrl = entry.avatarUrl || "../images/pfp_placeholder.webp";

            const card = document.createElement("div");
            card.className = "leaderboard-card";
            
            if (animate) {
                card.style.opacity = '0';
                card.style.animation = `fadeSlideIn 0.4s ease forwards ${index * 0.05}s`;
            }
            
            card.innerHTML = `
                <div class="leaderboard-user-information">
                    <div class="leaderboard-profile-picture" style="background-image: url('${avatarUrl}'); background-size: cover; background-position: center;"></div>
                    <div class="leaderboard-username">${entry.username}</div>
                </div>
                <div class="leaderboard-country">
                    <div class="leaderboard-flag" style="background-image: url('${flagUrl}'); background-size: cover; background-position: center;"></div>
                    <span class="leaderboard-country-name">${entry.nationality || 'Unknown'}</span>
                </div>
                <div class="leaderboard-game">Lumi Dungeon of Dreadspire</div>
                <div class="leaderboard-datetime">
                    <div class="leaderboard-date">${new Date().toLocaleDateString()}</div>
                    <div class="leaderboard-time">${formattedTime}</div>
                </div>
                <a href="${entry.videoUrl}" target="_blank" style="color: cyan; text-decoration: none; font-size: 12px; margin-top: 5px;">WATCH VIDEO</a>
            `;
            wrapper.appendChild(card);
        });
    } catch (err) {
        console.error("Nem sikerült betölteni a ranglistát:", err);
        wrapper.innerHTML = "<p style='color: red;'>Hiba történt a ranglista betöltésekor.</p>";
    }
};

  updateTexts();
  updateFlags();
  generateLeaderboard(true);

  const leaderboardContainer = document.getElementById('leaderboard-container');
  const profileContainer = document.getElementById('profile-container');
  
  const navHomeBtn = document.getElementById('nav-home');
  const navHomeMobileBtn = document.getElementById('nav-home-mobile');
  const navProfileBtn = document.getElementById('nav-profile');
  const navProfileMobileBtn = document.getElementById('nav-profile-mobile');

  const switchView = (fromEl, toEl, onStartFadeIn) => {
      if (fromEl.isAnimating) return;
      fromEl.isAnimating = true;
      toEl.isAnimating = true;

      document.body.style.overflow = 'hidden';

      gsap.to(fromEl.children, { 
          duration: 0.2, 
          opacity: 0, 
          onComplete: () => {
              const startWidth = fromEl.offsetWidth;
              const startHeight = fromEl.offsetHeight;

              fromEl.classList.add('hidden');
              gsap.set(fromEl.children, { clearProps: "opacity" }); 

              toEl.classList.remove('hidden');
              gsap.set(toEl.children, { opacity: 0 });

              const endWidth = toEl.offsetWidth;
              const endHeight = toEl.offsetHeight;

              gsap.set(toEl, { 
                  width: startWidth, 
                  height: startHeight, 
                  maxWidth: 'none',
                  overflow: 'hidden',
                  margin: '0 auto' 
              });

              gsap.to(toEl, {
                  duration: 0.4,
                  width: endWidth,
                  height: endHeight,
                  ease: "power2.inOut",
                  onComplete: () => {
                      gsap.set(toEl, { clearProps: "width,height,maxWidth,overflow,margin" });
                      document.body.style.overflow = '';
                      
                      if (onStartFadeIn) onStartFadeIn();

                      gsap.to(toEl.children, { 
                          duration: 0.3, 
                          opacity: 1, 
                          clearProps: "opacity",
                          onComplete: () => {
                              fromEl.isAnimating = false;
                              toEl.isAnimating = false;
                          }
                      });
                  }
              });
          }
      });
  };

  const openProfileView = () => {
      if (!profileContainer.classList.contains('hidden')) return;
      generateMiniLeaderboard();
      
      switchView(leaderboardContainer, profileContainer, () => {
          const userCard = document.querySelector('#mini-leaderboard-cards .highlight-user');
          const scrollContainer = document.getElementById('mini-leaderboard-cards');
          if (userCard && scrollContainer) {
              const scrollPos = userCard.offsetTop - (scrollContainer.clientHeight / 2) + (userCard.clientHeight / 2);
              scrollContainer.scrollTo({ top: scrollPos, behavior: 'smooth' });
          }
      });
  };

  const openHomeView = () => {
      if (!leaderboardContainer.classList.contains('hidden')) return;
      
      const wrapper = document.getElementById("leaderboard-card-container");
      if (wrapper) wrapper.innerHTML = "";

      switchView(profileContainer, leaderboardContainer, () => {
          generateLeaderboard(true);
      });
  };

  if (navProfileBtn) navProfileBtn.addEventListener('click', openProfileView);
  if (navProfileMobileBtn) navProfileMobileBtn.addEventListener('click', openProfileView);
  
  if (navHomeBtn) navHomeBtn.addEventListener('click', openHomeView);
  if (navHomeMobileBtn) navHomeMobileBtn.addEventListener('click', openHomeView);

  const generateMiniLeaderboard = () => {
    const miniWrapper = document.getElementById("mini-leaderboard-cards");
    if (!miniWrapper) return;
    miniWrapper.innerHTML = "";

    const miniData = [
      { username: "SpeedyGonzales", countryName: "USA", date: "2026.11.24", time: "12:45:10", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp", isUser: false },
      { username: "PlayerOne", countryName: "UK", date: "2026.11.25", time: "13:05:22", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp", isUser: false },
      { username: "User1234", countryName: "Hungary", date: "2026.11.25", time: "13:15:00", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_hu.webp", isUser: true },
      { username: "ShadowRunner", countryName: "Hungary", date: "2026.11.25", time: "13:30:00", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_hu.webp", isUser: false },
      { username: "WWWWWWWWWW", countryName: "Canada", date: "2026.11.26", time: "14:12:15", pfp: "../images/pfp_placeholder.webp", flag: "../images/lang_en.webp", isUser: false }
    ];

    miniData.forEach(entry => {
      const dateParts = entry.date.split('.');
      const formattedDate = currentLanguage === 'en' 
          ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` 
          : entry.date;

      const translatedCountry = countryTranslations[entry.countryName] ? countryTranslations[entry.countryName][currentLanguage] : entry.countryName;

      const card = document.createElement("div");
      card.className = `leaderboard-card mini-card ${entry.isUser ? 'highlight-user' : ''}`;
      
      card.innerHTML = `
        <div class="leaderboard-user-information">
            <div class="leaderboard-profile-picture" style="background-image: url('${entry.pfp}'); background-size: cover; background-position: center;"></div>
            <div class="leaderboard-username">${entry.username}</div>
        </div>
        <div class="leaderboard-country">
            <div class="leaderboard-flag" style="background-image: url('${entry.flag}'); background-size: cover; background-position: center;"></div>
            <span class="leaderboard-country-name">${translatedCountry || 'Unknown'}</span>
        </div>
        <div class="leaderboard-date">${formattedDate}</div>
        <div class="leaderboard-time">${entry.time}</div>
      `;
      miniWrapper.appendChild(card);
    });
  };

  const customDropdowns = document.querySelectorAll('.custom-dropdown');
  
  customDropdowns.forEach(dropdown => {
      const header = dropdown.querySelector('.custom-dropdown-header');
      const items = dropdown.querySelectorAll('.custom-dropdown-item');

      header.addEventListener('click', (e) => {
          e.stopPropagation();
          const wasOpen = dropdown.classList.contains('open');
          customDropdowns.forEach(d => d.classList.remove('open'));
          if (!wasOpen) {
              dropdown.classList.add('open');
          }
      });

      items.forEach(item => {
          item.addEventListener('click', (e) => {
              dropdown.classList.remove('open');
              e.stopPropagation();
              
              const textDiv = header.querySelector('.dropdown-text');
              if (textDiv) {
                  textDiv.textContent = item.textContent;
              }
              generateLeaderboard(true);
          });
      });
  });

  document.addEventListener('click', (e) => {
      customDropdowns.forEach(d => d.classList.remove('open'));
      
      if (settingsMobile && dropdownMenu && dropdownMenu.classList.contains('dropdown-menu-down')) {
          if (!dropdownMenu.contains(e.target) && !settingsMobile.contains(e.target)) {
              ToggleDropdown(settingsMobile);
          }
      }
  });

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
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLobby);
} else {
  initLobby();
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();

            const profileName = document.getElementById('profile-username');
            const profileImg = document.getElementById('profile-picture');
            const profileNat = document.getElementById('profile-country-name-static');
            const profileFlag = document.getElementById('profile-flag');
            const profileDate = document.getElementById('profile-creation-date');
            const logoutBtn = document.getElementById('profile-logout-button');
            const countryName = userData.nationality

            if (profileFlag && countryName) {
                const code = getCountryCode(countryName);
                profileFlag.style.backgroundImage = `url('https://flagcdn.com/w80/${code}.png')` || "https://i.ibb.co/20fL10wk/no-pfp.png";
            }

            if (profileDate) {
                if (userData.accountCreation) {
                    const dateObj = new Date(userData.accountCreation);
                    profileDate.textContent = dateObj.toLocaleDateString('hu-HU');
                } else {
                    profileDate.textContent = "???";
                }
            }

            if (profileName) profileName.textContent = userData.username || "???";

            if (profileNat) profileNat.textContent = userData.nationality || "???";
            
            if (profileImg && userData.avatarUrl) {
                profileImg.style.backgroundImage = `url('${userData.avatarUrl}')`;
            }
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('token');
                    window.location.href = '../../index.html';
                });
            }
        } else {
            console.error("Nem sikerült lekérni a profiladatokat");
        }
    } catch (err) {
        console.error("Hiba:", err);
    }

    const loadLeaderboard = async () => {
    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/leaderboard');
        
        if (response.ok) {
            const leaderboardData = await response.json();
            const leaderboardContainer = document.getElementById('leaderboard-container');
            
            if (!leaderboardContainer) return;

            leaderboardContainer.innerHTML = '';

            leaderboardData.forEach((entry, index) => {
                const formattedTime = formatSpeedrunTime(entry.speedrunTime);
                const countryCode = getCountryCode(entry.nationality);
                const flagUrl = countryCode === "un" ? "https://i.ibb.co/20fL10wk/no-pfp.png" : `https://flagcdn.com/w80/${countryCode}.png`;
                const avatar = entry.avatarUrl ? entry.avatarUrl : 'default-avatar.png';

                const playerRow = document.createElement('div');
                playerRow.className = 'leaderboard-row';
                playerRow.innerHTML = `
                    <div class="rank">#${index + 1}</div>
                    <div class="player-info">
                        <div class="player-avatar" style="background-image: url('${avatar}')"></div>
                        <div class="player-flag" style="background-image: url('${flagUrl}')"></div>
                        <span class="player-name">${entry.username}</span>
                    </div>
                    <div class="speedrun-time">${formattedTime}</div>
                    <a href="${entry.videoUrl}" target="_blank" class="watch-video-btn">Videó</a>
                `;
                
                leaderboardContainer.appendChild(playerRow);
            });
        }
    } catch (err) {
        console.error("Hiba a ranglista betöltésekor:", err);
    }
    };
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

const formatSpeedrunTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
};
