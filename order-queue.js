window.onload = () => {
  const queueContainer = document.getElementById("orderQueue");
  const orders = JSON.parse(localStorage.getItem("pendingOrders")) || [];

  const validPendingOrders = orders.filter(order =>
    order &&
    order.name &&
    order.items &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    order.total > 0
  );

  if (validPendingOrders.length === 0) {
    queueContainer.innerHTML = `
      <div class="no-orders">
        🧾 No pending orders available.
      </div>`;
    return;
  }

  validPendingOrders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "order";

    div.innerHTML = `
      <h3>Pending Order #${index + 1}</h3>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Items:</strong> ${order.items.join(", ")}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Time:</strong> ${order.time || new Date().toLocaleString()}</p>
      <p><strong>Status:</strong> <span style="color: orange;">Pending</span></p>
    `;
    queueContainer.appendChild(div);
  });
};
