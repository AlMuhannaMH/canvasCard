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
                        ctx.font = '700 56px "Tajawal"';
                        ctx.textAlign = "center";
                        var width = ctx.measureText(document.getElementById("name").value).width;
                        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                        ctx.fillRect(1045-width / 2 - 10, 885-30, width + 20, 50);// + 20 since the text begins at 10
                        ctx.fillStyle = "rgba(0,155,19,1)";
                        ctx.fillText(document.getElementById("name").value, 1045, 885, 1045);
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

