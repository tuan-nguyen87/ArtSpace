import React, { useState, useEffect, useCallback} from "react";
import "./styles/Portfolio.css";
import { db, auth, storage } from "./Firebase/Firebase.js";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const Portfolio = () => {
  // Generic filler information
  const initialBiography = "User's biography goes here...";
  const initialSkills = [];
  const initialImages = [];
  const initialUserName = "Please set your username";

  // State variables
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [biography, setBiography] = useState(initialBiography);
  const [skills, setSkills] = useState(initialSkills);
  const [editedBiography, setEditedBiography] = useState(initialBiography);
  const [editedSkills, setEditedSkills] = useState(initialSkills);
  const [images, setImages] = useState(initialImages);
  const [userName, setUserName] = useState(initialUserName);
  const [editedUserName, setEditedUserName] = useState(initialUserName);
  const [userID, setUserID] = useState(null);
  const [photoURL, setPhotoURL] = useState(null); // Default profile picture set to null

  useEffect(() => {
    // Authentication listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        const userDocRef = doc(db, "Portfolio", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setBiography(userData.bio || initialBiography);
            setSkills(userData.skills || initialSkills);
            setUserName(userData.name || initialUserName);
            setPhotoURL(userData.photoURL || null); // Update photoURL state if available
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribeSnapshot();
      } else {
        setUserID(null);
      }
    });

    // Retrieve image URLs from local storage when component mounts -- Yasmine
    const storedImages = localStorage.getItem("uploadedImages");
    // if (storedImages) {
    //   setImages(JSON.parse(storedImages));
    // }
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      // Filter out images that do not exist in storage
      const existingImages = parsedImages.filter(image => {
        const imageRef = ref(storage, image);
        return getDownloadURL(imageRef).then(() => true).catch(() => false);
      });
      setImages(existingImages);
      localStorage.setItem("uploadedImages", JSON.stringify(existingImages));
    }
    return () => unsubscribe();
  }, []);

  // function handleProfilePictureUpload(event) {
  // Turning handleProfilePictureUpload into a memoized function 
  // to reduce rerender and improve memory usage -- Yasmine
  // Without useCallback, this function would be recreated on every render 
  // 
  const handleProfilePictureUpload = useCallback((event) =>  {
    const file = event.target.files[0];
    const storageRef = ref(storage, `${userID}/profile-picture.jpg`);

    // Upload file to Firebase Storage
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // Get the download URL of the uploaded image
        getDownloadURL(storageRef).then((downloadURL) => {
          if (userID) {
            const userDocRef = doc(db, "Portfolio", userID);
            setDoc(
              userDocRef,
              {
                name: editedUserName,
                bio: editedBiography,
                skills: editedSkills,
                photoURL: downloadURL,
              },
              { merge: true }
            )
              .then(() => {
                setPhotoURL(downloadURL); // Update photoURL state with the new URL
                setIsEditPopupOpen(false); // Close the edit popup
              })
              .catch((error) => {
                console.error("Error saving user data: ", error);
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error uploading profile picture: ", error);
      });
    
  }, [editedBiography, editedSkills, editedUserName, userID]);
  // Recreate the function only when one of the above changes -- Yasmine

  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
    setEditedBiography(biography);
    setEditedSkills(skills);
    setEditedUserName(userName);
  };

  // const handleSaveButtonClick = () => {
  // Turning handleSaveButtonClick into a memoized function 
  // to reduce rerender and improve memory usage -- Yasmine
  // Without useCallback, this function would be recreated on every render
  const handleSaveButtonClick = useCallback(() => {
    setBiography(editedBiography);
    setSkills(editedSkills);
    setUserName(editedUserName);
    setIsEditPopupOpen(false);

    if (userID) {
      const userDocRef = doc(db, "Portfolio", userID);
      setDoc(userDocRef, {
        name: editedUserName,
        bio: editedBiography,
        skills: editedSkills,
      })
        .then(() => {
          console.log("User data saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving user data: ", error);
        });
    }
  }, [editedBiography, editedSkills, editedUserName, userID]);
  // Only rerender the function when one of the above changes -- Yasmine

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setEditedBiography(biography);
    setEditedSkills(skills);
    setEditedUserName(userName);
  };

  const handleBiographyChange = (event) => {
    setEditedBiography(event.target.value);
  };

  const handleAddSkill = () => {
    setEditedSkills([...editedSkills, ""]);
  };

  const handleSkillChange = (index, event) => {
    const updatedSkills = [...editedSkills];
    updatedSkills[index] = event.target.value;
    setEditedSkills(updatedSkills);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...editedSkills];
    updatedSkills.splice(index, 1);
    setEditedSkills(updatedSkills);
  };

  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };

  // Function to delete an image from storage and update state -- Yasmine
  const deleteImage = useCallback((imageUrl) => {
    // Delete the image from Firebase Storage
    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        // Remove the deleted image URL from state and local storage
        const updatedImages = images.filter((image) => image !== imageUrl);
        setImages(updatedImages);
        localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
      });
  }, [images]);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const storageRef = ref(storage, `${userID}/work-images/${file.name}`); // Set the storage path for work images

    // Ensure a file is selected -- Yasmine
    if (!file) {
      console.error("No file selected.");
      return;
    }
    
    // Upload file to Firebase Storage
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // Get the download URL of the uploaded image
        // Save image URL to local storage after successful upload
        getDownloadURL(storageRef).then((downloadURL) => {
          // Update state with the new image URL
          const updatedImages = [...images, downloadURL];
          console.log("Download URL:", downloadURL);
          // I got the images to persist after reload!! -- Yasmine
          setImages(updatedImages);
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
        })
        .catch((error) => {
          console.error("Error getting download URL: ", error);
        });
      })
      // Included more error handling -- Yasmine
      .catch((error) => {
        console.error("Error uploading work image: ", error);
      });
  }

  return (
    <div className="portfolio">
      <div className="left-side">
        <button className="profile-button" onClick={handleEditButtonClick}>
          <img
            className="portfolio-pic"
            src={
              photoURL ||
              "https://static.vecteezy.com/system/resources/previews/008/422/689/original/social-media-avatar-profile-icon-isolated-on-square-background-vector.jpg"
            }
            alt="Profile Generic"
          />
        </button>
        <h3 className="user-name">{userName}</h3>

        <div className="bio">
          <h2 className="bio-title">Biography</h2>
          <p className="bio-paragraph">{biography}</p>
        </div>
        <div className="skills">
          <h2 className="skills-title">Skills</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      {isEditPopupOpen && (
        <div className="edit-popup">
          <h2 className="edit-profile">Edit Profile</h2>
          <div className="edit-form">
            <label>User Name</label>
            <textarea
              type="text"
              value={editedUserName}
              onChange={handleUserNameChange}
            />
            <label>Biography:</label>
            <textarea
              value={editedBiography}
              onChange={handleBiographyChange}
              rows="4"
              cols="50"
            />
            <label>Skills:</label>
            <ul>
              {editedSkills.map((skill, index) => (
                <li key={index} className="skill-item">
                  <input
                    type="text"
                    value={skill}
                    onChange={(event) => handleSkillChange(index, event)}
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteSkill(index)}
                  ></button>
                </li>
              ))}
            </ul>
            <div>
              <label>Edit Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            </div>
            <div className="buttons"> {/* Made buttons a div for grouping -- Yasmine */}
              <button className="add-skill-button" onClick={handleAddSkill}>
                Add Skill
              </button>
              <button className="save-button" onClick={handleSaveButtonClick}>
                Save
              </button>
              <button className="close-button" onClick={handleClosePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="right-side">
        {/* Display uploaded images */}
        <div className="work-item">
          <img src="/Homepage art/sample pic 2.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 1.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 3.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 4.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 5.png" alt="Work 1 Thumbnail" />
          {images.map((image, index) => (
            <img
            key={index}
            src={image}
            alt={`Work Thumbnail ${index + 1}`}
            onClick={() => deleteImage(image)} // Add onClick to delete image
          />
          ))}
        </div>
      </div>

      {/* Image upload input */}
      <label htmlFor="file-upload" className="edit-button">
        Upload
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Portfolio;
