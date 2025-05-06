function overlayText() {
    fontTajawal = new FontFace("Tajawal", "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)", { weight: "700" });
    document.fonts.add(fontTajawal);
    let img = new Image(),
        canvas = document.getElementById("demo"),
        ctx = canvas.getContext("2d");
    
    // First try to load from localStorage, then fallback to default
    const savedImage = localStorage.getItem('greetingImage');
    img.src = savedImage || 'images/EidAlFitrGreeting.jpg';
    
    img.onload = () => {
        // Ensure the image is fully loaded before drawing
        if (!img.complete || img.naturalWidth === 0) {
            setTimeout(() => overlayText(), 100);
            return;
        }
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        
        // Load settings from localStorage or use defaults
        const settings = JSON.parse(localStorage.getItem('greetingSettings')) || {
            textX: 602.5,
            textY: 890,
            textWidth: 615,
            textSize: 46,
            textColor: '#009b13',
            bgColor: '#ffffff',
            bgOpacity: 0.4
        };
        
        fontTajawal.load().then(
            () => {
                ctx.textBaseline = "middle";
                ctx.font = `700 ${settings.textSize}px "Tajawal"`;
                ctx.textAlign = "center";
                var width = ctx.measureText(document.getElementById("name").value).width;
                
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
                ctx.fillText(document.getElementById("name").value, settings.textX, settings.textY, settings.textWidth);
            },
            (err) => {
                console.error(err);
            }
        );
    };
    
    img.onerror = () => {
        // If the saved image fails to load, try the default image
        if (savedImage) {
            localStorage.removeItem('greetingImage');
            img.src = 'images/EidAlFitrGreeting.jpg';
        }
    };
}
  
  function hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Rest of your existing code remains the same...
  var canvas = document.getElementById("demo");
  
  download_img = function (el) {
      const blank = isCanvasBlank(document.getElementById('demo'));
      if (!blank) {
          var image = canvas.toDataURL("image/jpg");
          el.href = image;
          return true;
      }
      else {
          alert("Please fill in your name and then click on 'Create' to be able to download;  الرجاء تعبئة خانة الاسم والضغط على زر الانشاء بعدها تستطيع تحميلها");
          return false;
      }
  };
  
  function isCanvasBlank(canvas) {
      const context = canvas.getContext('2d');
      const pixelBuffer = new Uint32Array(
          context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
      );
      return !pixelBuffer.some(color => color !== 0);
  }
  
  function validateInput() {
      var name = document.getElementById("name").value;
      if (name === "") {
          alert("Please fill in your name and click on 'Create';  الرجاء تعبئة خانة الاسم والضغط على زر الانشاء");
      } else {
          overlayText()
      }
  }