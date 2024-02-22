import React, { useState } from "react";
import "./styles/Portfolio.css"; // Include your CSS file for styling

const Portfolio = () => {
  const initialBiography = "User's biography goes here...";
  const initialSkills = [];

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [biography, setBiography] = useState(initialBiography);
  const [skills, setSkills] = useState(initialSkills);
  const [editedBiography, setEditedBiography] = useState(initialBiography);
  const [editedSkills, setEditedSkills] = useState(initialSkills);

  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
    setEditedBiography(biography);
    setEditedSkills(skills);
  };

  const handleSaveButtonClick = () => {
    // Save the edited biography and skills to your database or perform other actions
    setBiography(editedBiography);
    setSkills(editedSkills);
    setIsEditPopupOpen(false); // Close the edit pop-up window after saving
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setEditedBiography(biography);
    setEditedSkills(skills);
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

  return (
    <div className="portfolio">
      <div className="left-side">
        <button className="profile-button" onClick={handleEditButtonClick}>
          <img
            className="profile-pic"
            src="/Portfolio/joker.png"
            alt="Profile Picture"
          />
          <button
            className="profile-button"
            onClick={handleEditButtonClick}
          ></button>
        </button>

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
          {/* Pop-up content for editing */}
          <h2 className="edit-profile">Edit Profile</h2>
          <div className="edit-form">
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
      <div>
        <button className="edit-button">Edit</button>
      </div>
      <div className="right-side">
        <div className="work-item">
          <img src="/Homepage art/sample pic 2.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 1.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 3.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 4.png" alt="Work 1 Thumbnail" />
          <img src="/Homepage art/sample pic 5.png" alt="Work 1 Thumbnail" />
        </div>
      </div>
      <div className="my-portfolio">My Portfolio</div>
      <div>
        <button className="edit-button">Edit</button>
      </div>
    </div>
  );
};

export default Portfolio;
