// src/components/NavigationBar.js
import React from "react";

const NavigationBar = () => {
  return (
    <nav>
      <img src="/Homepage art/logo.png" alt="Logo" className="logo" />
      <ul className="nav-links">
        <li>
          <a href="#">Explore</a>
          <ul class="dropdown-menu">
            <li>
              <a href="#">Tutorial</a>
            </li>
            <li>
              <a href="#">Commission Listings</a>
            </li>
            <li>
              <a href="#">Show Room</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Interact</a>
          <ul class="dropdown-menu">
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
      </ul>
      <img
        src="/Homepage art/login_profile_img.png"
        alt="Profile"
        className="profile"
      />
    </nav>
  );
};

export default NavigationBar;
