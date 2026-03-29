import { showToast } from '../elements/toast-error.js';

const loginBtn = document.getElementById('login-button');
const uploadPfpBtn = document.getElementById('pfp-send-button');
const isHungarian = localStorage.getItem('language') === 'hu';

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('token', result.token);
            showToast(isHungarian ? "Sikeres bejelentkezés!" : "Login was successful!", "success");
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '../sites/lobby.html';
        } else {
            showToast(isHungarian ? "Sikertelen bejelentkezés!" : "Login was unsuccessful!", "error");
        }
    } catch (err) {
        showToast(isHungarian ? "Hálózati hiba lépett fel!" : "There was a networking issue!", "error");
    }
});

window.isGoogleAuthSetup = false;

function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

let isGoogleRegistration = false;

window.handleGoogleResponse = async (googleResponse) => {
    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: googleResponse.credential })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token);

            if (result.isNewUser) {
                isGoogleRegistration = true;
                
                const pfpPreview = document.getElementById('pfp-preview');
                if (pfpPreview && result.avatarUrl) {
                    pfpPreview.style.backgroundImage = `url(${result.avatarUrl})`;
                }

                if (typeof window.showPfpUploadScreen === "function") {
                    window.showPfpUploadScreen();
                }
            } else {
                showToast(isHungarian ? `Sikeresen bejelentkeztél mint ${result.username}!` : `You successfuly logged in as ${result.username}!`, "success");
                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = '../sites/lobby.html';
            }
        } else {
            showToast(isHungarian ? `Hiba a bejelentkezés során: ${result.error}` : `There was an error while logging in: ${result.error}`, "error");
        }
    } catch (err) {
        showToast(isHungarian ? "Hálózati hiba lépett fel!" : "There was a networking issue!", "error");
    }
};

window.handleGoogleResponse = handleGoogleResponse;
const pfpSendButton = document.getElementById('pfp-send-button');

uploadPfpBtn.addEventListener('click', async () => {
    const nationality = document.getElementById('country-input').value;
    const pfpPreview = document.getElementById('pfp-preview');
    const pfpFileInput = document.getElementById('pfp-file-input');
    
    let imageData = null;
    let fileName = null;

    if (pfpFileInput.files.length > 0) {
        const file = pfpFileInput.files[0];
        const base64 = await convertToBase64(file);
        imageData = base64.split(',')[1];
        fileName = file.name;
    }

    if (isGoogleRegistration) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://konisoftspeedruns.onrender.com/complete-google-profile', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nationality, imageData, fileName })
            });

            const result = await response.json();
            if (response.ok) {
                window.location.href = '../sites/lobby.html';
            } else {
                showToast(isHungarian ? `${result.error}` : `${result.error}`, "error");
            }
        } catch (err) {
            showToast(isHungarian ? "Hiba a Google profil befejezésénél!" : "Completing Google profile failed!", "error");
        }
    } else {
        const username = document.getElementById('username-input').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;

        if (!username || !email || !password) {
            showToast(isHungarian ? `Nincsenek a szükséges adatok megadva!` : `${result.error}`, "error");
            return;
        }

        const userData = { username, email, password, nationality, imageData, fileName };

        try {
            const response = await fetch('https://konisoftspeedruns.onrender.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (response.ok) {
                showToast(isHungarian ? `Sikeres regisztráció!` : `Successful registration!`, "success");
                localStorage.setItem('token', result.token);
                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = '../sites/lobby.html';
            } else {
                showToast(isHungarian ? `${result.error}` : `${result.error}`, "error");
            }
        } catch (err) {
            showToast(isHungarian ? `Hiba a regisztráció során: ${err}` : `Error during registration: ${err}`, "error");        
        }
    }
});