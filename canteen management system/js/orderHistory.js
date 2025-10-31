// orderHistory.js

const ordersContainer = document.getElementById('orders-container');
const toast = document.getElementById('toast');

// Load orders from LocalStorage
const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Render orders
function renderOrders() {
    ordersContainer.innerHTML = '';
    if(orders.length === 0){
        ordersContainer.innerHTML = '<p>No orders yet.</p>';
        return;
    }

    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        let itemsList = '<ul class="order-items">';
        order.items.forEach(item => {
            itemsList += <li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>;
        });
        itemsList += '</ul>';

        orderCard.innerHTML = `
            <h3>Order #${order.orderId}</h3>
            ${itemsList}
            <p><strong>Total: ₹${order.total}</strong></p>
            <p>Date: ${order.date}</p>
            <button onclick="reorder(${order.orderId})">Reorder</button>
        `;
        ordersContainer.appendChild(orderCard);
    });
}

// Reorder: add items back to cart
function reorder(orderId){
    const order = orders.find(o => o.orderId === orderId);
    if(!order) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    order.items.forEach(item => {
        const existing = cart.find(c => c.id === item.id);
        if(existing){
            existing.quantity += item.quantity;
        } else {
            cart.push({...item});
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast("Items added to cart!");
}

// Toast notification
function showToast(msg){
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Initial render
renderOrders();