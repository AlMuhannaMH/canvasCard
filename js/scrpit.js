    // Language switcher functionality
    $(document).ready(function() {
      // Set default language
      const defaultLang = 'en';
      setLanguage(defaultLang);
      
      // Change language
      $('#change-language').on('change', function() {
        setLanguage($(this).val());
      });
      
      function setLanguage(lang) {
        $('html').attr('lang', lang);
        
        // Hide all language elements first
        $('[data-lang]').hide();
        
        // Show only elements for the selected language
        $('[data-lang="' + lang + '"]').show();
        
        // Store the selected language preference
        localStorage.setItem('preferredLanguage', lang);
      }
      
      // Check if user has a saved language preference
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang) {
        $('#change-language').val(savedLang);
        setLanguage(savedLang);
      }
    });

    // Greeting card functionality
    $(document).ready(function() {
      // Load custom font (integrating with original code)
      const fontTajawal = new FontFace("Tajawal", "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)", { weight: "700" });
      document.fonts.add(fontTajawal);
      
      const canvas = document.getElementById('greeting-canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = 'images/EidAlFitrGreeting.jpg';
      
      // When image loads, set canvas dimensions
      img.onload = function() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      };
      
      // Preview button click handler
      $('#preview-btn').on('click', function() {
        validateInput();
      });
      
      // Handle name input enter key press
      $('#name').on('keypress', function(e) {
        if (e.which === 13) {
          e.preventDefault();
          $('#preview-btn').click();
        }
      });
      
      // Validate input before generating greeting
      function validateInput() {
        const name = $('#name').val().trim();
        const lang = $('#change-language').val();
        
        if (!name) {
          // Show error message based on selected language
          const message = lang === 'ar' 
            ? "الرجاء تعبئة خانة الاسم والضغط على زر الانشاء" 
            : "Please fill in your name and click on 'Create'";
          alert(message);
          return;
        }
        
        // Show loading spinner
        $('.loading').show();
        
        // Generate greeting with slight delay to show loading effect
        setTimeout(function() {
          overlayText(name);
          $('.loading').hide();
        }, 600);
      }
      
      // Generate greeting on canvas (based on original script.js)
      function overlayText(name) {
        // Clear canvas and redraw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        
        // Load the font and then add text
        fontTajawal.load().then(
          () => {
            const style = $('#greeting-style').val();
            const lang = $('#change-language').val();
            
            // Set text properties
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            
            // Choose color based on style
            ctx.fillStyle = style === 'modern' ? "rgba(0,155,19,1)" : "#8B4513";
            
            // Position for text (using coordinates from original script as reference)
            const centerX = 602.5; // From original script
            const centerY = 890;   // From original script
            
            // Calculate text width for background (if needed)
            ctx.font = '700 46px "Tajawal"';
            const textWidth = ctx.measureText(name).width;
            
            // Add semi-transparent background for text (optional, based on style)
            if (style === 'classic') {
              ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
              ctx.fillRect(centerX - textWidth / 2 - 10, centerY - 30, textWidth + 20, 50);
              ctx.fillStyle = "rgba(0,155,19,1)"; // Reset to green color
            }
            
            // Add name to the greeting
            if (lang === 'ar') {
              // Arabic text placement
              ctx.font = style === 'modern' ? '700 48px "Tajawal"' : '700 46px "Tajawal"';
              ctx.fillText(name, centerX, centerY, img.width * 0.8);
              
              // Add "Eid Mubarak" in Arabic if modern style
              if (style === 'modern') {
                ctx.font = '700 36px "Tajawal"';
                ctx.fillText('عيد مبارك', centerX, centerY + 60);
              }
            } else {
              // English text placement
              ctx.font = style === 'modern' ? '700 48px "Tajawal"' : '700 46px "Tajawal"';
              ctx.fillText(name, centerX, centerY, img.width * 0.8);
              
              // Add "Eid Mubarak" in English if modern style
              if (style === 'modern') {
                ctx.font = '700 36px "Tajawal"';
                ctx.fillText('Eid Mubarak', centerX, centerY + 60);
              }
            }
            
            // Enable download button
            enableDownload();
          },
          (err) => {
            console.error("Font loading error:", err);
            alert("Error loading font. Please try again.");
          }
        );
      }
      
      // Enable download functionality
      function enableDownload() {
        // Check if canvas is blank (function from original script)
        if (!isCanvasBlank(canvas)) {
          const downloadUrl = canvas.toDataURL("image/png");
          $('#download-btn').attr('href', downloadUrl);
        }
      }
      
      // Check if canvas is blank (from original script)
      function isCanvasBlank(canvas) {
        const context = canvas.getContext('2d');
        const pixelBuffer = new Uint32Array(
          context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
        return !pixelBuffer.some(color => color !== 0);
      }
      
      // Handle download button click
      $('#download-btn').on('click', function(e) {
        if (isCanvasBlank(canvas)) {
          e.preventDefault();
          const lang = $('#change-language').val();
          const message = lang === 'ar' 
            ? "الرجاء تعبئة خانة الاسم والضغط على زر الانشاء بعدها تستطيع تحميلها" 
            : "Please fill in your name and then click on 'Create' to be able to download";
          alert(message);
          return false;
        }
        return true;
      });
    });