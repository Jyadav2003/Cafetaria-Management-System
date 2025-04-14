window.onload = () => {
  const container = document.getElementById("summaryContainer");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const validOrders = orders.filter(order =>
    order &&
    order.name &&
    order.phone &&
    order.address &&
    order.payment &&
    order.total > 0
  );

  if (validOrders.length === 0) {
    container.innerHTML = `
      <div class="no-orders">
        🧾 No completed orders to show.
      </div>`;
    return;
  }

  validOrders.forEach((order, index) => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <h3>Order #${index + 1}</h3>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Payment:</strong> ${order.payment}</p>
      <p><strong>Status:</strong> <span style="color: green;">${order.status || 'Success'}</span></p>
      <p><strong>Time:</strong> ${order.time || new Date().toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
};
