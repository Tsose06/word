


/**Hamburger Call Action**/
const bar= document.getElementById('bar');
const close= document.getElementById('close');
const nav= document.getElementById('navbar');

if (bar){
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  })
}

if (close){
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector(".cart-container")) {
    displayProductDetail();
  }
});




const productContainer = document.querySelector(".js-newrelease-grid");
const isProductDetailPage = document.querySelector(".cart-container");
const isCartPage = document.querySelector(".cart-box");

if (productContainer) {
   displayProducts();
} else if (isProductDetailPage) {
  displayProductDetail();
} else if (isCartPage) {
  displayCart();
}

function displayProducts() {

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("sneaker-card");
    productCard.innerHTML = `
    <div class="sneaker-img">
                <img src="${product.image}" alt="${product.title}" class="sneaker-front">
                <img src="${product.image2}" alt="${product.title}" class="sneaker-hover">
            </div>
            <div class="sneaker-info">
                <h3>${product.title}</h3>
                <span class="oldPrice">R ${product.price2}</span>
                <span class="price">R ${product.price}</span>
                
            </div>
            <span class="sale-tag">Sale</span>
    `;
    productContainer.appendChild(productCard);

    const imgBox = productCard.querySelector(".sneaker-img");
    imgBox.addEventListener("click", () => {
      sessionStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product.html";
    });
  });
}

function displayProductDetail() {
  const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

  const titleEl = document.querySelector(".title");
  const priceEl = document.querySelector(".price");
  const oldPriceEl = document.querySelector(".oldPrice");
  const imageContainer = document.querySelector(".product-image");
  const sizeContainer = document.querySelector(".size-options");
  const addToCartBtn = document.querySelector("#add-cart-btn");

  let selectedSize = productData.sizes[0];

  function updateProductDisplay(product) {
    if (!product.sizes.includes(selectedSize)) {
      selectedSize = product.sizes[0];
    }

    imageContainer.innerHTML = `<img id="product-image" src="${product.image}">`;

    sizeContainer.innerHTML = "";
    product.sizes.forEach(size => {
      const btn = document.createElement("button");
      btn.textContent = size;
      if (size === selectedSize) btn.classList.add("selected");

      sizeContainer.appendChild(btn);

      btn.addEventListener("click", () => {
        document.querySelectorAll(".size-options button").forEach(el => el.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSize = size;
      });
    });
  }

  titleEl.textContent = productData.title;
  priceEl.textContent = productData.price;
  oldPriceEl.textContent = productData.price2;

  updateProductDisplay(productData);

  addToCartBtn.addEventListener("click", () => {
    addToCart(productData, selectedSize);
  });
}

function addToCart(product, size) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const popup = document.getElementById('popup');
      popup.style.display = 'block';
      
      // Reset animation by reflow
      popup.classList.remove('popup-animation');
      void popup.offsetWidth; // trigger reflow
      popup.classList.add('popup-animation');

      // Hide after animation ends
      setTimeout(() => {
        popup.style.display = 'none';
      }, 3000);


  const existingItem = cart.find(item => item.id === product.id && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
  showMiniCart();
}

function displayCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const cartItemsContainer = document.querySelector(".cart-items");
  const cartBox = document.querySelector(".cart-box");
  const subtotalEl = document.querySelector(".subtotal");
  const grandTotalEl = document.querySelector(".grand-total");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartBox.innerHTML = `<section class="cart-section">
        <h2>YOUR CART IS EMPTY</h2>
        <div class="view-all-container">
        <button class="continue-btn"><a href="newrelease.html">Continue Shopping</a></button>
    </div>
    </section>`;
  
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal =  item.price * item.quantity;
;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="product">
        <img src="${item.image}">
        <div class="item-detail">
          <p>${item.title}</p>
          <div class="size-box">
            <span class="size">Size: ${item.size}</span>
          </div>
        </div>
      </div>
      <span class="price">${item.price}</span>
      <div class="quantity"><input type="number" value="${item.quantity}" min="1" data-index="${index}"></div>
      <span class="total-price"> ${itemTotal.toFixed(2)}</span>
      <button class="remove" data-index="${index}"><i class='bx bx-message-alt-x remove-btn'></i></i></button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  subtotalEl.textContent = ` ${subtotal.toFixed(2)}`;
  grandTotalEl.textContent = `${subtotal.toFixed(2)}`;

  removeCartItem();
  updateCartQuantity();
}

function removeCartItem() {
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", function () {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartBadge();
    });
  });
}

function updateCartQuantity() {
  document.querySelectorAll(".quantity input").forEach(input => {
    input.addEventListener("change", function () {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart[index].quantity = parseInt(this.value);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartBadge();
    });
  });
}

function updateCartBadge() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.querySelector(".cart-count");

  if (badge) {

    if(cartCount){ badge.textContent = cartCount;
    badge.style.display =  "block";}
   
  else{
badge.style.display =  "none";
  }
}}

updateCartBadge();


function showMiniCart() {
  const miniCart = document.getElementById("mini-cart");
  const miniCartItems = miniCart.querySelector(".mini-cart-items");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  miniCartItems.innerHTML = "";

  const lastThree = cart.slice(-3).reverse();

  lastThree.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <p>${item.title}</p>
        <span>R ${item.price} - Size: ${item.size}</span>
      </div>
    `;
    miniCartItems.appendChild(li);
  });

  miniCart.classList.add("show");

 
}
