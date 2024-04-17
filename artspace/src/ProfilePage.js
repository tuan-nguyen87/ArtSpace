import React, { useState, useEffect } from "react";
import "./styles/ProfilePage.css";
import { db } from "./Firebase/Firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

const ProfilePage = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const initialUserName = "Guest"; // Initial value for username if not available

  useEffect(() => {
    const userUid = "user_uid"; // Replace with the UID of the currently signed-in user

    const unsubscribe = onSnapshot(doc(db, "Portfolio", userUid), (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setUserName(userData.name || initialUserName);
      } else {
        console.log("No such document!");
        setUserName(initialUserName); // Set default name if document does not exist
      }
    });

    return () => unsubscribe();
  }, []); // Run this effect only once, when the component mounts

  return (
    <div className="profile-container">
      <h2 className="username_profile">
        {userName ? `Welcome, ${userName}!` : "Welcome!"}
      </h2>
      <div className="profile-page">
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/messages.png"
            alt="Profile 1"
          />
        </div>
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/portfolio.png "
            alt="Profile 2"
          />
        </div>
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/commissions.png"
            alt="Profile 3"
          />
        </div>
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/collaborations.png"
            alt="Profile 4"
          />
        </div>
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/for_sale.png"
            alt="Profile 5"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
