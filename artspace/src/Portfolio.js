import React, { useState, useEffect } from "react";
import "./styles/Portfolio.css";
import { db, auth, storage, upload } from "./Firebase/Firebase.js";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const Portfolio = () => {
  // Initial blank Biography, skills and name, Joker will be change to a null name later
  const initialBiography = "User's biography goes here...";
  const initialSkills = [];
  const initialImages = [];
  const initialUserName = "Please set your username";
  //const needed to edit fields
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [biography, setBiography] = useState(initialBiography);
  const [skills, setSkills] = useState(initialSkills);
  const [editedBiography, setEditedBiography] = useState(initialBiography);
  const [editedSkills, setEditedSkills] = useState(initialSkills);
  const [images, setImages] = useState(initialImages);
  const [userName, setUserName] = useState(initialUserName);
  const [editedUserName, setEditedUserName] = useState(initialUserName);
  const [userID, setUserID] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "https://static.vecteezy.com/system/resources/previews/008/422/689/original/social-media-avatar-profile-icon-isolated-on-square-background-vector.jpg"
  );
  // use effect to add to database documents and get fields
  useEffect(() => {
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
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribeSnapshot();
      } else {
        setUserID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function handleProfilePictureUpload(event) {}

  // behavior for edit button when clicked
  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
    setEditedBiography(biography);
    setEditedSkills(skills);
    setEditedUserName(userName);
  };
  // behavior for save button when clicked
  const handleSaveButtonClick = () => {
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
  };
  // after saving, cancel, popup should close
  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setEditedBiography(biography);
    setEditedSkills(skills);
    setEditedUserName(userName);
  };

  const handleBiographyChange = (event) => {
    setEditedBiography(event.target.value);
  };
  // adding skills to profile
  const handleAddSkill = () => {
    setEditedSkills([...editedSkills, ""]);
  };

  const handleSkillChange = (index, event) => {
    const updatedSkills = [...editedSkills];
    updatedSkills[index] = event.target.value;
    setEditedSkills(updatedSkills);
  };
  // behavior for deleting skills
  const handleDeleteSkill = (index) => {
    const updatedSkills = [...editedSkills];
    updatedSkills.splice(index, 1);
    setEditedSkills(updatedSkills);
  };
  // uploading images. still need to find a way to persist images to database.
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = e.target.result;
      setImages([...images, image]);
    };

    reader.readAsDataURL(file);
  };

  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };
  // main component of portfolio page. page is divided up into 2 sections, left and right. profile and pictures respectively
  return (
    <div className="portfolio">
      {/* The left section of the page, where profile and bio goes */}
      <div className="left-side">
        <button className="profile-button" onClick={handleEditButtonClick}>
          <img className="profile-pic" src={photoURL} alt="Profile Picture" />
        </button>
        <h3 className="user-name">{userName}</h3>

        <div className="bio">
          <h2>Biography</h2>
          <p>{biography}</p>
        </div>
        <div className="skills">
          <h2>Skills</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Edit profile should pop up and clicking on image */}
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
            {/* Buttons and their behavior define above */}
            <div>
              <label>Edit Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            </div>
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
      )}
      <label htmlFor="file-upload" className="edit-button">
        Edit
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      {/* the right side of the page, where images goes */}
      <div className="right-side">
        <div className="work-item">
          <img src="/Homepage art/sample pic 2.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 1.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 3.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 4.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 5.png" alt="Work 1 Thumbnail" />
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Work Thumbnail ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="my-portfolio">My Portfolio</div>
    </div>
  );
};

export default Portfolio;
