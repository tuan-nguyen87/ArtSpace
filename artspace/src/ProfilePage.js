import React from "react";
import "./styles/ProfilePage.css";
/* main component of this page, it will be split into 4 quadrant. each with pictures and links to different part of website */
// Collaboration still have waiting on links, page is not created.
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
          <a href="/Messaging2" className="message-text">
            Messages
          </a>
        </div>
        <div className="profile-section">
          <img
            className="pic"
            src="/Homepage art/portfolio.png "
            alt="Profile 2"
          />
          <a href="/Portfolio" className="message-text">
            Portfolio
          </a>
        </div>
        <div className="profile-section2">
          <img
            className="pic2"
            src="/Homepage art/commissions.png"
            alt="Profile 3"
          />
          <a href="/Commissions" className="message-text">
            Commissions
          </a>
        </div>
        <div className="profile-section2">
          <img
            className="pic2"
            src="/Homepage art/collaborations.png"
            alt="Profile 4"
          />
          <a href="#" className="message-text">
            Collaborations
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
