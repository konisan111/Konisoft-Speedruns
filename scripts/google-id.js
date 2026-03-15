let isInitialized = false;

export function updateGoogleButton(lang) {
    if (typeof google !== 'undefined' && google.accounts.id) {
        
        if (!isInitialized) {
            google.accounts.id.initialize({
                client_id: "362122696928-cppghj9ccgtf34qd4t1ugohbhptsaaco.apps.googleusercontent.com",
                callback: window.handleGoogleResponse,
                auto_select: false,
                use_fedcm: false
            });
            isInitialized = true;
        }

        const target = document.getElementById("google-button-target");
        if (target) {
            target.innerHTML = ''; 
            google.accounts.id.renderButton(target, { 
                type: "standard", 
                theme: "outline", 
                size: "large", 
                locale: lang 
            });
        }
    }
}