// Az oldal betöltése után hívódik meg
document.addEventListener('DOMContentLoaded', function () {
    // Itt inicializálhatunk dolgokat, ha szükséges
});

// QR kód generálása
function generateQRCode() {
    var inputValue = document.getElementById('text-input').value;
    var qrcodeContainer = document.getElementById('qrcode');

    // Ellenőrizzük, hogy van-e érvényes bemenet
    if (inputValue.trim() !== '') {
        // Hozzunk létre egy új QRCode példányt
        var qrcode = new QRCode(qrcodeContainer, {
            text: inputValue,
            width: 128,
            height: 128
        });
    } else {
        // Ha nincs érvényes bemenet, jelenítsünk meg egy figyelmeztetést
        alert('Kérjük, adja meg az információt a QR kód generálásához.');
    }
}
