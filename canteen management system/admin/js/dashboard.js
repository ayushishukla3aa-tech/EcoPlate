// dashboard.js

// --- Ensure admin is logged in ---
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}

// --- Logout functionality ---
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
});

// --- Fetch Data from LocalStorage ---
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

// --- Calculate Summary ---
const totalOrders = orders.length;
const totalUsers = users.length;
const totalMenuItems = menuItems.length;
const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

// Update Dashboard UI
document.getElementById('totalOrders').innerText = totalOrders;
document.getElementById('totalUsers').innerText = totalUsers;
document.getElementById('totalMenuItems').innerText = totalMenuItems;
document.getElementById('totalRevenue').innerText ='₹${totalRevenue}' ;