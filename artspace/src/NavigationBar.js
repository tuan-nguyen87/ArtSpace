// src/components/NavigationBar.js
import React from "react";
import "./styles/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav>
      <img src="/Homepage art/logo.png" alt="Logo" className="logo" />
      <ul className="nav-links">
        <li>
          <a href="#">Explore</a>
          <ul className="dropdown-menu">
            <li>
              <a href="#">Tutorial</a>
            </li>
            <li>
              <a href="/Commissions">Commission Listings</a>
            </li>
            <li>
              <a href="#">Show Room</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Interact</a>
          <ul className="dropdown-menu">
            <li>
              <a href="#">Daily Challenges</a>
            </li>
            <li>
              <a href="#">Arena</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Market</a>
        </li>
        <li>
          <img
            src="/Homepage art/login_profile_img.png"
            alt="Profile"
            className="profile"
          />
          <ul className="profile-menu">
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Commissions</a>
            </li>
            <li>
              <a href="/MessagingPage">Messages</a>
            </li>
            <li>
              <a href="#">Collaborations</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
// need to integrate to have working pop-up button
// const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');
// const loginPopup = document.querySelector('.btnLogin-popup');
// const loginClose = document.querySelector('.icon-close');

// registerLink.addEventListener('click', ()=> {
//     wrapper.classList.add('active');
// });

// loginLink.addEventListener('click', ()=> {
//     wrapper.classList.remove('active');
// });

// loginPopup.addEventListener('click', ()=> {
//     wrapper.classList.add('active-popup');
// });

// loginClose.addEventListener('click', ()=> {
//     wrapper.classList.remove('active-popup');
// });

// const loginForm = document.querySelector('.login form');
// const registerForm = document.querySelector('.register form');

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const username = loginForm.username.value;
//   const password = loginForm.password.value;

//   // Login logic goes here
//   // You can use AJAX or fetch to send the data to the server

//   if (username === 'admin' && password === 'password') {
//       alert('Login successful!');
//       wrapper.classList.remove('active-popup');
//   } else {
//       alert('Invalid username or password.');
//   }
// });

// registerForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const username = registerForm.username.value;
//   const email = registerForm.email.value;
//   const password = registerForm.password.value;

//   // Registration logic goes here
//   // You can use AJAX or fetch to send the data to the server

//   if (username && email && password) {
//       alert('Registration successful!');
//       wrapper.classList.remove('active');
//   } else {
//       alert('Please fill in all fields.');
//   }
// });
export default NavigationBar;
