document.addEventListener("DOMContentLoaded", function () {
  // Select order summary containers
  const summaryContainer = document.querySelector(".checkout-summary");
  const orderItemContainer = summaryContainer.querySelector(".order-details");
  const totalText = summaryContainer.querySelector(".summary-total");
  const payfastAmountInput = document.querySelector('#payfast-form input[name="amount"]');

  // Get the cart from sessionStorage
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  let total = 0;

  // If cart is empty
  

  // Loop through cart and build summary HTML
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const itemHTML = `
      <div class="checkout-item" style="display: flex;  margin-bottom: 12px;">
        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; margin-right:5px;">
        <div>
          <strong>${item.title}</strong><br>
          <small>R ${item.price} × ${item.quantity}</small><br>
          <small>Subtotal: R ${subtotal.toFixed(2)}</small>
        </div>
      </div>
    `;

    orderItemContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  // Display the total
  totalText.innerHTML = `R ${total.toFixed(2)}`;

  // Set PayFast hidden input amount
  if (payfastAmountInput) {
    payfastAmountInput.value = total.toFixed(2);
  }
});
