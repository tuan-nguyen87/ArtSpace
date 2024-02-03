import React from "react";
// import user1Img from "./user1.jpg"; // Import user1.jpg and other images
// import img1 from "./img1.jpg";
// import img2 from "./img2.jpg";
import "./styles/msg.css";
// Import other images as needed

const MessagingPage = () => {
  return (
    <div className="container">
      <div className="leftSide">
        <div className="header">
          <div className="userimg">
            {/* add images here and link */}
            {/* <img src={user1Img} className="cover" alt="User 1" /> */}
          </div>
          <ul className="nav_icons">
            <li>
              <ion-icon name="scan-circle-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="chatbox"></ion-icon>
            </li>
            <li>
              <ion-icon name="ellipsis-vertical"></ion-icon>
            </li>
          </ul>
        </div>
        <div className="search_chat">
          <div>
            <input type="text" placeholder="Search or start new chat" />
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </div>
        {/* Add other chat list blocks here */}
      </div>
      <div className="rightSide">
        {/* Add other components for the right side here */}
      </div>
    </div>
  );
};

export default MessagingPage;
