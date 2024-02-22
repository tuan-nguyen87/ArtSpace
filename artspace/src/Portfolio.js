import React, { useState } from "react";
import "./styles/Portfolio.css"; // Include your CSS file for styling

const Portfolio = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [biography, setBiography] = useState("User's biography goes here...");
  const [skills, setSkills] = useState(["Skill 1", "Skill 2", "Skill 3"]);

  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleSaveButtonClick = () => {
    // Save the edited biography and skills to your database or perform other actions
    setIsEditPopupOpen(false); // Close the edit pop-up window after saving
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const handleSkillChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  };

  return (
    <div className="portfolio">
      <div className="left-side">
        <img
          className="profile-pic"
          src="/Portfolio/joker.png"
          alt="Profile Picture"
        />
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
        <button className="edit-button" onClick={handleEditButtonClick}>
          Edit
        </button>{" "}
        {/* Edit button */}
      </div>
      {isEditPopupOpen && (
        <div className="edit-popup">
          {/* Pop-up content for editing */}
          <h2>Edit Profile</h2>
          <div className="edit-form">
            <label>Biography:</label>
            <textarea
              value={biography}
              onChange={handleBiographyChange}
              rows="4"
              cols="50"
            />
            <label>Skills:</label>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={skill}
                    onChange={(event) => handleSkillChange(index, event)}
                  />
                </li>
              ))}
            </ul>
            <button className="save-button" onClick={handleSaveButtonClick}>
              Save
            </button>
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="right-side">
        <div className="work-item">
          <img src="/Homepage art/sample pic 2.png" alt="Work 1 Thumbnail" />
        </div>
        {/* Add more work items as needed */}
        <img src="/Homepage art/sample pic 1.png" alt="Work 1 Thumbnail" />
      </div>
    </div>
  );
};

export default Portfolio;
