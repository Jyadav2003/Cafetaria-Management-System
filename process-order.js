document.getElementById('process-order-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const orderId = document.getElementById('order-id').value;
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
  const order = orders.find(order => order.id === parseInt(orderId));

  const messageElement = document.getElementById('message');
  if (order) {
    order.status = 'completed';
    localStorage.setItem('orders', JSON.stringify(orders));
    messageElement.textContent = 'Order processed successfully!';
    messageElement.classList.remove('error');
  } else {
    messageElement.textContent = 'Order ID not found.';
    messageElement.classList.add('error');
  }
});
