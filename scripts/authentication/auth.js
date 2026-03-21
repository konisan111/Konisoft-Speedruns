const registerBtn = document.getElementById('register-button');
const loginBtn = document.getElementById('login-button');
const uploadPfpBtn = document.getElementById('pfp-send-button');
const googleLoginBtn = document.getElementById('google-login');

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
            console.log("Login successful! Token saved.");
            window.location.href = '../sites/lobby.html';
        } else {
            console.error("Login failed:", result.error);
        }
    } catch (err) {
        console.error("Network error during login:", err);
    }
});

window.isGoogleAuthSetup = false;

// Helper to decode the Google JWT token
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
                console.log("Sikeres bejelentkezés (Létező felhasználó):", result);
                alert("Sikeresen bejelentkeztél mint " + (result.username || "felhasználó") + "!");
                window.location.href = '../sites/lobby.html';
            }
        } else {
            console.error("Szerver hiba:", result.error);
            alert("Hiba a bejelentkezés során: " + result.error);
        }
    } catch (err) {
        console.error("Hálózati hiba:", err);
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
                console.log("Google profil sikeresen kiegészítve!");
                window.location.href = '../sites/lobby.html';
            } else {
                alert(result.error);
            }
        } catch (err) {
            console.error("Hiba a Google profil kiegészítésekor:", err);
        }
    } else {
        const username = document.getElementById('username-input').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;

        if (!username || !email || !password) {
            console.error("Hiányzó adatok a sima regisztrációhoz!");
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
                console.log("Sima regisztráció sikeres!");
                localStorage.setItem('token', result.token);
                window.location.href = '../sites/lobby.html';
            } else {
                alert(result.error);
            }
        } catch (err) {
            console.error("Hiba a regisztráció során:", err);
        }
    }
});