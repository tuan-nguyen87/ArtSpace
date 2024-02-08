import React from "react";
import "./styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
       <div className="header">
         <img src="images/logo-modified.png" alt="ArtLogo" class="ArtLogo" />
         <nav class="navigation">
           <a href="#">Home</a>
           <a href="#">About</a>
           <a href="#">Explore</a>
           <a href="#">Contact</a>
           <button class="btnLogin-popup">Login</button>
         </nav>
      </div>
      <div class="main"> 
        <section class="welcome">
          <h1>Connecting Artists to Clients Everywhere</h1>
          <input type="text" class="search" placeholder="Search ArtSpace" />
          <i class="bx bx-search"></i>
        </section>
        <section class="services">
          <h2>Popular:</h2>
          <button type="submit" class="btns">
            Logo Design
          </button>
          <button type="submit" class="btns">
            Flyers
          </button>
          <button type="submit" class="btns">
            Business Cards
          </button>
        </section>
      </div>

      <div class="wrapper"> 
        <span class="icon-close">
          <i class="bx bx-x"></i>
        </span>

        <div class="form-box login">
          <h2>Login</h2>
          <form action="#">
            <div class="input-box">
              <input type="text" placeholder="Username" required />
              <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" class="btn">
              Login
            </button>

            <div class="login-register">
              <p>
                {" "}
                Don't have an account?
                <a href="#" class="register-link">
                  Create Account
                </a>
              </p>
            </div>
          </form>
        </div>

        <div class="form-box register">
          <h2>Registration</h2>
          <form action="#">
            <div class="input-box">
              <input type="text" placeholder="Username" required />
              <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
              <input type="email" placeholder="Email" required />
              <i class="bx bx-envelope"></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="remember-forgot">
              <label>
                <input type="checkbox" />I agree to the terms & conditions
                <br></br>
                <input type="user-type" />Are you an artist?
              </label>
            </div>
            <button type="submit" class="btn">
              Register
            </button>

            <div class="login-register">
              <p>
                {" "}
                Already have an account?
                <a href="#" class="login-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* const wrapper = document.querySelector('.wrapper');
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

      const loginForm = document.querySelector('.login form');
      const registerForm = document.querySelector('.register form');

      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        // Login logic goes here
        // You can use AJAX or fetch to send the data to the server

        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            wrapper.classList.remove('active-popup');
        } else {
            alert('Invalid username or password.');
        }
      });

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.username.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;

        // Registration logic goes here
        // You can use AJAX or fetch to send the data to the server

        if (username && email && password) {
            alert('Registration successful!');
            wrapper.classList.remove('active');
        } else {
            alert('Please fill in all fields.');
        }
      }); */}
    </div>
  );
  
};

export default LandingPage;
