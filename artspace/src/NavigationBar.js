import React, { useState } from "react";
import "./styles/NavigationBar.css";

const NavigationBar = () => {

  const [isLoginPopupActive, setIsLoginPopupActive] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginPopupActive(!isLoginPopupActive);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Login logic goes here

    if (username === "admin" && password === "password") {
      alert("Login successful!");
      // Additional logic can be added here
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Registration logic goes here

    if (username && email && password) {
      alert("Registration successful!");
      // Additional logic can be added here
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div class="NavComponents">
      <nav>
        <img
          src="/Homepage art/logo-modified.png"
          alt="Logo"
          className="logo"
        />
        <ul className="nav-links">
          <li>
            <a href="#">Explore</a>
            <ul className="dropdown-menu">
              <li>
                <a href="/TutorialPage">Tutorial</a>
              </li>
              <li>
                <a href="/Commissions">Commission Listings</a>
              </li>
              <li>
                <a href="/ShowroomPage">Show Room</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Interact</a>
            <ul className="dropdown-menu">
              <li>
                <a href="/DailyChallenge">Daily Challenges</a>
              </li>
              <li>
                <a href="/ArtistArena">Arena</a>
              </li>
              <li>
                <a href="/SocialHub">Social Hub</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Market</a>
          </li>
          <li className="notification-icon">
            {/* you could replace this icon '🔔' with another one of ur choice */}
            <a href="#">🔔</a>
            <ul className="dropdown-menu">
              <li><a href="#">Notification 1</a></li>
              <li><a href="#">Notification 2</a></li>
            </ul> 
          </li>
          <button className="btnLogin-popup" onClick={toggleLoginPopup}>
            Login
          </button>
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
                <a href="/Portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#">Commissions</a>
              </li>
              <li>
                <a href="/Messaging2">Messages</a>
              </li>
              <li>
                <a href="#">Collaborations</a>
              </li>
              <li>
                <a href="/RatingReview">Leave a Review</a>
              </li>
            </ul>
          </li>
        </ul>
        
      </nav>
      <div className={`wrapper ${isLoginPopupActive ? "active-popup" : ""}`}>
        {isLoginPopupActive ? (
          <form onSubmit={handleLogin}>
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
          </form>
        ) : (
          <form onSubmit={handleRegistration}>
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
                    <br />
                    <input type="checkbox" />
                    Are you an artist?
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
          </form>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
