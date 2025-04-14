document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-food-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('food-name').value.trim();
    const price = parseFloat(document.getElementById('food-price').value.trim());
    const category = document.getElementById('food-category').value;

    if (name && price && category) {
      const foodItem = { name, price, category };

      let menu = JSON.parse(localStorage.getItem('menu')) || [];
      menu.push(foodItem);
      localStorage.setItem('menu', JSON.stringify(menu));

      successMessage.classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 3000);
    }
  });
});
