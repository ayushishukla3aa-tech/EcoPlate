// adminMenu.js

// Redirect if not logged in
if(localStorage.getItem('adminLoggedIn') !== 'true'){
    window.location.href = 'index.html';
}

// Logout
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
});

let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

// DOM Elements
const menuTableBody = document.querySelector('#menuTable tbody');
const addNewItemBtn = document.getElementById('addNewItemBtn');
const itemFormContainer = document.getElementById('itemFormContainer');
const itemForm = document.getElementById('itemForm');
const formTitle = document.getElementById('formTitle');
const toast = document.getElementById('toast');

let editIndex = null;

// Render menu items
function renderMenu() {
    menuTableBody.innerHTML = '';
    menuItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.category}</td>
            <td><button onclick="editItem(${index})">Edit</button></td>
            <td><button onclick="deleteItem(${index})">Delete</button></td>
        `;
        menuTableBody.appendChild(row);
    });
}

// Show toast notification
function showToast(msg){
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Show form
addNewItemBtn.addEventListener('click', () => {
    itemFormContainer.classList.remove('hidden');
    formTitle.innerText = "Add New Item";
    itemForm.reset();
    editIndex = null;
});

// Cancel button
document.getElementById('cancelBtn').addEventListener('click', () => {
    itemFormContainer.classList.add('hidden');
});

// Save or update item
itemForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('itemName').value.trim();
    const price = parseFloat(document.getElementById('itemPrice').value.trim());
    const category = document.getElementById('itemCategory').value;
    const image = document.getElementById('itemImage').value.trim();

    if(editIndex !== null){
        // Edit item
        menuItems[editIndex] = {name, price, category, image};
        showToast("Item updated successfully!");
    } else {
        // Add new item
        menuItems.push({name, price, category, image});
        showToast("Item added successfully!");
    }

    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    renderMenu();
    itemFormContainer.classList.add('hidden');
});

// Edit item
function editItem(index){
    const item = menuItems[index];
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemImage').value = item.image;
    formTitle.innerText = "Edit Item";
    itemFormContainer.classList.remove('hidden');
    editIndex = index;
}

// Delete item
function deleteItem(index){
    if(confirm("Are you sure you want to delete this item?")){
        menuItems.splice(index, 1);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        renderMenu();
        showToast("Item deleted successfully!");
    }
}

// Initial render
renderMenu();