import React, { useState } from "react";
import "./styles/NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="NavComponents">
      <nav>
        <a href="/">
          <img
            src="/Homepage art/logo-modified.png"
            alt="Logo"
            className="logo"
          />
        </a>
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
            <ul className="dropdown-menu">
              <li>
                <a href="/MarketPage">Market</a>
              </li>
            </ul>
          </li>
          <li className="notification-icon">
            {/* you could replace this icon '🔔' with another one of ur choice */}
            <a href="#">🔔</a>
            <ul className="dropdown-menu">
              <li>
                <a href="#">Notif 1</a>
              </li>
              <li>
                <a href="#">Notif 2</a>
              </li>
            </ul>
          </li>
          <li>
            <img
              src="/Homepage art/login_profile_img.png"
              alt="Profile"
              className="profile"
            />
            <ul className="profile-menu">
              <li>
                <a href="/ProfilePage">Profile</a>
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
              <li>
                <a href="/LoginPage">Login/Register</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
