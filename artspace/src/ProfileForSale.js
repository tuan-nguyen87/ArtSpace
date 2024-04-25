import React, { useState, useEffect } from "react";
import { db, auth } from "./Firebase/Firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./styles/ProfileForSale.css";

const ProfileForSale = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("User not authenticated.");
          return;
        }

        const storage = getStorage();
        const userFolderRef = ref(storage, `${auth.currentUser.uid}/forsale`);

        const imagesList = await listAll(userFolderRef);

        const urls = await Promise.all(
          imagesList.items.map(async (item) => {
            return getDownloadURL(item);
          })
        );

        setUploadedImages(urls);
      } catch (error) {
        console.error("Error fetching uploaded images:", error);
      }
    };

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
    setSelectedPicture(event.target.files[0]);
  };

  const handleSaveButtonClick = async () => {
    // Retrieve description and price from input fields
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    // Ensure description and price are provided
    if (!description || !price) {
      console.error("Description and price are required.");
      return;
    }

    try {
      // Upload the selected picture to Firebase Storage
      const storageRef = ref(
        getStorage(),
        `${auth.currentUser.uid}/forsale/${selectedPicture.name}`
      );
      await uploadBytes(storageRef, selectedPicture);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Construct data object including the current user's UID
      const data = {
        userId: auth.currentUser.uid,

        description: description,
        price: price,
        imageUrl: downloadURL,
      };

      // Add a new document to the "products" collection with the data
      const docRef = await addDoc(collection(db, "products"), data);
      console.log("Document written with ID: ", docRef.id);

      // Update the state with the new image URL
      setUploadedImages([...uploadedImages, downloadURL]);

      // Close the popup window after saving
      handleClosePopup();
    } catch (error) {
      console.error("Error uploading picture or saving data:", error);
    }
  };

  return (
    <div className="ProfileForSale_Container">
      <h2 className="sale_text">Upload your work</h2>
      <div className="sale_container">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded Image ${index}`} />
          ))
        ) : (
          <p className="empty_display">
            It looks like you don't have anything up for sale.
          </p>
        )}
      </div>

      <button className="profile_btn" onClick={handleUploadClick}>
        Upload
      </button>
      {isPopupOpen && (
        <div className="popup_profile">
          <div className="popup_content">
            <h3>Upload Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleSelectPicture}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <div className="popup_btn">
              <button className="profile_btn" onClick={handleClosePopup}>
                Cancel
              </button>
              <button className="profile_btn" onClick={handleSaveButtonClick}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForSale;
