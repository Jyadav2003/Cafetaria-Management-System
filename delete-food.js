document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('delete-food-form');
  const message = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const foodName = document.getElementById('food-name').value.trim();

    if (foodName === '') {
      message.textContent = 'Please provide a food name.';
      message.classList.add('error');
    } else {
      const foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

      const foodIndex = foodItems.findIndex(item => item.name === foodName);
      if (foodIndex !== -1) {
        foodItems.splice(foodIndex, 1); // Remove the item
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        message.textContent = 'Food item deleted successfully!';
        message.classList.remove('error');
      } else {
        message.textContent = 'Food item not found.';
        message.classList.add('error');
      }
    }
  });
});
