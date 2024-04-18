import React, { useState } from "react";
import { auth } from "./Firebase/Firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./styles/ProfileForSale.css";

const ProfileForSale = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null); // State for selected picture

  const handleUploadClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelectPicture = (event) => {
    // Handle picture selection here
    setSelectedPicture(event.target.files[0]);
  };

  const handleSaveButtonClick = async () => {
    // Handle saving picture, description, and price here
    if (!selectedPicture) {
      console.error("No picture selected.");
      return;
    }

    // Upload the selected picture to Firebase Storage
    const storageRef = ref(
      getStorage(),
      `${auth.currentUser.uid}/${selectedPicture.name}`
    );
    await uploadBytes(storageRef, selectedPicture);
    console.log("Picture uploaded successfully!");

    // Close the popup window after saving
    handleClosePopup();
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
            <input
              type="file"
              accept="image/*"
              onChange={handleSelectPicture}
            />
            <label>Description</label>
            <textarea rows="4" cols="50" />
            <label>Price</label>
            <input type="number" placeholder="Enter price" required />
            <button className="profile_btn" onClick={handleSaveButtonClick}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForSale;
