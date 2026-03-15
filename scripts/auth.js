const registerBtn = document.getElementById('register-button');
const loginBtn = document.getElementById('login-button');
const uploadPfpBtn = document.getElementById('pfp-send-button');

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;
    const nationality = document.getElementById('country-selected-text').innerText;    
    const pfpFile = document.getElementById('pfp-file-input').files[0];

    if (password !== repeatPassword) {
        console.error("Registration error: Passwords do not match!");
        return;
    }

    let imageData = "";
    let fileName = "";
    if (pfpFile) {
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
            localStorage.setItem('token', result.token); 
            console.log("Registration successful and logged in automatically!");
            
            document.getElementById('pfp-upload-container').style.display = 'block';
        }
        } catch (err) {
            console.error("Network error during registration:", err);
        }
});

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

uploadPfpBtn.addEventListener('click', async () => {
    const pfpFileInput = document.getElementById('pfp-file-input');
    const pfpFile = pfpFileInput.files[0];
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Hiba: Nem vagy bejelentkezve (hiányzik a token)!");
        return;
    }
    if (!pfpFile) {
        console.error("Hiba: Nincs kiválasztva fájl!");
        return;
    }

    try {
        // Megvárjuk a konvertálást (await!)
        const base64String = await convertToBase64(pfpFile);
        const imageData = base64String.split(',')[1];

        const data = { imageData, fileName: pfpFile.name };

        const response = await fetch('https://konisoftspeedruns.onrender.com/update-pfp', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            console.log("PFP Updated!", result.avatarUrl);
        } else {
            console.error("Update failed:", result.error);
        }
    } catch (err) {
        console.error("Hiba a feltöltés során:", err);
    }
});