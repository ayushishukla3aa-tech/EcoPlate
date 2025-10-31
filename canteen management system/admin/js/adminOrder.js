// adminOrders.js

// --- Ensure admin is logged in ---
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'index.html'; // Redirect to admin login
}

// --- Logout functionality ---
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
});

const ordersTableBody = document.querySelector('#ordersTable tbody');
const statusFilter = document.getElementById('statusFilter');
const toast = document.getElementById('toast');

// --- Load orders from LocalStorage ---
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// --- Render Orders ---
function renderOrders(filter = "All") {
    ordersTableBody.innerHTML = '';

    let filteredOrders = orders;
    if (filter !== "All") {
        filteredOrders = orders.filter(order => order.status === filter);
    }

    filteredOrders.forEach(order => {
        const row = document.createElement('tr');

        // Build items list
        const itemsList = order.items.map(i => '${i.name} × ${i.quantity}').join(', ');

        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.userName || 'Guest'}</td>
            <td>${itemsList}</td>
            <td>₹${order.total}</td>
            <td>
                <select class="statusSelect" data-id="${order.orderId}">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>${order.date}</td>
        `;
        ordersTableBody.appendChild(row);
    });

    // Attach event listeners to dropdowns AFTER rendering
    document.querySelectorAll('.statusSelect').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            updateStatus(orderId, e.target.value);
        });
    });
}

// --- Update Order Status ---
function updateStatus(orderId, newStatus) {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        showToast('Order #${orderId} status updated to ${newStatus}');
    }
}

// --- Toast Notification ---
function showToast(msg) {
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- Filter Orders ---
statusFilter.addEventListener('change', () => {
    renderOrders(statusFilter.value);
});

// --- Ensure all orders have a status ---
orders = orders.map(o => ({ ...o, status: o.status || 'Pending' }));
localStorage.setItem('orders', JSON.stringify(orders));

// --- Initial Render ---
renderOrders();