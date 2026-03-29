import { updateGoogleButton } from '../authentication/google-id.js';
import { countries, translations } from '../data/translations.js';
import { showToast } from '../elements/toast-error.js';
import { pfpFileInputFunction } from '../functions/pfp-file-input.js';
import { registerButtonFunction } from '../functions/register-button.js';
import { loginButtonFunction } from '../functions/login-button.js';
import { elementsToHide } from '../functions/elements-to-hide.js'
import { pfpSendButtonFunction } from '../functions/pfp-send-button.js';
import { toggle, initialTheme, setTheme } from '../functions/theme-functions.js';
import { 
    mainContainer,logo,
    passwordLabels,copyright,registerButton,
    backToLoginButton,loginButton,
    forgotPassword,loginSeparator,
    googleLoginButton,usernameLabel,
    usernameInput,emailLabel,
    emailInput,passwordInput,
    repeatPasswordInput,repeatPasswordLabel,
    customCountryDropdown,countryOptions,
    hiddenCountryInput,pfpUploadButton,
    pfpUploadContainer,pfpPreview,
    pfpSendButton,pfpFileInput 
} from '../elements/html-elements.js';

const THEME_FILES = { light: "../style/light-theme.css", dark: "../style/dark-theme.css" };

let isHungarian = false;

window.addEventListener('load', async () => {
  document.querySelectorAll('.fade-in').forEach((element, i) => {
    element.style.animationDelay = (0.15 + i * 0.15) + 's';
  });

  document.querySelectorAll('.text-loading, .image-loading, .video-loading').forEach(el => {
    el.classList.remove('text-loading', 'image-loading', 'video-loading');
  });
  
  const initialLang = isHungarian ? 'hu' : 'en';
  updateGoogleButton(initialLang);
});

let themeLink = document.getElementById("theme-css");
if (!themeLink) {
    themeLink = document.createElement("link");
    themeLink.id = "theme-css";
    themeLink.rel = "stylesheet";
    document.head.appendChild(themeLink);
}

setTheme(initialTheme(), false, THEME_FILES, themeLink, isHungarian);

["#theme-switcher", "#theme-switcher-mobile"].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.addEventListener("click", () => {
        toggle(THEME_FILES, themeLink, isHungarian);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const languageContainer = document.getElementById("language-switcher");
  const languageButton = document.getElementById("language-switcher-button");
  let isRegistering = false; 

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
        customCountryDropdown.classList.remove("input-error");
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
            document.getElementById("country-selected-text").textContent = 
                isHungarian ? selectedCountryObj.hu : selectedCountryObj.en;
        }
    }
  };

  const clearInputsAndErrors = () => {
    [usernameInput, emailInput, passwordInput, repeatPasswordInput].forEach(input => {
        input.value = '';
        input.classList.remove('input-error');
    });
  };

  const showRegistrationForm = (mainContainer) => {
    isRegistering = true;
    mainContainer.style.setProperty('--dynamic-bg-opacity', '0');
    
    clearInputsAndErrors();

    loginButton.style.display = "none";
    // forgotPassword.style.display = "none";
    
    logo.style.display = "";
    passwordLabels.style.display = "flex";
    
    loginSeparator.style.display = "none";
    googleLoginButton.style.display = "flex";

    usernameLabel.style.display = "block";
    usernameInput.style.display = "block";
    repeatPasswordLabel.style.display = "block";
    repeatPasswordInput.style.display = "block";
    backToLoginButton.style.display = "block";
    pfpUploadContainer.style.display = "none";
    
    updateTexts();
  };

  const showLoginForm = (mainContainer) => {
    isRegistering = false;
    mainContainer.style.setProperty('--dynamic-bg-opacity', '0');
    
    clearInputsAndErrors();

    usernameLabel.style.display = "none";
    usernameInput.style.display = "none";
    repeatPasswordLabel.style.display = "none";
    repeatPasswordInput.style.display = "none";
    backToLoginButton.style.display = "none";
    pfpUploadContainer.style.display = "none";
    
    logo.style.display = "";
    passwordLabels.style.display = "flex";

    loginButton.style.display = "flex";
    // forgotPassword.style.display = "block";
    loginSeparator.style.display = "flex";
    googleLoginButton.style.display = "flex";
    
    updateTexts();
  };

  const animateFormTransition = (toggleLogic) => {
    const container = mainContainer;
    const children = Array.from(container.children);
    
    const currentHeight = container.getBoundingClientRect().height;
    container.style.height = `${currentHeight}px`;
    container.style.overflow = "hidden";
    
    children.forEach(child => {
        child.style.transition = "opacity 0.2s ease"; 
        child.style.opacity = "0";
    });

    setTimeout(() => {
        toggleLogic(); 

        const newChildren = Array.from(container.children);
        newChildren.forEach(child => {
            child.style.transition = "none"; 
            child.style.opacity = "0";
        });

        container.style.height = "auto";
        const newHeight = container.getBoundingClientRect().height;
        
        container.style.height = `${currentHeight}px`;
        container.offsetHeight; 
        
        container.style.transition = "height 0.2s ease, background 0.2s ease";
        container.style.height = `${newHeight}px`;

        setTimeout(() => {
            newChildren.forEach(child => {
                child.style.transition = "opacity 0.2s ease"; 
                child.style.opacity = "1";
            });

            setTimeout(() => {
                container.style.height = ""; 
                container.style.overflow = "";
                container.style.transition = "background 0.2s ease";
                newChildren.forEach(child => {
                    child.style.transition = "";
                    child.style.opacity = "";
                });
            }, 200);
            
        }, 200); 

    }, 200); 
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
    localStorage.setItem('language', isHungarian ? 'hu' : 'en');
    updateFlags();
    updateTexts();

    updateGoogleButton(currentLanguage);

    const curTheme = document.documentElement.dataset.theme;
    if (curTheme) {
        setTheme(curTheme, false, THEME_FILES, themeLink, isHungarian);
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

  [usernameInput, emailInput, passwordInput, repeatPasswordInput].forEach(input => {
      input.addEventListener('input', () => {
          input.classList.remove('input-error');
      });
  });

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

  window.showPfpUploadScreen = () => {
    animateFormTransition(() => {
        elementsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });

        const pfpUploadContainer = document.getElementById("pfp-upload-container");
        if (pfpUploadContainer) {
            pfpUploadContainer.style.display = "flex";
        }
    });
  };

  if (backToLoginButton) {
    backToLoginButton.addEventListener("click", () => {
      animateFormTransition(() => showLoginForm(mainContainer));
    });
  }

  loginButton.addEventListener("click", () => {
      loginButtonFunction(
          isRegistering,
          emailInput,
          passwordInput,
          isHungarian,
          showToast
      );
  });

  registerButton.addEventListener("click", () => {
      registerButtonFunction(
          isRegistering, 
          () => { 
              animateFormTransition(() => showRegistrationForm(mainContainer)); 
          }, 
          usernameInput, 
          emailInput, 
          passwordInput, 
          repeatPasswordInput, 
          isHungarian, 
          showToast
      );
  });

  pfpUploadButton.addEventListener("click", () => {
    pfpFileInput.click();
  });

  pfpFileInput.addEventListener("change", (event) => {
    pfpFileInputFunction(
        event, 
        pfpPreview, 
        mainContainer
    );
  });

  pfpSendButton.addEventListener("click", () => {
      pfpSendButtonFunction(customCountryDropdown, hiddenCountryInput)
  });

  updateTexts();
  updateFlags();
});