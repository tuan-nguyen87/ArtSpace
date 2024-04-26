import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "./Firebase/Firebase.js";
import { signOut } from "firebase/auth";
import "./styles/NavigationBar.css";
import Notification from "./Notification";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*****Valerie's code for notifications begins here*********/ 
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const unsubscribe = db.collection("messages")
      .where("receiver", "==", auth.currentUser.email)
      .where("read", "==", false)
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => doc.data());
  
        // Create notification object for each new message
        newMessages.forEach(_ => {
          const notification = {
            message: "You have a new message",
            timestamp: new Date(),
            recipientId: auth.currentUser
          };
  
          // Store the notification in Firestore
          db.collection("notifications").add(notification)
            .then(() => {
              console.log("Notification added to Firestore");
            })
            .catch(error => {
              console.error("Error adding notification to Firestore: ", error);
            });
        });
  
        setHasNewMessage(newMessages.length > 0);
      });
  
    return () => unsubscribe();
  }, []);
  
  
  useEffect(() => {
    // Fetch notifications for the current user
    const unsubscribe = db
      .collection("notifications")
      .where("recipientId", "==", auth.currentUser)
      .orderBy("timestamp", "desc") // Order notifications by timestamp
      .onSnapshot(snapshot => {
        const fetchedNotifications = [];
        snapshot.forEach(doc => {
          fetchedNotifications.push({ id: doc.id, ...doc.data() });
        });
        setNotifications(fetchedNotifications);
      });

    return () => unsubscribe();
  }, []);

  /*****Valerie's code for notifications ends here*********/ 

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
              <li>
                <a href="/GalleryMarketPage">Gallery Market</a>
              </li>
            </ul>
          </li>
          <li className="notification-icon">
            <a href="#">🔔</a>
            {notifications.map(notification => (
              <Notification key={notification.id} message={notification.message} />
            ))}
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
                  <a href="/MyCommissions">My Commissions</a>
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
                  <a href="/Payment">Payment</a>
                </li>
                <li>
                  <a href="/" onClick={handleLogout}>
                    Log out
                  </a>
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
