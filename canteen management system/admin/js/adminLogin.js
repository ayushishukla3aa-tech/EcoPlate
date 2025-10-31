// adminLogin.js

const loginForm = document.getElementById('adminLoginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

// Hard-coded admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Handle login
loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    usernameError.innerText = '';
    passwordError.innerText = '';

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;

    if(username === '') { usernameError.innerText = "Username required"; valid = false; }
    if(password === '') { passwordError.innerText = "Password required"; valid = false; }
    if(!valid) return;

    if(username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password){
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        passwordError.innerText = "Invalid credentials";
    }
});