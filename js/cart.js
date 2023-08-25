// Get the product list element
const productList = document.getElementById("product-list");

// Get the cart list element
const cartList = document.getElementById("cart-list");

// Get the total price element
const totalPrice = document.getElementById("total-price");

// Get the checkout button element
const checkoutBtn = document.getElementById("checkout-btn");

// Set up an empty cart array
let cart = [];

// Function to add a product to the cart
function addToCart(event) {
  // Get the product ID from the data-id attribute
  const productId = event.target.dataset.id;

  // Find the product with the matching ID
  const product = products.find((p) => p.id == productId);

  // Check if the product is already in the cart
  const cartItem = cart.find((item) => item.product.id == productId);

  if (cartItem) {
    // If the product is already in the cart, increase the quantity
    cartItem.quantity++;
  } else {
    // If the product is not in the cart, add it
    cart.push({
      product: product,
      quantity: 1
    });
  }

  // Update the cart list and total price
  updateCart();
}

// Function to remove a product from the cart
function removeFromCart(event) {
  // Get the index of the cart item to remove
  const index = event.target.dataset.index;

  // Remove the cart item from the cart array
  cart.splice(index, 1);

  // Update the cart list and total price
  updateCart();
}

// Function to update the cart list and total price
function updateCart() {
  // Clear the cart list element
  cartList.innerHTML = "";

  // Loop through the cart array and add each item to the cart list
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <h3>${item.product.name}</h3>
      <p>Price: $${item.product.price.toFixed(2)}</p>
      <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1">
      <button class="remove-from-cart-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Calculate the total price and update the total price element
  const total = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);
  totalPrice.innerText = `Total Price: $${total.toFixed(2)}`;
}

// Function to handle changes to the quantity input in the cart
function handleQuantityChange(event) {
  // Get the index of the cart item to update
  const index = event.target.parentElement.dataset.index;

  // Update the quantity in the cart array
  cart[index].quantity = parseInt(event.target.value);

  // Update the cart list and total price
  updateCart();
}

// Function to handle the checkout button click
function handleCheckoutClick() {
  // Display an alert with the total price
  const total = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);
  alert(`Your total is $${total.toFixed(2)}. Thank you for your purchase!`);

  // Clear the cart array and update the cart list and total price
  cart = [];
  updateCart();
}

// Add event listeners to the add-to-cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});


