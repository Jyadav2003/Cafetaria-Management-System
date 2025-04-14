// Function to get the cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update item quantity
function updateQuantity(itemName, change) {
    let cart = getCart();
    const item = cart.find(i => i.name === itemName);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== itemName);
        }
    }

    saveCart(cart);
    displayCart();
}

// Function to display cart in the order page
function displayCart() {
    const cart = getCart();
    const cartTableBody = document.getElementById('cart-table-body');
    cartTableBody.innerHTML = ''; // Clear previous entries

    let total = 0;

    cart.forEach((item) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `₹${item.price}`;
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        const qtyUpdate = document.createElement('div');
        qtyUpdate.classList.add('quantity');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateQuantity(item.name, -1);
        qtyUpdate.appendChild(minusButton);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;
        qtyUpdate.appendChild(quantityDisplay);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(item.name, 1);
        qtyUpdate.appendChild(plusButton);

        quantityCell.appendChild(qtyUpdate);
        row.appendChild(quantityCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = `₹${item.price * item.quantity}`;
        row.appendChild(totalCell);

        cartTableBody.appendChild(row);

        total += item.price * item.quantity;
    });

    // Display total price
    document.getElementById('total-price').textContent = `Total: ₹${total}`;
}

// Function to handle the order form submission
document.getElementById('customer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve customer details from the form
    const customerName = document.getElementById('name').value;
    const customerPhone = document.getElementById('phone').value;
    const customerAddress = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Retrieve cart items from localStorage
    const cart = getCart();

    // Calculate the total price from the cart items
    const totalPrice = calculateTotalPrice(cart);

    // Check if the cart is empty or total price is 0
    if (cart.length === 0 || totalPrice === 0) {
        alert("Your cart is empty or total price is zero. Please add items to your cart.");
        return; // Prevent further execution
    }

    // Generate order object with Items and Total Price
    const orderId = 'TXN' + Date.now();
    const date = new Date().toLocaleString();
    const status = Math.random() > 0.1 ? 'Success' : 'Failed'; // 90% success

    const newOrder = {
        transactionId: orderId,
        customerName,
        customerPhone,
        customerAddress,
        paymentMethod,
        cartItems: cart,
        totalPrice: totalPrice,
        status,
        date
    };

    // Optionally, store the order in localStorage or send it to a server
    console.log("Order placed:", newOrder);

    // Save the order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart after order is placed
    saveCart([]);

    // Redirect to payment page if UPI or Credit/Debit Card is selected
    if (paymentMethod === 'UPI' || paymentMethod === 'Credit/Debit Card') {
        localStorage.setItem('currentOrder', JSON.stringify(newOrder)); // Save order for payment
        window.location.href = "payment.html"; // Redirect to payment page
    } else {
        // Handle Cash on Delivery: Confirm order without redirection
        alert("Order placed successfully! Your order will be processed.");
        window.location.href = "index.html"; // Redirect to homepage
    }
});

// Function to calculate total price from cart items
function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to show the payment receipt (to be shown on order page if necessary)
function showPaymentReceipt(order) {
    const receiptContainer = document.getElementById('receipt-container');
    
    receiptContainer.innerHTML = ` 
        <h3>Payment Receipt</h3>
        <p><strong>Order ID:</strong> ${order.transactionId}</p>
        <p><strong>Customer Name:</strong> ${order.customerName}</p>
        <p><strong>Address:</strong> ${order.customerAddress}</p>
        <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Order Date:</strong> ${order.date}</p>
    `;
}

// Call this function to display the cart when the page loads
document.addEventListener('DOMContentLoaded', displayCart);
