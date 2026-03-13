const THEME_FILES = { light: "../style/light-theme.css", dark: "../style/dark-theme.css" };
let isHungarian = false;

window.addEventListener('load', async () => {
  document.querySelectorAll('.fade-in').forEach((element, i) => {
    element.style.animationDelay = (0.15 + i * 0.15) + 's';
  });

  document.querySelectorAll('.text-loading, .image-loading, .video-loading').forEach(el => {
    el.classList.remove('text-loading', 'image-loading', 'video-loading');
  });
});

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

    const themeText = document.getElementById("theme-switcher-text");
    if (themeText) {
        if (isHungarian) {
            themeText.textContent = name === "dark" ? "Világos" : "Sötét";
        } else {
            themeText.textContent = name === "dark" ? "Light" : "Dark";
        }
    }
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

document.addEventListener("DOMContentLoaded", () => {
  const languageContainer = document.getElementById("language-switcher");
  const languageButton = document.getElementById("language-switcher-button");
  let isRegistering = false; 

  const translations = {
    en: {  
      "email-label": "Email or username",
      "email-label-register": "Email",
      "email-input": "example@speedruns.com",
      "password-label": "Password",
      "forgot-password": "Forgot password?",
      "password-input": "********",
      "login-button-text": "Login",
      "separator-text": "or",
      "register-button-text": "Register",
      "google-text": "Continue with Google",
      "copyright": "Speedruns is a platform of Konisoft. Made and hosted by Konisoft Indie Game Studio. 2026-2027",
      "username-label": "Username",
      "username-input": "example1234",
      "repeat-password-label": "Repeat Password",
      "repeat-password-input": "********",
      "back-to-login": "Back to Login"
    },
    hu: {
      "email-label": "E-mail vagy felhasználónév",
      "email-label-register": "E-mail",
      "email-input": "pelda@speedruns.com",
      "password-label": "Jelszó",
      "forgot-password": "Elfelejtett jelszó?",
      "password-input": "********",
      "login-button-text": "Bejelentkezés",
      "separator-text": "vagy",
      "register-button-text": "Regisztráció",
      "google-text": "Folytatás Google-fiókkal",
      "copyright": "A Speedruns a Konisoft platformja. Készítette és üzemelteti a Konisoft Indie Game Studio. 2026-2027",
      "username-label": "Felhasználónév",
      "username-input": "pelda1234",
      "repeat-password-label": "Jelszó megerősítése",
      "repeat-password-input": "********",
      "back-to-login": "Vissza a bejelentkezéshez"
    }
  };

  let currentLanguage = "en";

  const updateTexts = () => {
    const lang = currentLanguage;
    Object.keys(translations[lang]).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (el.tagName === "INPUT") {
            el.placeholder = translations[lang][id];
        } else {
            if (id === "email-label" && isRegistering) {
                el.textContent = translations[lang]["email-label-register"];
            } else {
                el.textContent = translations[lang][id];
            }
        }
      }
    });
  };

  const updateFlags = () => {
    const flag = currentLanguage === "hu" ? "lang_en.webp" : "lang_hu.webp";
    if (languageButton) {
      languageButton.style.backgroundImage = `url(../images/${flag})`;
    }

    const langText = document.getElementById("language-switcher-text");
    if (langText) {
      langText.textContent = currentLanguage === "hu" ? "English" : "Magyar";
    }
  };

  const handleLanguageSwitch = () => {
    currentLanguage = currentLanguage === "en" ? "hu" : "en";
    isHungarian = currentLanguage === "hu";
    updateFlags();
    updateTexts();

    const curTheme = document.documentElement.dataset.theme;
    if (curTheme) {
        setTheme(curTheme, false);
    }
  };

  if (languageContainer && languageButton) {
    languageContainer.addEventListener("click", () => {
      const textElements = [document.getElementById("language-switcher-text"), document.getElementById("theme-switcher-text")];
      Object.keys(translations[currentLanguage]).forEach(id => {
        const el = document.getElementById(id);
        if (el) textElements.push(el);
      });

      languageButton.style.transition = "opacity 0.15s ease";
      languageButton.style.opacity = 0;
      
      textElements.forEach(el => {
        if (el) {
          el.style.transition = "opacity 0.15s ease";
          el.style.opacity = 0;
        }
      });

      setTimeout(() => {
        handleLanguageSwitch();
        
        languageButton.style.opacity = 1;
        textElements.forEach(el => {
          if (el) el.style.opacity = 1;
        });
      }, 150);
    });
  }

  const registerBtn = document.getElementById("register-button");
  const backToLoginBtn = document.getElementById("back-to-login");
  const loginBtn = document.getElementById("login-button");
  const forgotPassword = document.getElementById("forgot-password");
  const loginSeparator = document.getElementById("login-register-separator");
  
  const usernameLabel = document.getElementById("username-label");
  const usernameInput = document.getElementById("username-input");
  const repeatPasswordLabel = document.getElementById("repeat-password-label");
  const repeatPasswordInput = document.getElementById("repeat-password-input");

  registerBtn.addEventListener("click", () => {
    if (!isRegistering) {
      isRegistering = true;
      
      loginBtn.style.display = "none";
      forgotPassword.style.display = "none";
      loginSeparator.style.display = "none";
      
      usernameLabel.style.display = "block";
      usernameInput.style.display = "block";
      repeatPasswordLabel.style.display = "block";
      repeatPasswordInput.style.display = "block";
      backToLoginBtn.style.display = "block";
      
      updateTexts();
    } else {
      console.log("Submitting registration...");
    }
  });

  if (backToLoginBtn) {
    backToLoginBtn.addEventListener("click", () => {
      isRegistering = false;
      
      usernameLabel.style.display = "none";
      usernameInput.style.display = "none";
      repeatPasswordLabel.style.display = "none";
      repeatPasswordInput.style.display = "none";
      backToLoginBtn.style.display = "none";
      
      loginBtn.style.display = "flex";
      forgotPassword.style.display = "block";
      loginSeparator.style.display = "flex";
      
      updateTexts();
    });
  }

  updateTexts();
  updateFlags();
});