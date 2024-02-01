// src/components/NavigationBar.js
import React, { useState } from "react";

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
              <a href="#">Commission Listings</a>
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
              <a href="#">Messages</a>
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

export default NavigationBar;
