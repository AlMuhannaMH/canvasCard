function overlayText() {
  fontTajawal = new FontFace("Tajawal", "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)", { weight: "700" });
  document.fonts.add(fontTajawal);
  let img = new Image(),
    canvas = document.getElementById("demo"),
    ctx = canvas.getContext("2d");
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    fontTajawal.load().then(
      () => {
        ctx.textBaseline = "middle";
        ctx.font = '700 54px "Tajawal"';
        ctx.textAlign = "center";
        var widthMessage = ctx.measureText(document.getElementById("yourMessage").value).width;
        //ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        //ctx.fillRect(444 - widthMessage / 2 - 10, 330 - 30, widthMessage + 20, 50); // + 20 since the text begins at 10
        ctx.fillStyle = "rgba(246, 246, 215,1)";
        ctx.fillText(document.getElementById("yourMessage").value, 444, 360, 700);

        // Add yourName below yourMessage
        ctx.font = '700 44px "Tajawal"'; // Adjust font size for yourName
        var widthName = ctx.measureText(document.getElementById("yourName").value).width;
        //ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        //ctx.fillRect(444 - widthName / 2 - 10, 380 - 30, widthName + 20, 50); // Adjust position for yourName
        ctx.fillStyle = "rgba(246, 246, 215,1)";
        ctx.fillText(document.getElementById("yourName").value, 444, 420, 700);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  // Update the image source based on the selected language
  var selectedLang = document.getElementById('change-language').value;
  if (selectedLang === 'en') {
    img.src = "images/EidAlAdhaGreetingEnglish.png";
  } else if (selectedLang === 'ar') {
    img.src = "images/EidAlAdhaGreetingArabic.png";
  }
}

var canvas = document.getElementById("demo");

download_img = function (el) {
  const blank = isCanvasBlank(document.getElementById("demo"));
  if (!blank) {
    var image = canvas.toDataURL("image/png");
    el.href = image;
    return true;
  } else {
    alert("Please fill in your message and then click on 'Create' to be able to download;  الرجاء تعبئة خانة رسالتك والضغط على زر الانشاء بعدها تستطيع تحميلها");
    return false;
  }
};

function isCanvasBlank(canvas) {
  const context = canvas.getContext("2d");
  const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
  return !pixelBuffer.some((color) => color !== 0);
}

function validateInput() {
  var yourMessage = document.getElementById("yourMessage").value;
  if (yourMessage === "") {
    alert("Please fill in your message and click on 'Create';  الرجاء تعبئة خانة رسالتك والضغط على زر الانشاء");
  } else {
    overlayText();
  }
}

// Add event listener to change the image when the language is changed
document.getElementById('change-language').addEventListener('change', overlayText);
