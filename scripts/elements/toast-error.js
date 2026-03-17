export function showToastError(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icon = document.createElement('img');
    icon.className = 'toast-icon';
    icon.src = '../images/error_icon.png'; 
    icon.alt = 'Error';
    
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
