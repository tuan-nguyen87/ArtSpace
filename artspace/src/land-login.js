const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginPopup = document.querySelector('.btnLogin-popup');
const loginClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

loginPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});
loginClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Login logic goes here
    // You can use AJAX or fetch to send the data to the server
  
    if(username === "admin" && password === "password") {
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  }