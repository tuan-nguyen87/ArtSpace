import React from "react";
import "./styles/ProfilePage.css";
/* main component of this page, it will be split into 4 quadrant. each with pictures and links to different part of website */
// Collaboration still have waiting on links, page is not created.
const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-section">
        <img className="pic" src="/Homepage art/messages.png" alt="Profile 1" />
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
        <img className="pic" src="/Homepage art/for_sale.png" alt="Profile 5" />
      </div>
    </div>
  );
};

export default ProfilePage;
