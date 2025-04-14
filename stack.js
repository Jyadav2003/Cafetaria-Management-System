document.addEventListener('DOMContentLoaded', function () {
  const pendingOrdersContainer = document.getElementById('pending-orders');

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const pendingOrders = orders.filter(order => order.status === 'pending');
  
  if (pendingOrders.length === 0) {
    pendingOrdersContainer.innerHTML = '<p>No pending orders to display.</p>';
  } else {
    pendingOrdersContainer.innerHTML = pendingOrders.map(order => `
      <div class="order-item">
        <span>${order.foodName}</span>
        <span>${order.customerName}</span>
      </div>
    `).join('');
  }
});
