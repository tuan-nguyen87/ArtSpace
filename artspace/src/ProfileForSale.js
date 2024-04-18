import React, { useState, useEffect } from "react";
import { auth } from "./Firebase/Firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import "./styles/ProfileForSale.css";

const ProfileForSale = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null); // State for selected picture
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        // Get the current user
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("User not authenticated.");
          return;
        }

        // Get a reference to the current user's folder
        const storage = getStorage();
        const userFolderRef = ref(storage, `${auth.currentUser.uid}/forsale`);

        // Get a list of all images in the user's folder
        const imagesList = await listAll(userFolderRef);

        // Retrieve download URLs for each image
        const urls = await Promise.all(
          imagesList.items.map(async (item) => {
            return getDownloadURL(item);
          })
        );

        // Update state with the download URLs
        setUploadedImages(urls);
      } catch (error) {
        console.error("Error fetching uploaded images:", error);
      }
    };

    // Check if the user is authenticated before fetching images
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUploadedImages();
      }
    });

    return () => unsubscribe();
  }, []);

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
      `${auth.currentUser.uid}/forsale/${selectedPicture.name}`
    );

    try {
      await uploadBytes(storageRef, selectedPicture);
      console.log("Picture uploaded successfully!");

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Update state with the new image URL
      setUploadedImages([...uploadedImages, downloadURL]);

      // Close the popup window after saving
      handleClosePopup();
    } catch (error) {
      console.error("Error uploading picture:", error);
    }
  };

  return (
    <div className="ProfileForSale_Container">
      <h2 className="sale_text">Upload your work</h2>
      <div className="sale_container">
        {uploadedImages.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded Image ${index}`} />
        ))}
      </div>
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
