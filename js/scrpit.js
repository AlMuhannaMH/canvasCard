/*function overlayText() {
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
        ctx.fillStyle = "rgba(90, 110, 60, 0.3)";
        ctx.fillRect(444 - widthMessage / 2 - 5, 330 - 30, widthMessage + 15, 50); // + 20 since the text begins at 10
        ctx.fillStyle = "rgba(246, 246, 215,1)";
        ctx.fillText(document.getElementById("yourMessage").value, 444, 360, 700);

        // Add yourName below yourMessage
        ctx.font = '700 44px "Tajawal"'; // Adjust font size for yourName
        var widthName = ctx.measureText(document.getElementById("yourName").value).width;
        ctx.fillStyle = "rgba(90, 110, 60, 0.3)";
        ctx.fillRect(444 - widthName / 2 - 5, 380 - 30, widthName + 15, 50); // Adjust position for yourName
        ctx.fillStyle = "rgba(246, 246, 215,1)";
        ctx.fillText(document.getElementById("yourName").value, 444, 420, 700);
      },
      (err) => {
        console.error(err);
      }
    );
  };*/
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  var lines = [];
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Actually draw if coordinates are valid
  if (x !== -9999 && y !== -9999) {
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].trim(), x, y + i * lineHeight, maxWidth);
    }
  }
  return lines;
}
function overlayText() {
  fontTajawal = new FontFace(
    "Tajawal",
    "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)",
    { weight: "700" }
  );
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
        ctx.textAlign = "center";

        // MESSAGE
        ctx.font = '700 54px "Tajawal"';
        var message = document.getElementById("yourMessage").value;
        var maxWidth = 700;
        var lineHeight = 60;
        var gapBetween = 40;
        var startY = 360;

        // Calculate lines for text (dry-run)
        var lines = wrapText(ctx, message, -9999, -9999, maxWidth, lineHeight);

        // SHADOW for message text
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = "rgba(246, 246, 215,1)";
        wrapText(ctx, message, 444, startY, maxWidth, lineHeight);

        // Reset shadow after message
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // NAME
        ctx.font = '700 44px "Tajawal"';
        var yourName = document.getElementById("yourName").value;
        var nameY = startY + lines.length * lineHeight + gapBetween;

        // SHADOW for name text
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = "rgba(246, 246, 215,1)";
        ctx.fillText(yourName, 444, nameY, 700);

        // Reset shadow after name
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      },
      (err) => {
        console.error(err);
      }
    );
  };

  // Update the image source based on the selected language
  var selectedLang = document.getElementById("change-language").value;
  if (selectedLang === "en") {
    img.src = "images/EidAlAdhaGreetingEnglish.png";
  } else if (selectedLang === "ar") {
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
    alert(
      "Please fill in your message and then click on 'Create' to be able to download;  الرجاء تعبئة خانة رسالتك والضغط على زر الانشاء بعدها تستطيع تحميلها"
    );
    return false;
  }
};

function isCanvasBlank(canvas) {
  const context = canvas.getContext("2d");
  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return !pixelBuffer.some((color) => color !== 0);
}

function validateInput() {
  var yourMessage = document.getElementById("yourMessage").value;
  if (yourMessage === "") {
    alert(
      "Please fill in your message and click on 'Create';  الرجاء تعبئة خانة رسالتك والضغط على زر الانشاء"
    );
  } else {
    overlayText();
  }
}

// Add event listener to change the image when the language is changed
document
  .getElementById("change-language")
  .addEventListener("change", overlayText);
