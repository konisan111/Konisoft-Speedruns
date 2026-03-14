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

  const countries = [
    { en: "Afghanistan", hu: "Afganisztán" },
    { en: "Albania", hu: "Albánia" },
    { en: "Algeria", hu: "Algéria" },
    { en: "Andorra", hu: "Andorra" },
    { en: "Angola", hu: "Angola" },
    { en: "Antigua and Barbuda", hu: "Antigua és Barbuda" },
    { en: "Argentina", hu: "Argentína" },
    { en: "Armenia", hu: "Örményország" },
    { en: "Australia", hu: "Ausztrália" },
    { en: "Austria", hu: "Ausztria" },
    { en: "Azerbaijan", hu: "Azerbajdzsán" },
    { en: "Bahamas", hu: "Bahama-szigetek" },
    { en: "Bahrain", hu: "Bahrein" },
    { en: "Bangladesh", hu: "Banglades" },
    { en: "Barbados", hu: "Barbados" },
    { en: "Belarus", hu: "Fehéroroszország" },
    { en: "Belgium", hu: "Belgium" },
    { en: "Belize", hu: "Belize" },
    { en: "Benin", hu: "Benin" },
    { en: "Bhutan", hu: "Bhután" },
    { en: "Bolivia", hu: "Bolívia" },
    { en: "Bosnia and Herzegovina", hu: "Bosznia-Hercegovina" },
    { en: "Botswana", hu: "Botswana" },
    { en: "Brazil", hu: "Brazília" },
    { en: "Brunei", hu: "Brunei" },
    { en: "Bulgaria", hu: "Bulgária" },
    { en: "Burkina Faso", hu: "Burkina Faso" },
    { en: "Burundi", hu: "Burundi" },
    { en: "Côte d'Ivoire", hu: "Elefántcsontpart" },
    { en: "Cabo Verde", hu: "Zöld-foki Köztársaság" },
    { en: "Cambodia", hu: "Kambodzsa" },
    { en: "Cameroon", hu: "Kamerun" },
    { en: "Canada", hu: "Kanada" },
    { en: "Central African Republic", hu: "Közép-afrikai Köztársaság" },
    { en: "Chad", hu: "Csád" },
    { en: "Chile", hu: "Chile" },
    { en: "China", hu: "Kína" },
    { en: "Colombia", hu: "Kolumbia" },
    { en: "Comoros", hu: "Comore-szigetek" },
    { en: "Congo (Congo-Brazzaville)", hu: "Kongói Köztársaság" },
    { en: "Costa Rica", hu: "Costa Rica" },
    { en: "Croatia", hu: "Horvátország" },
    { en: "Cuba", hu: "Kuba" },
    { en: "Cyprus", hu: "Ciprus" },
    { en: "Czechia", hu: "Csehország" },
    { en: "Democratic Republic of the Congo", hu: "Kongói Demokratikus Köztársaság" },
    { en: "Denmark", hu: "Dánia" },
    { en: "Djibouti", hu: "Dzsibuti" },
    { en: "Dominica", hu: "Dominikai Közösség" },
    { en: "Dominican Republic", hu: "Dominikai Köztársaság" },
    { en: "Ecuador", hu: "Ecuador" },
    { en: "Egypt", hu: "Egyiptom" },
    { en: "El Salvador", hu: "Salvador" },
    { en: "Equatorial Guinea", hu: "Egyenlítői-Guinea" },
    { en: "Eritrea", hu: "Eritrea" },
    { en: "Estonia", hu: "Észtország" },
    { en: "Eswatini", hu: "Szváziföld" },
    { en: "Ethiopia", hu: "Etiópia" },
    { en: "Fiji", hu: "Fidzsi-szigetek" },
    { en: "Finland", hu: "Finnország" },
    { en: "France", hu: "Franciaország" },
    { en: "Gabon", hu: "Gabon" },
    { en: "Gambia", hu: "Gambia" },
    { en: "Georgia", hu: "Grúzia" },
    { en: "Germany", hu: "Németország" },
    { en: "Ghana", hu: "Ghána" },
    { en: "Greece", hu: "Görögország" },
    { en: "Grenada", hu: "Grenada" },
    { en: "Guatemala", hu: "Guatemala" },
    { en: "Guinea", hu: "Guinea" },
    { en: "Guinea-Bissau", hu: "Bissau-Guinea" },
    { en: "Guyana", hu: "Guyana" },
    { en: "Haiti", hu: "Haiti" },
    { en: "Holy See", hu: "Vatikán" },
    { en: "Honduras", hu: "Honduras" },
    { en: "Hungary", hu: "Magyarország" },
    { en: "Iceland", hu: "Izland" },
    { en: "India", hu: "India" },
    { en: "Indonesia", hu: "Indonézia" },
    { en: "Iran", hu: "Irán" },
    { en: "Iraq", hu: "Irak" },
    { en: "Ireland", hu: "Írország" },
    { en: "Israel", hu: "Izrael" },
    { en: "Italy", hu: "Olaszország" },
    { en: "Jamaica", hu: "Jamaica" },
    { en: "Japan", hu: "Japán" },
    { en: "Jordan", hu: "Jordánia" },
    { en: "Kazakhstan", hu: "Kazahsztán" },
    { en: "Kenya", hu: "Kenya" },
    { en: "Kiribati", hu: "Kiribati" },
    { en: "Kuwait", hu: "Kuvait" },
    { en: "Kyrgyzstan", hu: "Kirgizisztán" },
    { en: "Laos", hu: "Laosz" },
    { en: "Latvia", hu: "Lettország" },
    { en: "Lebanon", hu: "Libanon" },
    { en: "Lesotho", hu: "Lesotho" },
    { en: "Liberia", hu: "Libéria" },
    { en: "Libya", hu: "Líbia" },
    { en: "Liechtenstein", hu: "Liechtenstein" },
    { en: "Lithuania", hu: "Litvánia" },
    { en: "Luxembourg", hu: "Luxemburg" },
    { en: "Madagascar", hu: "Madagaszkár" },
    { en: "Malawi", hu: "Malawi" },
    { en: "Malaysia", hu: "Malajzia" },
    { en: "Maldives", hu: "Maldív-szigetek" },
    { en: "Mali", hu: "Mali" },
    { en: "Malta", hu: "Málta" },
    { en: "Marshall Islands", hu: "Marshall-szigetek" },
    { en: "Mauritania", hu: "Mauritánia" },
    { en: "Mauritius", hu: "Mauritius" },
    { en: "Mexico", hu: "Mexikó" },
    { en: "Micronesia", hu: "Mikronézia" },
    { en: "Moldova", hu: "Moldova" },
    { en: "Monaco", hu: "Monaco" },
    { en: "Mongolia", hu: "Mongólia" },
    { en: "Montenegro", hu: "Montenegró" },
    { en: "Morocco", hu: "Marokkó" },
    { en: "Mozambique", hu: "Mozambik" },
    { en: "Myanmar", hu: "Mianmar" },
    { en: "Namibia", hu: "Namíbia" },
    { en: "Nauru", hu: "Nauru" },
    { en: "Nepal", hu: "Nepál" },
    { en: "Netherlands", hu: "Hollandia" },
    { en: "New Zealand", hu: "Új-Zéland" },
    { en: "Nicaragua", hu: "Nicaragua" },
    { en: "Niger", hu: "Niger" },
    { en: "Nigeria", hu: "Nigéria" },
    { en: "North Korea", hu: "Észak-Korea" },
    { en: "North Macedonia", hu: "Észak-Macedónia" },
    { en: "Norway", hu: "Norvégia" },
    { en: "Oman", hu: "Omán" },
    { en: "Pakistan", hu: "Pakisztán" },
    { en: "Palau", hu: "Palau" },
    { en: "Palestine State", hu: "Palesztina" },
    { en: "Panama", hu: "Panama" },
    { en: "Papua New Guinea", hu: "Pápua Új-Guinea" },
    { en: "Paraguay", hu: "Paraguay" },
    { en: "Peru", hu: "Peru" },
    { en: "Philippines", hu: "Fülöp-szigetek" },
    { en: "Poland", hu: "Lengyelország" },
    { en: "Portugal", hu: "Portugália" },
    { en: "Qatar", hu: "Katar" },
    { en: "Romania", hu: "Románia" },
    { en: "Russia", hu: "Oroszország" },
    { en: "Rwanda", hu: "Ruanda" },
    { en: "Saint Kitts and Nevis", hu: "Saint Kitts és Nevis" },
    { en: "Saint Lucia", hu: "Saint Lucia" },
    { en: "Saint Vincent and the Grenadines", hu: "Saint Vincent és a Grenadine-szigetek" },
    { en: "Samoa", hu: "Szamoa" },
    { en: "San Marino", hu: "San Marino" },
    { en: "Sao Tome and Principe", hu: "São Tomé és Príncipe" },
    { en: "Saudi Arabia", hu: "Szaúd-Arábia" },
    { en: "Senegal", hu: "Szenegál" },
    { en: "Serbia", hu: "Szerbia" },
    { en: "Seychelles", hu: "Seychelle-szigetek" },
    { en: "Sierra Leone", hu: "Sierra Leone" },
    { en: "Singapore", hu: "Szingapúr" },
    { en: "Slovakia", hu: "Szlovákia" },
    { en: "Slovenia", hu: "Szlovénia" },
    { en: "Solomon Islands", hu: "Salamon-szigetek" },
    { en: "Somalia", hu: "Szomália" },
    { en: "South Africa", hu: "Dél-afrikai Köztársaság" },
    { en: "South Korea", hu: "Dél-Korea" },
    { en: "South Sudan", hu: "Dél-Szudán" },
    { en: "Spain", hu: "Spanyolország" },
    { en: "Sri Lanka", hu: "Srí Lanka" },
    { en: "Sudan", hu: "Szudán" },
    { en: "Suriname", hu: "Suriname" },
    { en: "Sweden", hu: "Svédország" },
    { en: "Switzerland", hu: "Svájc" },
    { en: "Syria", hu: "Szíria" },
    { en: "Tajikistan", hu: "Tádzsikisztán" },
    { en: "Tanzania", hu: "Tanzánia" },
    { en: "Thailand", hu: "Thaiföld" },
    { en: "Timor-Leste", hu: "Kelet-Timor" },
    { en: "Togo", hu: "Togo" },
    { en: "Tonga", hu: "Tonga" },
    { en: "Trinidad and Tobago", hu: "Trinidad és Tobago" },
    { en: "Tunisia", hu: "Tunézia" },
    { en: "Turkey", hu: "Törökország" },
    { en: "Turkmenistan", hu: "Türkmenisztán" },
    { en: "Tuvalu", hu: "Tuvalu" },
    { en: "Uganda", hu: "Uganda" },
    { en: "Ukraine", hu: "Ukrajna" },
    { en: "United Arab Emirates", hu: "Egyesült Arab Emírségek" },
    { en: "United Kingdom", hu: "Egyesült Királyság" },
    { en: "United States of America", hu: "Amerikai Egyesült Államok" },
    { en: "Uruguay", hu: "Uruguay" },
    { en: "Uzbekistan", hu: "Üzbegisztán" },
    { en: "Vanuatu", hu: "Vanuatu" },
    { en: "Venezuela", hu: "Venezuela" },
    { en: "Vietnam", hu: "Vietnám" },
    { en: "Yemen", hu: "Jemen" },
    { en: "Zambia", hu: "Zambia" },
    { en: "Zimbabwe", hu: "Zimbabwe" }
  ];

  const translations = {
    en: {  
      "email-label": "Email or username",
      "email-label-register": "Email",
      "email-input": "example@speedruns.com",
      "password-label": "Password",
      "forgot-password": "Forgot password?",
      "password-input": "********",
      "login-button": "Login",
      "separator-text": "or",
      "register-button": "Register",
      "google-text": "Continue with Google",
      "copyright": "Speedruns is a platform of Konisoft. Made and hosted by Konisoft Indie Game Studio. 2026-2027",
      "username-label": "Username",
      "username-input": "example1234",
      "repeat-password-label": "Repeat Password",
      "repeat-password-input": "********",
      "back-to-login": "Back to Login",
      "pfp-text": "Upload your profile picture",
      "pfp-upload-button": "Select Image",
      "pfp-skip-button": "Skip",
      "country-label": "Country",
      "country-selected-text": "Select your country"
    },
    hu: {
      "email-label": "E-mail vagy felhasználónév",
      "email-label-register": "E-mail",
      "email-input": "pelda@speedruns.com",
      "password-label": "Jelszó",
      "forgot-password": "Elfelejtett jelszó?",
      "password-input": "********",
      "login-button": "Bejelentkezés",
      "separator-text": "vagy",
      "register-button": "Regisztráció",
      "google-text": "Folytatás Google-fiókkal",
      "copyright": "A Speedruns a Konisoft platformja. Készítette és üzemelteti a Konisoft Indie Game Studio. 2026-2027",
      "username-label": "Felhasználónév",
      "username-input": "pelda1234",
      "repeat-password-label": "Jelszó megerősítése",
      "repeat-password-input": "********",
      "back-to-login": "Vissza a bejelentkezéshez",
      "pfp-text": "Töltsd fel a profilképedet",
      "pfp-upload-button": "Kép kiválasztása",
      "pfp-skip-button": "Kihagyás",
      "country-label": "Ország",
      "country-selected-text": "Válassz országot"
    }
  };

  let currentLanguage = "en";

  const renderCountryOptions = () => {
    const countryOptions = document.getElementById("country-options");
    const customCountryDropdown = document.getElementById("custom-country-dropdown");
    const countrySelectedText = document.getElementById("country-selected-text");
    const hiddenCountryInput = document.getElementById("country-input");

    if (!countryOptions) return;

    const langKey = isHungarian ? 'hu' : 'en';
    
    const sortedCountries = [...countries].sort((a, b) => a[langKey].localeCompare(b[langKey], langKey));
    
    countryOptions.innerHTML = '';
    
    sortedCountries.forEach(countryObj => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "dropdown-option";
      optionDiv.textContent = countryObj[langKey];
      
      optionDiv.addEventListener("click", (e) => {
          e.stopPropagation();
          countrySelectedText.textContent = countryObj[langKey];
          hiddenCountryInput.value = countryObj.en;
          customCountryDropdown.classList.remove("open");
      });
      
      countryOptions.appendChild(optionDiv);
    });
  };

  const updateTexts = () => {
    const lang = currentLanguage;
    const hiddenCountryInput = document.getElementById("country-input");
    
    Object.keys(translations[lang]).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (el.tagName === "INPUT") {
            el.placeholder = translations[lang][id];
        } else if (id === "country-selected-text") {
            if (!hiddenCountryInput || hiddenCountryInput.value === "") {
                el.textContent = translations[lang][id];
            }
        } else {
            if (id === "email-label" && isRegistering) {
                el.textContent = translations[lang]["email-label-register"];
            } else {
                if (id === "google-text") {
                    el.textContent = translations[lang][id];
                } else {
                    el.textContent = translations[lang][id];
                }
            }
        }
      }
    });

    renderCountryOptions();

    if (hiddenCountryInput && hiddenCountryInput.value !== "") {
        const selectedCountryObj = countries.find(c => c.en === hiddenCountryInput.value);
        if (selectedCountryObj) {
            document.getElementById("country-selected-text").textContent = isHungarian ? selectedCountryObj.hu : selectedCountryObj.en;
        }
    }
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

  const mainContainer = document.getElementById("container");
  const logo = document.getElementById("logo");
  const passwordLabels = document.getElementById("password-labels");
  const copyright = document.getElementById("copyright");

  const registerButton = document.getElementById("register-button");
  const backToLoginButton = document.getElementById("back-to-login");
  const loginButton = document.getElementById("login-button");
  const forgotPassword = document.getElementById("forgot-password");
  const loginSeparator = document.getElementById("login-register-separator");
  const googleLoginButton = document.getElementById("google-login");
  
  const usernameLabel = document.getElementById("username-label");
  const usernameInput = document.getElementById("username-input");
  const emailLabel = document.getElementById("email-label");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const repeatPasswordLabel = document.getElementById("repeat-password-label");
  const repeatPasswordInput = document.getElementById("repeat-password-input");
  
  const countryLabel = document.getElementById("country-label");
  const customCountryDropdown = document.getElementById("custom-country-dropdown");
  const countryOptions = document.getElementById("country-options");

  const pfpUploadContainer = document.getElementById("pfp-upload-container");
  const pfpPreview = document.getElementById("pfp-preview");
  const pfpUploadButton = document.getElementById("pfp-upload-button");
  const pfpSkipButton = document.getElementById("pfp-skip-button");
  const pfpFileInput = document.getElementById("pfp-file-input");

  if (customCountryDropdown) {
      customCountryDropdown.addEventListener("click", () => {
          customCountryDropdown.classList.toggle("open");
      });

      customCountryDropdown.addEventListener("keydown", (e) => {
          if (e.key.length === 1 && e.key.match(/[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]/)) {
              const char = e.key.toLowerCase();
              const options = Array.from(countryOptions.children);
              
              const match = options.find(opt => opt.textContent.toLowerCase().startsWith(char));
              
              if (match) {
                  if (!customCountryDropdown.classList.contains("open")) {
                      customCountryDropdown.classList.add("open");
                  }
                  match.scrollIntoView({ behavior: "auto", block: "start" });
              }
          }
      });

      document.addEventListener("click", (e) => {
          if (!customCountryDropdown.contains(e.target)) {
              customCountryDropdown.classList.remove("open");
          }
      });
  }

  const showRegistrationForm = () => {
    isRegistering = true;
    mainContainer.style.background = "var(--main-background)";
    pfpSkipButton.style.color = "";
    
    loginButton.style.display = "none";
    forgotPassword.style.display = "none";
    
    logo.style.display = "";
    passwordLabels.style.display = "flex";
    
    loginSeparator.style.display = "none";
    googleLoginButton.style.display = "flex";

    usernameLabel.style.display = "block";
    usernameInput.style.display = "block";
    repeatPasswordLabel.style.display = "block";
    repeatPasswordInput.style.display = "block";
    countryLabel.style.display = "block";
    customCountryDropdown.style.display = "block";
    backToLoginButton.style.display = "block";
    
    updateTexts();
  };

  const showLoginForm = () => {
    isRegistering = false;
    mainContainer.style.background = "var(--main-background)";
    pfpSkipButton.style.color = "";
    
    usernameLabel.style.display = "none";
    usernameInput.style.display = "none";
    repeatPasswordLabel.style.display = "none";
    repeatPasswordInput.style.display = "none";
    countryLabel.style.display = "none";
    customCountryDropdown.style.display = "none";
    backToLoginButton.style.display = "none";
    pfpUploadContainer.style.display = "none";
    
    logo.style.display = "";
    passwordLabels.style.display = "flex";

    loginButton.style.display = "flex";
    forgotPassword.style.display = "block";
    loginSeparator.style.display = "flex";
    googleLoginButton.style.display = "flex";
    
    updateTexts();
  };

  const showPfpUploadScreen = () => {
    usernameLabel.style.display = "none";
    usernameInput.style.display = "none";
    emailLabel.style.display = "none";
    emailInput.style.display = "none";
    passwordInput.style.display = "none";
    repeatPasswordLabel.style.display = "none";
    repeatPasswordInput.style.display = "none";
    countryLabel.style.display = "none";
    customCountryDropdown.style.display = "none";
    registerButton.style.display = "none";
    backToLoginButton.style.display = "none";
    loginSeparator.style.display = "none";
    googleLoginButton.style.display = "none";
    
    logo.style.display = "none";
    passwordLabels.style.display = "none";

    pfpUploadContainer.style.display = "flex";
  };

  registerButton.addEventListener("click", () => {
    if (!isRegistering) {
      showRegistrationForm();
    } else {
      showPfpUploadScreen();
    }
  });

  if (backToLoginButton) {
    backToLoginButton.addEventListener("click", showLoginForm);
  }

  pfpUploadButton.addEventListener("click", () => {
    pfpFileInput.click();
  });

  pfpFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target.result;
        pfpPreview.style.backgroundImage = `url(${imgUrl})`;
        
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1;
            canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            
            const distToBlack = Math.sqrt(Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2));
            const distToWhite = Math.sqrt(Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2));
            
            if (distToBlack < 60 || distToWhite < 60) {
                mainContainer.style.background = "var(--main-background)";
                pfpSkipButton.style.color = "";
            } else {
                const dominantColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
                mainContainer.style.background = `linear-gradient(to bottom, ${dominantColor} 0%, var(--main-background) 100%)`;
                pfpSkipButton.style.color = "var(--text-color)";
            }
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
  });

  pfpSkipButton.addEventListener("click", () => {
    
  });

  updateTexts();
  updateFlags();
});