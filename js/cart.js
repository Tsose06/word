
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      // Optional: prevent default if it's a <form> button
      // e.preventDefault();

      // Optional: validate cart or show alert
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Redirect to checkout
      window.location.href = "checkout.html";
    });
  }
});

