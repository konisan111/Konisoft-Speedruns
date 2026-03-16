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

async function handleGoogleResponse(response) {
    try {
        const res = await fetch('https://konisoftspeedruns.onrender.com/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: response.credential })
        });

        const result = await res.json();
        if (res.ok) {
            localStorage.setItem('token', result.token);
            
            if (result.isNewUser) {
                const pfpPreview = document.getElementById("pfp-preview");
                if (pfpPreview && result.avatarUrl) {
                    pfpPreview.style.backgroundImage = `url(${result.avatarUrl})`;
                }
                
                window.showPfpUploadScreen(); 
            } else {
                window.location.href = "lobby.html";
            }
        }
    } catch (err) {
        console.error("Google Login Network Error:", err);
    }
}

window.handleGoogleResponse = handleGoogleResponse;
const pfpSendButton = document.getElementById('pfp-send-button');
pfpSendButton.addEventListener('click', async (e) => {
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const nationality = document.getElementById('country-input').value;
    const pfpFileInput = document.getElementById('pfp-file-input');
    const pfpFile = pfpFileInput.files[0];

    if (!username || !email || !password || !nationality) {
        console.error("Missing info: nationality!", nationality);
        return;
    }

    let imageData = "";
    let fileName = "";

    if (pfpFile) {
        console.log("Processing image...");
        const base64String = await convertToBase64(pfpFile);
        imageData = base64String.split(',')[1];
        fileName = pfpFile.name;
    }

    const userData = {
        username,
        email,
        password,
        nationality,
        imageData,
        fileName
    };

    try {
        const response = await fetch('https://konisoftspeedruns.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log("Registration was successful!", result);
            localStorage.setItem('token', result.token);
            window.location.href = "lobby.html";
        } else {
            console.error("Server error:", result.error);
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error("Network error. Check the backend, sometimes this error can occur when it's down.", err);
    }
});