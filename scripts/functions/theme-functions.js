export function initialTheme() {
  return localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

export function toggle(THEME_FILES, themeLink, isHungarian) {
    const cur = document.documentElement.dataset.theme || initialTheme();
    setTheme(cur === "dark" ? "light" : "dark", true, THEME_FILES, themeLink, isHungarian);
}

export function setTheme(name, persist, THEME_FILES, themeLink, isHungarian) {
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