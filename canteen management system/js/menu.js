// menu.js

// Sample menu items
const menuItems = [
    {id: 1, name: " Smoothie", price: 90, category: "Drinks", image: "https://www.eatingwell.com/thmb/TBp6lbiwoYPhRP4N__4sROiUDhA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mixed-berry-breakfast-smoothie-7959466-1x1-e0ad2304222e49508cda7b73b21de921.jpg"},
    {id: 2, name: "Mango Lassi", price: 70, category: "Drinks", image: "https://beextravegant.com/wp-content/uploads/2023/06/DSC03864.jpg"},
    {id: 3, name: "Veg Sandwich", price: 75, category: "Snacks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mxPW-2W_xvjQBjAAn4Go4OGQVlTpCAU4nA&s"},
    {id: 4, name: "French Fries", price: 60, category: "Snacks", image: "https://static.toiimg.com/photo/54659021.cms"},
    {id: 5, name: "Paneer Curry", price: 150, category: "Main Course", image: "https://www.kitchensanctuary.com/wp-content/uploads/2024/03/Paneer-Curry-square-FS.jpg"},
    {id: 6, name: "Veg Biryani", price: 180, category: "Main Course", image: "https://www.chefkunalkapur.com/wp-content/uploads/2023/11/DSC07512-1300x731.jpg?v=1699167800"}
];

const menuContainer = document.getElementById('menu-items');
const categorySelect = document.getElementById('category');

// Display items based on category
function displayMenu(category){
    menuContainer.innerHTML = '';
    let filtered = menuItems;
    if(category !== 'All'){
        filtered = menuItems.filter(item => item.category === category);
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(card);
    });
}

// Add to Cart functionality
function addToCart(itemId){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = menuItems.find(i => i.id === itemId);
    const existing = cart.find(i => i.id === itemId);
    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({...item, quantity:1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast("Item added to cart!");
}

// Toast notification
function showToast(msg){
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Event listener for category filter
categorySelect.addEventListener('change', function(){
    displayMenu(this.value);
});

// Initial load
displayMenu('All');