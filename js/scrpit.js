// Function to load the custom font    
function loadFont() {    
    return new FontFace("Tajawal", "url(https://fonts.cdnfonts.com/s/15774/Tajawal-Bold.woff)", { weight: "700" });    
}    
    
// Function to draw text on the canvas    
function drawText(ctx, text, x, y) {    
    const width = ctx.measureText(text).width;    
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";    
    ctx.fillRect(x - width / 2 - 10, y - 30, width + 20, 50);    
    ctx.fillStyle = "rgba(0,155,19,1)";    
    ctx.fillText(text, x, y, 615);    
}    
    
// Main function to overlay text onto the image    
function overlayText() {    
    const fontTajawal = loadFont();    
    document.fonts.add(fontTajawal);    
    const img = new Image();    
    const canvas = document.getElementById("demo");    
    const ctx = canvas.getContext("2d");    
    
    img.onload = () => {    
        canvas.width = img.naturalWidth;    
        canvas.height = img.naturalHeight;    
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);    
    
        fontTajawal.load().then(    
            () => {    
                ctx.textBaseline = "middle";    
                ctx.font = '700 46px "Tajawal"';    
                ctx.textAlign = "center";    
                drawText(ctx, document.getElementById("name").value, 602.5, 890);    
            },    
            (err) => {    
                console.error('Font loading error:', err);    
                ctx.font = '700 46px Arial'; // Fallback font    
                drawText(ctx, document.getElementById("name").value, 602.5, 890);    
            }    
        );    
    };    
    
    img.src = "images/EidAlFitrGreeting.jpg";    
}    
    
// Function to check if the canvas is blank    
function isCanvasBlank(canvas) {    
    const context = canvas.getContext('2d');    
    const pixelBuffer = new Uint32Array(    
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer    
    );    
    return !pixelBuffer.some(color => color !== 0);    
}    
    
// Function to handle image download    
function download_img(el) {    
    const blank = isCanvasBlank(document.getElementById('demo'));    
    if (!blank) {    
        var image = canvas.toDataURL("image/jpg");    
        el.href = image;    
        return true;    
    } else {    
        alert("Please fill in your name and then click on 'Create' to be able to download;  الرجاء تعبئة خانة الاسم والضغط على زر الانشاء بعدها تستطيع تحميلها");    
        return false;    
    }    
}    
    
// Function to validate input before overlay    
function validateInput() {    
    var name = document.getElementById("name").value;    
    if (name.trim() === "") {    
        alert("Please fill in your name and click on 'Create';  الرجاء تعبئة خانة الاسم والضغط على زر الانشاء");    
    } else {    
        overlayText();    
    }    
}    
    
// Event listeners for buttons    
document.getElementById('preview').addEventListener('click', validateInput);    
    
document.getElementById('download').addEventListener('click', function(event) {    
    if (!download_img(this)) {    
        event.preventDefault();    
    }    
});    