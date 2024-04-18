import React, { useState } from "react";
import { auth } from "./Firebase/Firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./styles/ProfileForSale.css";

const ProfileForSale = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleUploadClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="ProfileForSale_Container">
      <h2 className="sale_text">Upload your work</h2>
      <div className="sale_container"></div>
      <button className="profile_btn" onClick={handleUploadClick}>
        Upload
      </button>
      {/* Popup window */}
      {isPopupOpen && (
        <div className="popup_profile">
          <div className="popup_content">
            <h3>Upload Image</h3>
            <button className="profile_btn">Select Image</button>
            <label>Description</label>
            <textarea rows="4" cols="50" />
            <label>Price</label>
            <input type="number" placeholder="Enter price" requried />
            <button className="profile_btn">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForSale;
