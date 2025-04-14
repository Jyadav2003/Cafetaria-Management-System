// Initialize cart if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the quantity of items
function updateQuantity(itemName, change) {
    const quantityElement = document.getElementById(itemName + '-quantity');
    let quantity = parseInt(quantityElement.innerText);

    quantity += change;

    if (quantity < 0) quantity = 0; // Ensure quantity doesn't go below 0
    quantityElement.innerText = quantity;
}

// Function to show the toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Function to add item to the cart
function addToCart(itemName, price) {
    const quantityElement = document.getElementById(itemName + '-quantity');
    const quantity = parseInt(quantityElement.innerText);

    // Check if quantity is greater than 0
    if (quantity > 0) {
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === itemName);
        
        if (existingItem) {
            // If the item exists, update the quantity
            existingItem.quantity += quantity;
        } else {
            // If the item doesn't exist, add a new item to the cart
            cart.push({
                name: itemName,
                price: price,
                quantity: quantity
            });
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show the toast notification
        showToast(`${itemName} added to cart!`);
    } else {
        showToast('Please select a quantity greater than 0.');
    }
}
