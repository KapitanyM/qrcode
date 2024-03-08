Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner'),
        constraints: {
            width: 480,
            height: 320,
            facingMode: "environment"
        },
    },
    decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
    }
}, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(function (result) {
    console.log("Barcode detected and processed: ", result);
    // Itt hajtsd végre azokat az akciókat, amiket a QR kód észlelésekor szeretnél végrehajtani.
});