document.addEventListener('DOMContentLoaded', function () {
    // Itt inicializálhatunk dolgokat, ha szükséges
});

function generateQRCode() {
    var inputValue = document.getElementById('text-input').value;
    var qrcodeContainer = document.getElementById('qrcode');

    if (inputValue.trim() !== '') {
        var qrcode = new QRCode(qrcodeContainer, {
            text: inputValue,
            width: 128,
            height: 128
        });
    } else {
        alert('Kérjük, adja meg az információt a QR kód generálásához.');
    }
}

// Új függvény a QR kód olvasásához
function scanQRCode() {
    var video = document.createElement("video");
    var canvasElement = document.createElement("canvas");
    var canvas = canvasElement.getContext("2d");

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // iOS támogatás
            video.play();
            requestAnimationFrame(tick);
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.hidden = false;
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                alert('QR kód tartalma: ' + code.data);
            }
        }

        requestAnimationFrame(tick);
    }
}
