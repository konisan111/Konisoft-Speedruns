import { getCountryCode, countryMapping} from "../flagcdn-api/get-country.js";
import { showToastError } from "../elements/toast-error.js";

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
    const token = localStorage.getItem('token');

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
      "nav-logout": "Logout",
      "nav-home-mobile": "Leaderboard",
      "nav-upload-mobile": "Upload your time",
      "nav-logout-mobile": "Logout",
      
      "leaderboard-main-title": "Leaderboard",
      "leaderboard-scope": "global",
      
      "opt-nation": "By Nation",
      "opt-time": "By Time",
      "opt-game": "By Game",
      
      "opt-nation-1": "Global",
      "opt-nation-2": "Hungary",
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
      "profile-country-name-static": "Hungary",
      "profile-mini-title": "Leaderboard",
      "profile-logout-button": "Logout",
      
      "footer-text-1": "Konisoft Indie Game Studio",
      "footer-text-2": "info@konisoft.hu",
      "footer-text-3": "All rights reserved.",
      "opt-upload": "By Upload date",
      "opt-upload-1": "Newest",
      "opt-upload-2": "Oldest"
    },
    hu: {
      "nav-home": "Ranglista",
      "nav-upload": "Idő feltöltése",
      "nav-logout": "Kijelentkezés",
      "nav-home-mobile": "Ranglista",
      "nav-upload-mobile": "Idő feltöltése",
      "nav-logout-mobile": "Kijelentkezés",
      
      "leaderboard-main-title": "Ranglista",
      "leaderboard-scope": "globális",
      
      "opt-nation": "Nemzet szerint",
      "opt-time": "Idő szerint",
      "opt-game": "Játék szerint",
      
      "opt-nation-1": "Globális",
      "opt-nation-2": "Magyarország",
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
      "profile-country-name-static": "Magyarország",
      "profile-mini-title": "Ranglista",
      "profile-logout-button": "Kijelentkezés",
      
      "footer-text-1": "Konisoft Indie Játék Stúdió",
      "footer-text-2": "info@konisoft.hu",
      "footer-text-3": "Minden jog fenntartva.",
      "opt-upload": "Dátum szerint",
      "opt-upload-1": "Newest",
      "opt-upload-2": "Oldest"
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

  const nationHeader = document.querySelector('#opt-nation').closest('.custom-dropdown');
  const nationList = nationHeader.querySelector('.custom-dropdown-list');
  
  nationList.style.maxHeight = '300px';
  nationList.style.overflowY = 'auto';
  nationHeader.tabIndex = 0;

  nationList.innerHTML = '<div class="custom-dropdown-item" id="opt-nation-1">Global</div>';
  
  Object.keys(countryMapping).forEach(country => {
      const item = document.createElement('div');
      item.className = 'custom-dropdown-item';
      item.textContent = country;
      nationList.appendChild(item);
  });

  let searchTimeout;
  let searchString = "";

  nationHeader.addEventListener('keydown', (e) => {
      if (nationHeader.classList.contains('open') && e.key.length === 1 && e.key.match(/[a-z]/i)) {
          searchString += e.key.toLowerCase();
          
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => searchString = "", 1000);

          const items = Array.from(nationList.querySelectorAll('.custom-dropdown-item'));
          const match = items.find(item => item.textContent.toLowerCase().startsWith(searchString));
          
          if (match) {
              match.scrollIntoView({ block: "nearest" });
          }
      }
  });

  const generateLeaderboard = async (animate = true) => {
    const wrapper = document.getElementById("leaderboard-card-container");
    if (!wrapper) return;
    
    wrapper.innerHTML = "";

    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/leaderboard');
        if (!response.ok) throw new Error("Hiba a letöltéskor");
        
        const rawData = await response.json();
        
        const nationFilterText = document.getElementById("opt-nation")?.textContent;
        const timeFilterText = document.getElementById("opt-time")?.textContent;
        const uploadFilterText = document.getElementById("opt-upload")?.textContent;

        const globalTextEN = uiTranslations.en["opt-nation-1"];
        const globalTextHU = uiTranslations.hu["opt-nation-1"];
        const defaultNationEN = uiTranslations.en["opt-nation"];
        const defaultNationHU = uiTranslations.hu["opt-nation"];
        
        let realData = rawData;

        if (nationFilterText !== globalTextEN && 
            nationFilterText !== globalTextHU && 
            nationFilterText !== defaultNationEN && 
            nationFilterText !== defaultNationHU) {
            realData = rawData.filter(entry => entry.nationality === nationFilterText);
        }

        const newestTextEN = uiTranslations.en["opt-upload-1"];
        const newestTextHU = uiTranslations.hu["opt-upload-1"];
        const oldestTextEN = uiTranslations.en["opt-upload-2"];
        const oldestTextHU = uiTranslations.hu["opt-upload-2"];

        const longestTextEN = uiTranslations.en["opt-time-2"];
        const longestTextHU = uiTranslations.hu["opt-time-2"];

        if (uploadFilterText === newestTextEN || uploadFilterText === newestTextHU) {
            realData.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        } else if (uploadFilterText === oldestTextEN || uploadFilterText === oldestTextHU) {
            realData.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        } else if (timeFilterText === longestTextEN || timeFilterText === longestTextHU) {
            realData.sort((a, b) => b.speedrunTime - a.speedrunTime);
        } else {
            realData.sort((a, b) => a.speedrunTime - b.speedrunTime);
        }

        realData.forEach((entry, index) => {
            const formattedTime = formatSpeedrunTime(entry.speedrunTime);
            const countryCode = getCountryCode(entry.nationality);
            const flagUrl = countryCode === "un" ? "../images/lang_en.webp" : `https://flagcdn.com/w80/${countryCode}.png`;
            const avatarUrl = entry.avatarUrl || "https://katona-konstanti.imgbb.com/";
            const videoLink = entry.videoUrl || entry.url || "#";

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
                    <div class="leaderboard-date">${entry.uploadDate ? new Date(entry.uploadDate).toLocaleDateString() : new Date().toLocaleDateString()}</div>
                    <div class="leaderboard-time">${formattedTime}</div>
                </div>
                <a href="${videoLink}" target="_blank" style="color: cyan; text-decoration: none; font-size: 12px; margin-top: 5px;">WATCH VIDEO</a>
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

  const generateMiniLeaderboard = async () => {
    const miniWrapper = document.getElementById("mini-leaderboard-cards");
    if (!miniWrapper) return;
    miniWrapper.innerHTML = "";

    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/leaderboard');
        if (!response.ok) throw new Error("Failed to fetch");
        
        const miniData = await response.json();

        miniData.forEach(entry => {
            const formattedTime = formatSpeedrunTime(entry.speedrunTime);
            const countryCode = getCountryCode(entry.nationality);
            const flagUrl = countryCode === "un" ? "../images/lang_en.webp" : `https://flagcdn.com/w80/${countryCode}.png`;
            
            const currentUserId = localStorage.getItem('userId'); 
            const isUser = entry.userId === currentUserId;

            const card = document.createElement("div");
            card.className = `leaderboard-card mini-card ${isUser ? 'highlight-user' : ''}`;
            
            card.innerHTML = `
                <div class="leaderboard-user-information">
                    <div class="leaderboard-profile-picture" style="background-image: url('${entry.avatarUrl || ''}'); background-size: cover; background-position: center;"></div>
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
        console.error("Error loading mini leaderboard:", err);
        miniWrapper.innerHTML = "<p>Error loading data.</p>";
    }
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

            const navUserProfile = document.getElementById('nav-user-profile');
            const navUsername = document.getElementById('nav-username');
            const navProfilePicture = document.getElementById('nav-profile-picture');

            const dropdownIcons = document.getElementById('dropdown-menu-icons');
            let navUserProfileMobile = document.getElementById('nav-user-profile-mobile');
            
            if (!navUserProfileMobile && dropdownIcons) {
                navUserProfileMobile = document.createElement('div');
                navUserProfileMobile.id = 'nav-user-profile-mobile';
                navUserProfileMobile.className = 'hidden';
                navUserProfileMobile.innerHTML = `
                    <div id="nav-profile-picture-mobile"></div>
                    <span id="nav-username-mobile"></span>
                `;
                dropdownIcons.parentNode.insertBefore(navUserProfileMobile, dropdownIcons);
            }

            const navUsernameMobile = document.getElementById('nav-username-mobile');
            const navProfilePictureMobile = document.getElementById('nav-profile-picture-mobile');

            if (navUsername) navUsername.textContent = userData.username || "???";
            if (navUsernameMobile) navUsernameMobile.textContent = userData.username || "???";
            
            if (navProfilePicture && userData.avatarUrl) {
                navProfilePicture.style.backgroundImage = `url('${userData.avatarUrl}')`;
            }
            if (navProfilePictureMobile && userData.avatarUrl) {
                navProfilePictureMobile.style.backgroundImage = `url('${userData.avatarUrl}')`;
            }

            if (userData.avatarUrl) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = userData.avatarUrl;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d', { willReadFrequently: true });
                    canvas.width = 1;
                    canvas.height = 1;
                    
                    ctx.drawImage(img, 0, 0, 1, 1);
                    
                    try {
                        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                        const distToBlack = Math.sqrt(Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2));
                        const distToWhite = Math.sqrt(Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2));
                        
                        if (distToBlack > 60 && distToWhite > 60) {
                            if (navUserProfile) navUserProfile.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.25)`;
                            if (navUserProfileMobile) navUserProfileMobile.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.25)`;
                        }
                    } catch (e) {
                    }
                };
            }

            if (navUserProfile) {
                navUserProfile.classList.remove('hidden');
                navUserProfile.addEventListener('click', () => {
                    const profileBtn = document.getElementById('nav-profile');
                    if(profileBtn) profileBtn.click();
                });
            }

            if (navUserProfileMobile) {
                navUserProfileMobile.classList.remove('hidden');
                navUserProfileMobile.addEventListener('click', () => {
                    const profileBtnMobile = document.getElementById('nav-profile-mobile');
                    if(profileBtnMobile) profileBtnMobile.click();
                    const settingsMobileBtn = document.getElementById('settings-mobile');
                    if(settingsMobileBtn && typeof ToggleDropdown === 'function') {
                        ToggleDropdown(settingsMobileBtn);
                    }
                });
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
                const flagUrl = entry.nationality !== "Unknown" 
                    ? `https://flagcdn.com/w40/${entry.nationality.toLowerCase()}.png` 
                    : "../images/default-flag.png";                
                const avatar = entry.avatarUrl ? entry.avatarUrl : 'default-avatar.png';

                const playerRow = document.createElement('div');
                
                playerRow.className = 'leaderboard-row';
                playerRow.innerHTML = `
                    <div class="player-info">
                        <div class="player-pfp" style="background-image: url('${entry.avatarUrl || '../images/default-pfp.png'}')"></div>
                        <div class="player-flag" style="background-image: url('${flagUrl}')"></div>
                        <span class="player-name">${entry.username}</span>
                    </div>
                    <div class="speedrun-time">${formatSpeedrunTime(entry.speedrunTime)}</div>
                    <a href="${entry.videoUrl}" target="_blank" class="watch-video-btn">Watch</a>
                `;
                console.log(entry.videoUrl);
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