document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('place-order-form');
  const message = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const foodName = document.getElementById('food-name').value.trim();
    const customerName = document.getElementById('customer-name').value.trim();

    if (foodName === '' || customerName === '') {
      message.textContent = 'Please provide both food and customer names.';
      message.classList.add('error');
    } else {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      
      const newOrder = {
        foodName: foodName,
        customerName: customerName,
        priority: 'high',
        status: 'pending'
      };

      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      message.textContent = 'High-priority order placed successfully!';
      message.classList.remove('error');
    }
  });
});
