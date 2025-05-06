// Wait for DOM to be fully loaded    
document.addEventListener('DOMContentLoaded', () => {    
  // Initialize language selector    
  initLanguageSelector();    
      
  // Add event listeners    
  document.getElementById('preview').addEventListener('click', validateInput);    
  document.getElementById('download').addEventListener('click', function(e) {    
      return download_img(this, e);    
  });    
      
  // Auto-generate preview when pressing Enter in the name field    
  document.getElementById('name').addEventListener('keypress', function(e) {    
      if (e.key === 'Enter') {    
          e.preventDefault();    
          validateInput();    
      }    
  });    
      
  // Set default placeholder based on language    
  updateGreetingPlaceholder(document.getElementById('change-language').value);    
      
  // Pre-load the font to avoid FOUT (Flash of Unstyled Text)    
  loadFont(() => {    
      console.log('Font loaded and ready');    
  });    
});    
  
/**    
* Preload the Tajawal font to ensure it's available when drawing on canvas    
*/    
function loadFont(callback) {    
  const fontTajawal = new FontFace(    
      "Tajawal",     
      "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)",     
      { weight: "700" }    
  );    
      
  fontTajawal.load().then(() => {    
      document.fonts.add(fontTajawal);    
      console.log('Font loaded successfully');    
      if (callback) callback(); // Invoke callback when font loading is complete    
  }).catch(err => console.error('Font loading error:', err));    
}    
  
/**    
* Initialize language selector and handle language changes    
*/    
function initLanguageSelector() {    
  const languageSelector = document.getElementById('change-language');    
      
  // Set initial language based on browser preference or default to English    
  const userLang = navigator.language || navigator.userLanguage;    
  const initialLang = userLang.startsWith('ar') ? 'ar' : 'en';    
  languageSelector.value = initialLang;    
      
  // Apply initial language    
  changeLanguage(initialLang);    
      
  // Add change event listener    
  languageSelector.addEventListener('change', (e) => {    
      changeLanguage(e.target.value);    
  });    
}    
  
/**    
* Change UI language    
* @param {string} lang - Language code ('en' or 'ar')    
*/    
function changeLanguage(lang) {    
  // Hide all language elements    
  document.querySelectorAll('[data-lang]').forEach(el => {    
      el.style.display = 'none';    
  });    
  
  // Show elements for the selected language    
  document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {    
      el.style.display = 'block';    
  });    
      
  // Update document direction for RTL support    
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';    
      
  // Update placeholder for name input based on language    
  const nameField = document.getElementById('name');    
  nameField.placeholder = lang === 'ar' ? 'اكتب اسمك هنا' : 'Enter your name here';    
      
  // Update greeting placeholder    
  updateGreetingPlaceholder(lang);    
}    
  
/**    
* Updates the greeting placeholder text based on language    
* @param {string} lang - Language code ('en' or 'ar')    
*/    
function updateGreetingPlaceholder(lang) {    
  const greetingField = document.getElementById('greeting');    
  if (greetingField) {    
      greetingField.placeholder = lang === 'ar'     
          ? 'عيد مبارك وكل عام وأنتم بخير!'    
          : 'Happy Eid Mubarak to you and your family!';    
  }    
}    
  
/**    
* Validates user input before generating the greeting card    
*/    
function validateInput() {    
  const nameField = document.getElementById('name');    
  const name = nameField.value.trim();    
  const greeting = document.getElementById('greeting').value.trim();    
  const currentLang = document.getElementById('change-language').value;    
      
  if (name === "") {    
      const message = currentLang === 'ar'     
          ? "الرجاء تعبئة خانة الاسم"     
          : "Please enter your name";    
          
      alert(message);    
      nameField.focus();    
      return;    
  }    
      
  // Generate card with name and optional greeting    
  generateGreetingCard(name, greeting);    
}    
  
