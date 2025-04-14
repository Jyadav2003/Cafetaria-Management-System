document.addEventListener('DOMContentLoaded', function () {
  const errorMessage = document.getElementById('error-message');

  // Function to display error message
  function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }

  // Function to hide error message
  function hideError() {
    errorMessage.style.display = 'none';
  }

  // Add Food Item to Receipt
  document.getElementById('add-item').addEventListener('click', function() {
    const itemName = prompt('Enter item name to add to the receipt:');
    const itemPrice = parseFloat(prompt('Enter item price for the receipt:'));
    
    if (itemName && !isNaN(itemPrice)) {
      let receipt = JSON.parse(localStorage.getItem('receipt')) || [];
      receipt.push({ name: itemName, price: itemPrice });
      localStorage.setItem('receipt', JSON.stringify(receipt));

      alert(`${itemName} added to receipt!`);
    } else {
      displayError('Invalid item data!');
      setTimeout(hideError, 3000);
    }
  });

  // Remove Food Item from Receipt
  document.getElementById('remove-item').addEventListener('click', function() {
    let receipt = JSON.parse(localStorage.getItem('receipt')) || [];
    if (receipt.length === 0) {
      displayError('No items in the receipt to remove!');
      setTimeout(hideError, 3000);
      return;
    }

    let itemList = receipt.map((item, index) => `${index + 1}. ${item.name} - ₹${item.price}`).join('\n');
    const itemToRemove = parseInt(prompt(`Select item to remove:\n${itemList}`)) - 1;

    if (itemToRemove >= 0 && itemToRemove < receipt.length) {
      receipt.splice(itemToRemove, 1); // Remove selected item
      localStorage.setItem('receipt', JSON.stringify(receipt));
      alert('Item removed from receipt!');
    } else {
      displayError('Invalid selection!');
      setTimeout(hideError, 3000);
    }
  });

  // Delete Entire Receipt
  document.getElementById('delete-receipt').addEventListener('click', function() {
    localStorage.removeItem('receipt');
    alert('Receipt deleted!');
  });

  // Place Order with High Priority
  document.getElementById('place-order-priority').addEventListener('click', function() {
    let receipt = JSON.parse(localStorage.getItem('receipt')) || [];
    
    if (receipt.length === 0) {
      displayError('No items in the receipt!');
      setTimeout(hideError, 3000);
      return;
    }

    // Marking the order as high priority
    let order = { items: receipt, priority: true, timestamp: new Date().toISOString() };
    localStorage.setItem('current-order', JSON.stringify(order));

    alert('Order placed with high priority!');
  });

  // Display Menu (Redirect to Menu Page)
  document.getElementById('display-menu').addEventListener('click', function() {
    window.location.href = 'menu.html'; // Redirect to menu page
  });

  // Display Order Summary
  document.getElementById('order-summary').addEventListener('click', function() {
    let receipt = JSON.parse(localStorage.getItem('receipt')) || [];
    if (receipt.length === 0) {
      displayError('No orders placed today.');
      setTimeout(hideError, 3000);
      return;
    }

    let totalAmount = receipt.reduce((total, item) => total + item.price, 0);
    let orderList = receipt.map(item => `${item.name} - ₹${item.price}`).join('\n');
    
    alert(`Order Summary:\n\n${orderList}\n\nTotal: ₹${totalAmount}`);
  });

  // Process Order Faster
  document.getElementById('process-order').addEventListener('click', function() {
    let order = JSON.parse(localStorage.getItem('current-order')) || null;
    
    if (!order) {
      displayError('No order to process!');
      setTimeout(hideError, 3000);
      return;
    }

    order.status = 'Processed';
    localStorage.setItem('current-order', JSON.stringify(order));

    alert('Order processed faster!');
  });

  // Display Stack (Show Pending Orders)
  document.getElementById('display-stack').addEventListener('click', function() {
    let stack = JSON.parse(localStorage.getItem('stack')) || [];
    
    if (stack.length === 0) {
      displayError('No pending orders in the stack.');
      setTimeout(hideError, 3000);
      return;
    }

    let stackList = stack.map((order, index) => `Order #${index + 1}: ${order.items.length} items`).join('\n');
    
    alert(`Pending Orders:\n\n${stackList}`);
  });
});
