import React from "react";
import "./styles/ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/messages.png"
            alt="Profile 1"
          />
          <h2 className="message-text">Message</h2>
        </div>
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/portfolio.png "
            alt="Profile 2"
          />
          <h2 className="message-text">Portfolio</h2>
        </div>
        <div className="profile-section2">
          <img
            className="pic2"
            src="/Homepage art/commissions.png"
            alt="Profile 3"
          />
          <h2 className="message-text">Commissions</h2>
        </div>
        <div className="profile-section2">
          <img
            className="pic2"
            src="/Homepage art/collaborations.png"
            alt="Profile 4"
          />
          <h2 className="message-text">Collaborations</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
