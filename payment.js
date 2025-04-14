document.addEventListener('DOMContentLoaded', function () {
  const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
  if (!currentOrder) return window.location.href = 'index.html';

  const paymentForm = document.getElementById('payment-form');
  const otpSection = document.getElementById('otp-section');
  const successSection = document.getElementById('success-section');
  const paymentMethod = currentOrder.paymentMethod;

  // Show only the relevant payment section
  if (paymentMethod === 'UPI') {
    document.getElementById('upi-section').style.display = 'block';
    document.getElementById('card-section').style.display = 'none';
  } else if (paymentMethod === 'Credit/Debit Card') {
    document.getElementById('card-section').style.display = 'block';
    document.getElementById('upi-section').style.display = 'none';
  } else {
    alert("Payment method not supported. Redirecting to Home.");
    return window.location.href = 'index.html';
  }

  // Submit payment
  paymentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (paymentMethod === 'UPI') {
      const upi = document.getElementById('upiId').value;
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/.test(upi)) {
        return alert("Please enter a valid UPI ID (e.g., phone@upi).");
      }
      simulateOTP();
    } else if (paymentMethod === 'Credit/Debit Card') {
      const name = document.getElementById('cardName').value;
      const number = document.getElementById('cardNumber').value;
      const expiry = document.getElementById('expiry').value;
      const cvv = document.getElementById('cvv').value;

      if (!name || number.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length !== 3) {
        return alert("Please enter all card details correctly.");
      }
      simulateOTP();
    }
  });

  function simulateOTP() {
    otpSection.style.display = 'block';
    paymentForm.style.display = 'none';
  }

  document.getElementById('verify-otp').addEventListener('click', function () {
    const otp = document.getElementById('otp').value;
    if (otp.length === 6) {
      completePayment();
    } else {
      alert("Invalid OTP. Try again.");
    }
  });
function completePayment() {
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if (!currentOrder) return;

    const newReceipt = {
      transactionId: 'TXN' + Date.now(),
      customerName: currentOrder.name,
      customerPhone: currentOrder.phone,
      customerAddress: currentOrder.address,
      paymentMethod: currentOrder.paymentMethod,
      cartItems: currentOrder.cartItems,
      totalPrice: currentOrder.totalPrice,
      status: "Success",
      date: new Date().toLocaleString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      })
    };


     const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newReceipt);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('currentOrder');

    successSection.style.display = 'block';
    otpSection.style.display = 'none';

    setTimeout(() => {
      window.location.href = 'queue.html';
    }, 2000);
  }
});
