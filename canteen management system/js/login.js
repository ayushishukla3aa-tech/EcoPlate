// login.js

// Get elements
const loginForm = document.getElementById('loginForm');
const signupBtn = document.getElementById('signupBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Simple email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Load users from LocalStorage or initialize empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Login form submit
loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;

    if(email === ''){
        emailError.innerText = "Email is required";
        valid = false;
    } else if(!emailRegex.test(email)){
        emailError.innerText = "Enter a valid email";
        valid = false;
    }

    if(password === ''){
        passwordError.innerText = "Password is required";
        valid = false;
    }

    if(!valid) return;

    // Check if user exists
    const user = users.find(u => u.email === email && u.password === password);
    if(user){
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'menu.html';
    } else {
        passwordError.innerText = "Invalid email or password";
    }
});

// Sign up button
signupBtn.addEventListener('click', function(){
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;

    if(email === ''){
        emailError.innerText = "Email is required";
        valid = false;
    } else if(!emailRegex.test(email)){
        emailError.innerText = "Enter a valid email";
        valid = false;
    }

    if(password === ''){
        passwordError.innerText = "Password is required";
        valid = false;
    }

    if(!valid) return;

    // Check if user already exists
    const userExists = users.some(u => u.email === email);
    if(userExists){
        emailError.innerText = "User already exists. Please login.";
        return;
    }

    // Save user to LocalStorage
    const newUser = {email, password};
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    window.location.href = 'menu.html';
});

// Clear errors
function clearErrors(){
    emailError.innerText = '';
    passwordError.innerText = '';
}