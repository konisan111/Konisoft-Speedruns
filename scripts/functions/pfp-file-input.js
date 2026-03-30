//  _           _         ___ _
// | |_ ___ ___|_|___ ___|  _| |_
// | '_| . |   | |_ -| . |  _|  _|
// |_,_|___|_|_|_|___|___|_| |_|
// Konisoft Speedruns Platform
// If you want it, then you'll have to take it.
//

/**
 * pfp-file-input.js
 * Manages the profile picture selection and preview, including dynamic
 * background color generation based on the selected image's palette.
 */

/**
 * Processes the selected profile picture file.
 * Generates a preview and updates the container's dynamic background.
 *
 * @param {Event} event - The file input change event.
 * @param {HTMLElement} pfpPreview - The element where the image preview is displayed.
 * @param {HTMLElement} mainContainer - The main authentication container element.
 */
export function pfpFileInputFunction(event, pfpPreview, mainContainer) {
  const file = event.target.files[0];

  if (file) {
    // Reset dynamic background while processing
    mainContainer.style.setProperty("--dynamic-bg-opacity", "0");

    const imgUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imgUrl;

    // Ensure image is decoded and a small delay for smoother transition
    Promise.all([
      new Promise((resolve) => setTimeout(resolve, 300)),
      img.decode().catch(() => {}),
    ]).then(() => {
      // --- Color Extraction ---
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1;
      canvas.height = 1;

      // Draw image to 1x1 canvas to get the dominant color
      ctx.drawImage(img, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

      // Calculate distance to black and white to avoid invisible backgrounds
      const distToBlack = Math.sqrt(
        Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2),
      );
      const distToWhite = Math.sqrt(
        Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2),
      );

      // --- UI Updates ---
      mainContainer.classList.add("no-bg-transition");
      mainContainer.style.setProperty("--dynamic-bg-clip", "inset(0 0 100% 0)");

      pfpPreview.style.backgroundImage = `url(${imgUrl})`;
      pfpPreview.classList.remove("pfp-bounce");

      // Force reflow for animation
      void mainContainer.offsetWidth;
      void pfpPreview.offsetWidth;

      pfpPreview.classList.add("pfp-bounce");
      mainContainer.classList.remove("no-bg-transition");

      // Only apply dynamic background if the color is distinct enough
      if (distToBlack < 60 || distToWhite < 60) {
        mainContainer.style.setProperty("--dynamic-bg-opacity", "0");
      } else {
        const dominantColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
        mainContainer.style.setProperty(
          "--dynamic-bg",
          `linear-gradient(to bottom, ${dominantColor} 0%, var(--main-background) 100%)`,
        );

        requestAnimationFrame(() => {
          mainContainer.style.setProperty("--dynamic-bg-opacity", "1");
          mainContainer.style.setProperty(
            "--dynamic-bg-clip",
            "inset(0 0 0% 0)",
          );
        });
      }
    });
  }
}
