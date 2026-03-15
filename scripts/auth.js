const registerBtn = document.getElementById('register-button');
const loginBtn = document.getElementById('login-button');
const uploadPfpBtn = document.getElementById('pfp-upload-button');

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
            console.log("Registration successful:", result.message);
        } else {
            console.error("Registration failed:", result.error);
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
    const pfpFile = document.getElementById('pfp-file-input').files[0];
    const token = localStorage.getItem('token');

    if (!pfpFile || !token) {
        console.error("Missing file or you are not logged in!");
        return;
    }

    const base64String = await convertToBase64(pfpFile);
    const imageData = base64String.split(',')[1];

    const data = {
        imageData: imageData,
        fileName: pfpFile.name
    };

    try {
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
            document.getElementById('user-avatar-display').src = result.avatarUrl;
        } else {
            console.error("Update failed:", result.error);
        }
    } catch (err) {
        console.error("Network error:", err);
    }
});