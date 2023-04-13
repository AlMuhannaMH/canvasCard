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
                        ctx.font = '700 36px "Tajawal"';
                        ctx.fillStyle = "rgba(29,123,48, 1)";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(document.getElementById("name").value, 833, 657, 500);
                  },
                  (err) => {
                        console.error(err);
                  }
            );
      };

      img.src = "images/EidAlFitrGreeting.jpg";
}

var canvas = document.getElementById("demo");
download_img = function (el) {
      var image = canvas.toDataURL("image/jpg");
      el.href = image;
};