export function showToast(message, type = 'error') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = document.createElement('img');
    icon.className = 'toast-icon';
    icon.src = type === 'success' ? '../images/check_icon.png' : '../images/error_icon.png'; 
    icon.alt = type === 'success' ? 'Success' : 'Error';
    
    const textNode = document.createElement('span');
    textNode.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(textNode);
    container.appendChild(toast);
    
    setTimeout(() => {
        if(toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}