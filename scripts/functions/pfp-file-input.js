export function pfpFileInputFunction (
    event, 
    pfpPreview, 
    mainContainer) {

    const file = event.target.files[0];
    if (file) {
      mainContainer.style.setProperty('--dynamic-bg-opacity', '0');

      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target.result;
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
            
            setTimeout(() => {
                mainContainer.classList.add('no-bg-transition');
                mainContainer.style.setProperty('--dynamic-bg-clip', 'inset(0 0 100% 0)');
                
                pfpPreview.style.backgroundImage = `url(${imgUrl})`;
                pfpPreview.classList.remove('pfp-bounce');
                
                void mainContainer.offsetWidth;
                void pfpPreview.offsetWidth; 
                
                pfpPreview.classList.add('pfp-bounce');

                mainContainer.classList.remove('no-bg-transition');

                if (distToBlack < 60 || distToWhite < 60) {
                    mainContainer.style.setProperty('--dynamic-bg-opacity', '0');
                } else {
                    const dominantColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
                    mainContainer.style.setProperty('--dynamic-bg', `linear-gradient(to bottom, ${dominantColor} 0%, var(--main-background) 100%)`);
                    
                    requestAnimationFrame(() => {
                        mainContainer.style.setProperty('--dynamic-bg-opacity', '1');
                        mainContainer.style.setProperty('--dynamic-bg-clip', 'inset(0 0 0% 0)');
                    });
                }
            }, 300); 
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
}