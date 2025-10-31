// cart.js

const cartContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');

// Load cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items
function renderCart() {
    cartContainer.innerHTML = '';
    if(cart.length === 0){
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceEl.innerText = '0';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></p>
            </div>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateTotal();
}

// Update quantity
function updateQuantity(index, value){
    cart[index].quantity = parseInt(value);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotal();
}

// Remove item
function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    showToast("Item removed from cart");
}

// Update total price
function updateTotal(){
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalPriceEl.innerText = total;
}

// Checkout
checkoutBtn.addEventListener('click', function(){
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderId = orders.length + 1;
    const date = new Date().toLocaleString();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    orders.push({orderId, items: cart, total, date});
    localStorage.setItem('orders', JSON.stringify(orders));

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    alert("Order placed successfully!");
});

// Toast
function showToast(msg){
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Initial render
renderCart();