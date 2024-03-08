import React, { useState } from "react";
import "./styles/Portfolio.css";

const Portfolio = () => {
  const initialBiography = "User's biography goes here...";
  const initialSkills = [];
  const initialImages = [];
  const initialUserName = "Joker";

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [biography, setBiography] = useState(initialBiography);
  const [skills, setSkills] = useState(initialSkills);
  const [editedBiography, setEditedBiography] = useState(initialBiography);
  const [editedSkills, setEditedSkills] = useState(initialSkills);
  const [images, setImages] = useState(initialImages);
  const [userName, setUserName] = useState(initialUserName);
  const [editedUserName, setEditedUserName] = useState(initialUserName);

  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
    setEditedBiography(biography);
    setEditedSkills(skills);
    setEditedUserName(userName);
  };

  const handleSaveButtonClick = () => {
    setBiography(editedBiography);
    setSkills(editedSkills);
    setUserName(editedUserName);
    setIsEditPopupOpen(false);
  };

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = e.target.result;
      setImages([...images, image]); // Add the uploaded image to the list of images
    };

    reader.readAsDataURL(file);
  };

  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };

  return (
    <div className="portfolio">
      <div className="left-side">
        <button className="profile-button" onClick={handleEditButtonClick}>
          <img
            className="profile-pic"
            src="/Portfolio/joker.png"
            alt="Profile Picture"
          />
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
