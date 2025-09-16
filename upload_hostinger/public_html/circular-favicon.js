// This script creates a circular favicon from the specified image
document.addEventListener('DOMContentLoaded', function() {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 180;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  
  // Load the image
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  
  img.onload = function() {
    // Calculate dimensions to maintain aspect ratio
    let size = Math.min(img.width, img.height);
    let offsetX = (img.width - size) / 2;
    let offsetY = (img.height - size) / 2;
    
    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    // Draw image
    ctx.drawImage(
      img, 
      offsetX, offsetY, size, size,
      0, 0, canvas.width, canvas.height
    );
    
    // Add a subtle border
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create a new favicon link element
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = dataUrl;
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = dataUrl;
      document.head.appendChild(newFavicon);
    }
    
    // Update Apple touch icon as well
    const touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (touchIcon) {
      touchIcon.href = dataUrl;
    }
  };
  
  img.src = '/IMG_2920.JPEG.jpg';
});
