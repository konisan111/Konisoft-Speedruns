export function registerButtonFunction(
    isRegistering, 
    toggleUI, 
    usernameInput, 
    emailInput, 
    passwordInput, 
    repeatPasswordInput, 
    isHungarian, 
    showToastError
) {
    if (!isRegistering) {
        toggleUI();
        return;
    }

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    // Validation logic
    if (!username || !email || !password || !repeatPassword) {
        showToastError(isHungarian ? "Kérjük, töltsön ki minden mezőt!" : "Please fill in all fields!");
        return;
    }

    if (password !== repeatPassword) {
        showToastError(isHungarian ? "A jelszavak nem egyeznek!" : "Passwords do not match!");
        return;
    }

    console.log("Credentials valid. Moving to PFP screen for user:", username);

    if (typeof window.showPfpUploadScreen === "function") {
        window.showPfpUploadScreen();
    } else {
        console.error("showPfpUploadScreen is not defined on the window object.");
    }
}