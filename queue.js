document.addEventListener('DOMContentLoaded', () => {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const orderList = document.getElementById('order-list');

  if (orders.length === 0) {
    orderList.innerHTML = "<p>No orders available.</p>";
    return;
  }

  orders.forEach(order => {
    // Check if order has valid customer data (name, phone, address)
    if (!order || order.totalPrice === 0 || !order.customerName || !order.customerPhone || !order.customerAddress) {
      return; // Skip this order if any required field is missing
    }

    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');
    
    // Status Class based on the order status
    const statusClass = order.status === "Success" ? "success" : "failed";
    orderCard.classList.add(statusClass);

    let customerInfo = `
      <p><strong>Name:</strong> ${order.customerName}</p>
      <p><strong>Phone:</strong> ${order.customerPhone}</p>
      <p><strong>Address:</strong> ${order.customerAddress}</p>
    `;

    orderCard.innerHTML = `
      <div class="order-header">
        <span>Order ID: ${order.transactionId}</span>
        <span class="status ${statusClass}">${order.status}</span>
      </div>
      <div class="order-info">
        ${customerInfo}
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.cartItems.map(item => `
            <li class="cart-item">${item.name} x${item.quantity} - ₹${item.price}</li>
          `).join('')}
        </ul>
        <p><strong>Total:</strong> ₹${order.totalPrice}</p>
      </div>
    `;

    orderList.appendChild(orderCard);
  });
});
