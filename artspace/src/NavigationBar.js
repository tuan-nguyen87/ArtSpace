import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./Firebase/Firebase.js";
import { signOut } from "firebase/auth";
import "./styles/NavigationBar.css";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="NavComponents">
      <nav>
        {/* Turned the logo into a quick path to the landing page --Yasmine */}
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
            {/* Replace this with your notification icon */}
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
          {!isLoggedIn ? (
            // Render login button for non-logged-in user
            <li>
              <Link to="/LoginPage" className="login-btn">
                Login/Register
              </Link>
            </li>
          ) : (
            // Render profile menu for logged-in user
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
                  <a href="/Collaborations">Collaborations</a>
                </li>
                <li>
                  <a href="/PointSystem">My Points</a>
                </li>
                <li>
                  <a href="/RatingReview">Leave a Review</a>
                </li>
                <li>
                  <a href="/Queue">Queue</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