/**    
* Generates the greeting card with the user's name and custom greeting    
* @param {string} name - User's name to display on the card    
* @param {string} greeting - Custom greeting message (optional)    
*/    
function generateGreetingCard(name, greeting = '') {    
  const canvas = document.getElementById("demo");    
  const ctx = canvas.getContext("2d");    
  const img = new Image();    
      
  // Show loading indicator    
  canvas.classList.add('loading');    
      
  img.onload = () => {    
      // Set canvas dimensions to match image    
      canvas.width = img.naturalWidth;    
      canvas.height = img.naturalHeight;    
          
      // Draw background image    
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);    
          
      // Calculate text position (centered horizontally, fixed vertical position)    
      const centerX = canvas.width / 2;    
      const nameY = 890;  // Name vertical position    
          
      // Draw name text    
      drawTextWithBackground(ctx, name, centerX, nameY, 46, 'rgba(0, 155, 19, 1)');    
          
      // Draw greeting text if provided    
      if (greeting) {    
          const greetingY = nameY + 70; // Position greeting below name    
          drawTextWithBackground(ctx, greeting, centerX, greetingY, 32, 'rgba(0, 155, 19, 0.9)');    
      }    
          
      // Remove loading indicator    
      canvas.classList.remove('loading');    
          
      // Enable download button    
      document.getElementById('download').classList.add('active');    
  };    
      
  // Handle image loading errors    
  img.onerror = () => {    
      console.error('Error loading the greeting card image');    
      canvas.classList.remove('loading');    
          
      // Draw error message on canvas    
      ctx.fillStyle = "#f8d7da";    
      ctx.fillRect(0, 0, canvas.width, canvas.height);    
      ctx.fillStyle = "#721c24";    
      ctx.font = '20px Arial';    
      ctx.fillText('Error loading image', canvas.width / 2, canvas.height / 2);    
  };    
      
  // Start loading the image    
  img.src = "images/EidAlFitrGreeting.jpg";    
}    
  
/**    
* Draws text with a semi-transparent background on the canvas    
* @param {CanvasRenderingContext2D} ctx - Canvas context    
* @param {string} text - Text to draw    
* @param {number} x - X position (center)    
* @param {number} y - Y position    
* @param {number} fontSize - Font size in pixels    
* @param {string} color - Text color    
*/    
function drawTextWithBackground(ctx, text, x, y, fontSize, color) {    
  // Configure text styling    
  ctx.textBaseline = "middle";    
  ctx.font = `700 ${fontSize}px "Tajawal"`;    
  ctx.textAlign = "center";    
      
  // Calculate text width for background    
  const textWidth = ctx.measureText(text).width;    
  const padding = fontSize * 0.4; // Proportional padding    
      
  // Draw semi-transparent background    
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";    
  ctx.fillRect(    
      x - textWidth / 2 - padding / 2,  // Left position    
      y - fontSize / 2 - padding / 2,   // Top position    
      textWidth + padding,              // Width    
      fontSize + padding                // Height    
  );    
      
  // Draw text    
  ctx.fillStyle = color;    
  ctx.fillText(text, x, y, ctx.canvas.width * 0.8); // Limit width to 80% of canvas    
}    
  
/**    
* Checks if the canvas is blank (no image generated yet)    
* @param {HTMLCanvasElement} canvas - The canvas element to check    
* @return {boolean} True if canvas is blank, false otherwise    
*/    
function isCanvasBlank(canvas) {    
  // Fast check - if canvas has no width or height, it's blank    
  if (canvas.width === 0 || canvas.height === 0) {    
      return true;    
  }    
      
  // Pixel-level check    
  const context = canvas.getContext('2d');    
  const pixelBuffer = new Uint32Array(    
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer    
  );    
      
  // If any pixel has a color, canvas is not blank    
  return !pixelBuffer.some(color => color !== 0);    
}    
  
/**    
* Handles the image download process    
* @param {HTMLElement} el - The download link element    
* @param {Event} e - The click event    
* @return {boolean} True if download should proceed, false otherwise    
*/    
function download_img(el, e) {    
  const canvas = document.getElementById('demo');    
  const currentLang = document.getElementById('change-language').value;    
      
  // Check if canvas is blank    
  if (isCanvasBlank(canvas)) {    
      e.preventDefault();    
          
      const message = currentLang === 'ar'    
          ? "الرجاء تعبئة خانة الاسم والضغط على زر الانشاء بعدها تستطيع تحميلها"    
          : "Please fill in your name and then click on 'Create' to be able to download";    
              
      alert(message);    
      return false;    
  }    
      
  try {    
      // Generate image data URL    
      const imageData = canvas.toDataURL("image/png", 0.9);  // Use PNG with 90% quality    
      el.href = imageData;    
          
      // Add custom file name with user's name    
      const userName = document.getElementById('name').value.trim();    
      const greeting = document.getElementById('greeting').value.trim();    
      const fileName = greeting     
          ? `EidAlFitrGreeting_${userName}_custom.png`    
          : `EidAlFitrGreeting_${userName}.png`;    
          
      el.download = fileName;    
          
      return true;    
  } catch (error) {    
      console.error('Error generating download:', error);    
      alert('Error creating downloadable image. Please try again.');    
      return false;    
  }    
}    