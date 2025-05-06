let isDragging = false;
let currentX, currentY;
let previewCanvas, previewCtx;

// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('adminAuthToken');
    
    if (!authToken || !authToken.startsWith('admin_')) {
        window.location.href = 'admin-login.html';
    }
    
    // Initialize canvas references
    previewCanvas = document.getElementById('previewCanvas');
    previewCtx = previewCanvas.getContext('2d');
    
    // Load current settings
    loadCurrentSettings();
    
    // Setup event listeners
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('adminAuthToken');
        window.location.href = 'admin-login.html';
    });
    
    document.getElementById('uploadImageBtn').addEventListener('click', uploadImage);
    document.getElementById('updateTextBtn').addEventListener('click', updateTextSettings);
    
    // Add mouse event listeners for positioning
    previewCanvas.addEventListener('mousedown', startDrag);
    previewCanvas.addEventListener('mousemove', drag);
    previewCanvas.addEventListener('mouseup', endDrag);
    previewCanvas.addEventListener('mouseleave', endDrag);
    
    // Update preview
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
    const img = new Image();
    img.onload = function() {
        previewCanvas.width = img.naturalWidth;
        previewCanvas.height = img.naturalHeight;
        previewCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        
        const settings = getCurrentSettings();
        const sampleText = "Your Name";
        const fontTajawal = new FontFace("Tajawal", "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)", { weight: "700" });
        
        document.fonts.add(fontTajawal);
        fontTajawal.load().then(() => {
            previewCtx.textBaseline = "middle";
            previewCtx.font = `700 ${settings.textSize}px "Tajawal"`;
            previewCtx.textAlign = "center";
            
            const width = previewCtx.measureText(sampleText).width;
            
            // Draw background rectangle
            const bgRgba = hexToRgba(settings.bgColor, settings.bgOpacity);
            previewCtx.fillStyle = bgRgba;
            previewCtx.fillRect(
                settings.textX - width / 2 - 10, 
                settings.textY - settings.textSize / 2, 
                width + 20, 
                settings.textSize + 10
            );
            
            // Draw text
            previewCtx.fillStyle = settings.textColor;
            previewCtx.fillText(sampleText, settings.textX, settings.textY, settings.textWidth);
            
            // Draw draggable indicator (circle around text position)
            previewCtx.beginPath();
            previewCtx.arc(settings.textX, settings.textY, 8, 0, 2 * Math.PI);
            previewCtx.strokeStyle = '#ff0000';
            previewCtx.lineWidth = 2;
            previewCtx.stroke();
            previewCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            previewCtx.fill();
            
            // Change cursor when hovering near text
            previewCanvas.addEventListener('mousemove', function(e) {
                const rect = previewCanvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const distance = Math.sqrt(
                    Math.pow(mouseX - settings.textX, 2) + 
                    Math.pow(mouseY - settings.textY, 2)
                );
                
                previewCanvas.style.cursor = distance < 30 ? 'grab' : 'default';
            });
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

// Add these new functions for mouse positioning
function startDrag(e) {
    const rect = previewCanvas.getBoundingClientRect();
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;
    
    // Check if click is near the text position
    const settings = getCurrentSettings();
    const distance = Math.sqrt(
        Math.pow(currentX - settings.textX, 2) + 
        Math.pow(currentY - settings.textY, 2)
    );
    
    if (distance < 30) { // 30px radius around text
        isDragging = true;
        previewCanvas.style.cursor = 'grabbing';
    }
}

function drag(e) {
    if (!isDragging) return;
    
    const rect = previewCanvas.getBoundingClientRect();
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;
    
    // Update position inputs
    document.getElementById('textX').value = Math.round(currentX);
    document.getElementById('textY').value = Math.round(currentY);
    
    // Update preview in real-time
    updatePreview();
}

function endDrag() {
    isDragging = false;
    previewCanvas.style.cursor = 'default';
}

function getCurrentSettings() {
    return JSON.parse(localStorage.getItem('greetingSettings')) || {
        textX: 602.5,
        textY: 890,
        textWidth: 615,
        textSize: 46,
        textColor: '#009b13',
        bgColor: '#ffffff',
        bgOpacity: 0.4
    };
}