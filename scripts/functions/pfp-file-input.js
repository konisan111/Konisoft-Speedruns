export function pfpFileInputFunction (
    event, 
    pfpPreview, 
    mainContainer) {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target.result;
        pfpPreview.style.backgroundImage = `url(${imgUrl})`;
        
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1;
            canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            
            const distToBlack = Math.sqrt(Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2));
            const distToWhite = Math.sqrt(Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2));
            
            if (distToBlack < 60 || distToWhite < 60) {
                mainContainer.style.background = "var(--main-background)";
            } else {
                const dominantColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
                mainContainer.style.background = `linear-gradient(to bottom, ${dominantColor} 0%, var(--main-background) 100%)`;
            }
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
}