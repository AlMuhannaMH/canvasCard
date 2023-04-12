// var cardContainer = document.getElementById('demo');
const saveButton = document.getElementById('save-button');

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
                        ctx.fillStyle = "rgba(255, 255, 255, 1)";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(document.getElementById("name").value, 350, 620, 500);
                  },
                  (err) => {
                        console.error(err);
                  }
            );
      };
      
      img.src = "images/img.jpg";
}

function downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      link.click();
}

saveButton.addEventListener('click', function (event) {
      event.preventDefault();
      html2canvas(document.getElementById("demo"), {
            onrendered: function (canvas) {
                  var myImage = canvas.toDataURL("image/png");
                  // var myImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
                  downloadURI(myImage, "EidAlFitrGreeting.png");
            }
      });
});
