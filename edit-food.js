document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('edit-food-form');
  const message = document.getElementById('message');

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const foodID = document.getElementById('food-id').value.trim();
    const foodPrice = document.getElementById('food-price').value.trim();
    const foodCategory = document.getElementById('food-category').value;

    if (foodID === '' || foodPrice === '' || foodCategory === '') {
      message.textContent = 'Please fill in all fields.';
      message.classList.add('error');
    } else {
      // Assuming there is a localStorage for the food items
      const foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

      const updatedFoodItem = {
        name: foodID,
        price: parseFloat(foodPrice),
        category: foodCategory
      };

      // Check if food item already exists, and update it
      const foodIndex = foodItems.findIndex(item => item.name === foodName);
      if (foodIndex !== -1) {
        foodItems[foodIndex] = updatedFoodItem;
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        message.textContent = 'Food item updated successfully!';
        message.classList.remove('error');
      } else {
        message.textContent = 'Food item not found.';
        message.classList.add('error');
      }
    }
  });
});
