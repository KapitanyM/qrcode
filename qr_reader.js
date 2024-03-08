// Az oldal betöltése után hívódik meg
document.addEventListener('DOMContentLoaded', function () {
    // Inicializáljuk a QR kód olvasót
    initQRCodeReader();
});

// QR kód olvasó inicializálása
function initQRCodeReader() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Beállítjuk a videó elemet a kamera streammel
                var video = document.getElementById('video-preview');
                video.srcObject = stream;
                video.play();

                // Inicializáljuk a QuaggaJS-t
                Quagga.init({
                    inputStream: {
                        name: 'Live',
                        type: 'LiveStream',
                        target: video
                    },
                    decoder: {
                        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader', '2of5_reader', 'code_93_reader']
                    }
                }, function (err) {
                    if (err) {
                        console.error('Hiba az inicializálás során:', err);
                        return;
                    }
                    // Feliratkozunk a detektált QR kód eseményekre
                    Quagga.start();
                    Quagga.onDetected(handleQRCode);
                });
            })
            .catch(function (err) {
                console.error('Hiba a kamera elérésével:', err);
            });
    } else {
        console.error('A böngésző nem támogatja a kamera hozzáférést.');
    }
}

// Kezeli a detektált QR kódokat
function handleQRCode(result) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Detektált QR kód: ' + result.codeResult.code + '</p>';
}
