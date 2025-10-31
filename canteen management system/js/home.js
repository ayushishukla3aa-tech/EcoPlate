// home.js

// Sample featured items
const featuredItems = [
    {id: 1, name: "Organic Green Salad", price: 120, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7rxgZ_EPrM1wSRBZ9fKibVOBnaKRF-te8Rg&s"},
    {id: 2, name: "Fresh Fruit Smoothie", price: 90, image: "https://www.antesite.com/cdn/shop/articles/Design_sans_titre_13_4667d428-da18-4c92-8d38-9523cd738382.jpg?v=1750803260&width=1080"},
    {id: 3, name: "Veg Sandwich", price: 75, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5  mxPW-2W_xvjQBjAAn4Go4OGQVlTpCAU4nA&s"}
];

const featuredContainer = document.getElementById('featured-items');

function displayFeatured() {
    featuredContainer.innerHTML = '';
    featuredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        featuredContainer.appendChild(card);
    });
}

// Add to cart functionality
function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = featuredItems.find(i => i.id === itemId);
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

displayFeatured();