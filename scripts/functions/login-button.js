export function loginButtonFunction(
    isRegistering,
    emailInput,
    passwordInput,
    isHungarian,
    showToastError
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
        showToastError(isHungarian ? "Kérjük, töltsön ki minden mezőt!" : "Please fill in all fields!");
        return;
    }

    console.log("Login credentials valid. Proceeding with login for:", email);
}