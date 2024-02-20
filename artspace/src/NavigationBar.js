import React, { useState } from "react";
import "./styles/NavigationBar.css";

const NavigationBar = () => {
  const [isLoginPopupActive, setIsLoginPopupActive] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginPopupActive(!isLoginPopupActive);
  };

  return (
    <nav>
      <img src="/Homepage art/logo-modified.png" alt="Logo" className="logo" />
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
          
          {/* <ul className="dropdown-menu">
            <li><a href="#">Notification 1</a></li>
            <li><a href="#">Notification 2</a></li>
            {/* ... */}
          {/* </ul> */}
        </li>
        <li>
          <button className="btnLogin-popup" onClick={toggleLoginPopup}>
            Login
          </button>
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
            <li>
              <a href="/RatingReview">Leave a Review</a>
            </li>
          </ul>
        </li>
      </ul>

      {isLoginPopupActive && (
        <div className="login-popup">
          <form>
            <h2 className="login-text">Login</h2>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </label>

            <button className="btn-login" type="submit">
              Login
            </button>
            <p className="dont-have-account">
              Don't have an account?
              <a className="create-account" href="#">
                Create Account
              </a>
            </p>
          </form>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;