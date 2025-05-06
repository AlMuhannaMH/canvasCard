// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('adminAuthToken');
    
    if (!authToken || !authToken.startsWith('admin_')) {
        // Not authenticated, redirect to login
        window.location.href = 'admin-login.html';
    }
    
    // Load current settings
    loadCurrentSettings();
    
    // Setup event listeners
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('adminAuthToken');
        window.location.href = 'admin-login.html';
    });
    
    document.getElementById('uploadImageBtn').addEventListener('click', uploadImage);
    document.getElementById('updateTextBtn').addEventListener('click', updateTextSettings);
    
    // Preview with sample text
    updatePreview();
});

function loadCurrentSettings() {
    // Load from localStorage or use defaults
    const settings = JSON.parse(localStorage.getItem('greetingSettings')) || {
        textX: 602.5,
        textY: 890,
        textWidth: 615,
        textSize: 46,
        textColor: '#009b13',
        bgColor: '#ffffff',
        bgOpacity: 0.4
    };
    
    // Set form values
    document.getElementById('textX').value = settings.textX;
    document.getElementById('textY').value = settings.textY;
    document.getElementById('textWidth').value = settings.textWidth;
    document.getElementById('textSize').value = settings.textSize;
    document.getElementById('textColor').value = settings.textColor;
    document.getElementById('bgColor').value = settings.bgColor;
    document.getElementById('bgOpacity').value = settings.bgOpacity;
}

function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select an image file first');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Save the image data to localStorage
        localStorage.setItem('greetingImage', e.target.result);
        alert('Image updated successfully!');
        updatePreview();
    };
    reader.readAsDataURL(file);
}

function updateTextSettings() {
    const settings = {
        textX: parseFloat(document.getElementById('textX').value),
        textY: parseFloat(document.getElementById('textY').value),
        textWidth: parseFloat(document.getElementById('textWidth').value),
        textSize: parseInt(document.getElementById('textSize').value),
        textColor: document.getElementById('textColor').value,
        bgColor: document.getElementById('bgColor').value,
        bgOpacity: parseFloat(document.getElementById('bgOpacity').value)
    };
    
    // Save to localStorage
    localStorage.setItem('greetingSettings', JSON.stringify(settings));
    alert('Text settings updated successfully!');
    updatePreview();
}

function updatePreview() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load image (from localStorage or default)
    const img = new Image();
    img.onload = function() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        
        // Load settings
        const settings = JSON.parse(localStorage.getItem('greetingSettings')) || {
            textX: 602.5,
            textY: 890,
            textWidth: 615,
            textSize: 46,
            textColor: '#009b13',
            bgColor: '#ffffff',
            bgOpacity: 0.4
        };
        
        // Draw text with current settings
        const sampleText = "Your Name";
        const fontTajawal = new FontFace("Tajawal", "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)", { weight: "700" });
        
        document.fonts.add(fontTajawal);
        fontTajawal.load().then(() => {
            ctx.textBaseline = "middle";
            ctx.font = `700 ${settings.textSize}px "Tajawal"`;
            ctx.textAlign = "center";
            
            const width = ctx.measureText(sampleText).width;
            
            // Draw background rectangle
            const bgRgba = hexToRgba(settings.bgColor, settings.bgOpacity);
            ctx.fillStyle = bgRgba;
            ctx.fillRect(
                settings.textX - width / 2 - 10, 
                settings.textY - settings.textSize / 2, 
                width + 20, 
                settings.textSize + 10
            );
            
            // Draw text
            ctx.fillStyle = settings.textColor;
            ctx.fillText(sampleText, settings.textX, settings.textY, settings.textWidth);
        });
    };
    
    const savedImage = localStorage.getItem('greetingImage');
    img.src = savedImage || 'images/EidAlFitrGreeting.jpg';
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}