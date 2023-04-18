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
                        ctx.font = '700 46px "Tajawal"';
                        ctx.textAlign = "center";
                        var width = ctx.measureText(document.getElementById("name").value).width;
                        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                        ctx.fillRect(602.5 - width / 2 - 10, 890 - 30, width + 20, 50);// + 20 since the text begins at 10
                        ctx.fillStyle = "rgba(0,155,19,1)";
                        ctx.fillText(document.getElementById("name").value, 602.5, 890, 615);
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
      const blank = isCanvasBlank(document.getElementById('demo'));
      alert(blank ? 'blank' : 'not blank');
      if (!blank) {
            var image = canvas.toDataURL("image/jpg");
            el.href = image;
      } else {
            alert("Please fill in your name and then click on 'Create' to be able to download;  الرجاء تعبئة خانة الاسم والضغط على زر الانشاء بعدها تستطيع تحميلها");
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