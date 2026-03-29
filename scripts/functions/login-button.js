export function loginButtonFunction(
    isRegistering,
    emailInput,
    passwordInput,
    isHungarian,
    showToast
) {
    if (isRegistering) {
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');

    if (!email) {
        emailInput.classList.add('input-error');
        hasError = true;
    }

    if (!password) {
        passwordInput.classList.add('input-error');
        hasError = true;
    }

    if (hasError) {
        showToast(isHungarian ? "Kérjük, töltsön ki minden mezőt!" : "Please fill in all fields!", "error");
        return;
    }
}