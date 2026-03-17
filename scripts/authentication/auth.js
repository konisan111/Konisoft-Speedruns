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

window.handleGoogleResponse = async (googleResponse) => {
    // 1. Decode the user data from Google
    const responsePayload = decodeJwtResponse(googleResponse.credential);
    
    // Store these globally so we can use them later in the final registration step
    window.googleToken = googleResponse.credential;
    window.googleProfileData = responsePayload;

    console.log("Google Login Attempt for:", responsePayload.email);

    try {
        // 2. Check if the user already exists in your database
        const response = await fetch('https://konisoftspeedruns.onrender.com/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: googleResponse.credential })
        });

        const result = await response.json();

        if (response.ok) {
            // Case A: User exists and is now logged in
            localStorage.setItem('token', result.token);
            console.log("Login successful! Redirecting...");
            // window.location.href = "/dashboard"; // Uncomment when ready
        } else if (response.status === 404) {
            // Case B: User doesn't exist yet (Needs to select PFP and Nationality)
            console.log("New user detected. Moving to PFP and Nationality selection.");
            
            // This flag tells the PFP "Next" button to use the Google completion route
            window.isGoogleAuthSetup = true; 

            if (typeof window.showPfpUploadScreen === "function") {
                window.showPfpUploadScreen();
            } else {
                console.error("showPfpUploadScreen function not found in main.js");
            }
        } else {
            console.error("Google Login Error:", result.error);
        }
    } catch (err) {
        console.error("Google Login Network Error (Check if server is awake):", err);
    }
};

window.handleGoogleResponse = handleGoogleResponse;

const pfpSendButton = document.getElementById('pfp-send-button');
pfpSendButton.addEventListener('click', async (e) => {
    const nationality = document.getElementById('country-input').value;
    const pfpFileInput = document.getElementById('pfp-file-input');
    const pfpFile = pfpFileInput.files[0];

    if (!nationality) {
        console.error("Hiányzó infó: nemzetiség!");
        return;
    }

    let imageData = "";
    let fileName = "";

    if (pfpFile) {
        console.log("Kép feldolgozása...");
        const base64String = await convertToBase64(pfpFile);
        imageData = base64String.split(',')[1];
        fileName = pfpFile.name;
    }

    if (window.isGoogleAuthSetup) {
        const token = localStorage.getItem('token');
        try {
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
                console.log("Google profil sikeresen kiegészítve!", result);
            } else {
                alert("Hiba: " + result.error);
            }
        } catch (err) {
            console.error("Hálózati hiba a Google profil kiegészítésekor.", err);
        }
    } 
    else {
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
                console.log("Sima regisztráció sikeres!", result);
                localStorage.setItem('token', result.token);
            } else {
                alert("Hiba: " + result.error);
            }
        } catch (err) {
            console.error("Hálózati hiba regisztrációnál.", err);
        }
    }
});