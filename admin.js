document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('admin-login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === 'Jatin' && password === '1234') {
      // Redirect to Admin Dashboard
      window.location.href = 'admin-dashboard.html';
    } else {
      errorMessage.textContent = 'Invalid username or password. Please try again.';
      errorMessage.style.display = 'block';

      // Optional: Auto-hide the error after 3 seconds
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
    }
  });
});
