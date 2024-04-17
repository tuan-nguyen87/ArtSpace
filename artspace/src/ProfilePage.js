import React, { useState, useEffect } from "react";
import "./styles/ProfilePage.css";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./Firebase/Firebase.js";

const ProfilePage = () => {
  const [userName, setUserName] = useState(""); // Default value while fetching

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userDocRef = doc(db, "Portfolio", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("User data:", userData); // Log the retrieved user data
            setUserName(userData.name); // Set the user's name from Firestore
          } else {
            setUserName("Guest"); // Use default name if document doesn't exist
          }
        } else {
          setUserName("Guest"); // Use default name if user is not logged in
        }
      } catch (error) {
        setUserName("Guest"); // Use default name if an error occurs
      }
    });

    return () => unsubscribe();
  }, []);

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
