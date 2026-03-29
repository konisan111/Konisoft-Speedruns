export function registerButtonFunction(
    isRegistering, 
    toggleUI, 
    usernameInput, 
    emailInput, 
    passwordInput, 
    repeatPasswordInput, 
    isHungarian, 
    showToast
) {
    if (!isRegistering) {
        toggleUI();
        return;
    }

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    let hasError = false;

    usernameInput.classList.remove('input-error');
    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
    repeatPasswordInput.classList.remove('input-error');

    if (!username) {
        usernameInput.classList.add('input-error');
        hasError = true;
    }

    if (!email) {
        emailInput.classList.add('input-error');
        hasError = true;
    }

    if (!password) {
        passwordInput.classList.add('input-error');
        hasError = true;
    }

    if (!repeatPassword) {
        repeatPasswordInput.classList.add('input-error');
        hasError = true;
    }

    if (hasError) {
        showToast(isHungarian ? "Kérjük, töltsön ki minden mezőt!" : "Please fill in all fields!", "error");
        return;
    }

    if (password !== repeatPassword) {
        passwordInput.classList.add('input-error');
        repeatPasswordInput.classList.add('input-error');
        showToast(isHungarian ? "A jelszavak nem egyeznek!" : "Passwords do not match!", "error");
        return;
    }


    if (typeof window.showPfpUploadScreen === "function") {
        window.showPfpUploadScreen();
    }
}