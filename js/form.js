// Check if we're on the redirected page//
  window.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');

    // If redirected with #form-confirmation in the URL
    if (window.location.hash === '#form-confirmation') {
      // Clear the form
      form.reset();

      // Optionally show a confirmation message
      const confirmation = document.createElement('p');
      confirmation.textContent = "Thank you for your feedback!";
      confirmation.style.color = "green";
      confirmation.style.marginTop = "10px";
      form.appendChild(confirmation);
    }
  });

