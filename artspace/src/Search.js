import React, { useState } from "react";
import "./styles/Search.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/Firebase.js";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the visibility of the popup
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Portfolio");
      const querySnapshot = await getDocs(usersRef);

      const matchingUsers = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();

        // Convert skills to lowercase for case-insensitive matching
        const lowercaseSkills = user.skills.map((skill) => skill.toLowerCase());

        // Check if query matches name or any skill (case-insensitive and partial matching)
        if (
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          lowercaseSkills.some((skill) => skill.includes(query.toLowerCase()))
        ) {
          matchingUsers.push(user);
        }
      });

      setSearchResults(matchingUsers);
    } catch (error) {
      console.error("Error searching Firestore:", error);
      setSearchResults([]);
    }
  };

  const handleResultClick = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = (popupName) => {
    if (popupName === "first") {
      setIsPopupOpen(false); // Close the first popup
    } else if (popupName === "second") {
      setIsSecondPopupOpen(false); // Close the second popup
    }
  };

  const handleForSaleClick = () => {
    setIsSecondPopupOpen(true); // Open the second popup menu
  };

  return (
    <div className="searchpage-container">
      <div className="search-title">
        <h1>Search for artists or services</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your search query..."
            value={query}
            onChange={handleInputChange}
            className="searchpage-input"
          />
        </form>
      </div>
      <div className="search-results-container">
        {searchResults.length > 0 ? (
          <div className="search-results">
            <h2 className="text-results">Search Results:</h2>
            <div className="user-list">
              {searchResults.map((user, index) => (
                <div
                  key={index}
                  className="user-card"
                  onClick={() => handleResultClick(user)}
                >
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <div className="user-details">
                    <h3>{user.name}</h3>
                    <p>Skills: {user.skills.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="error">No matching users found.</div>
        )}
      </div>

      {/* Popup menu */}
      {isPopupOpen && selectedUser && (
        <div className="popup-menu">
          <img src={selectedUser.photoURL} alt="Profile" />
          <div>
            <h2 className="UID_Name">{selectedUser.name}</h2>
            <p className="popup_skills">
              Skills: {selectedUser.skills.join(", ")}
            </p>
          </div>
          <textarea
            placeholder="Type your message here..."
            className="popup-textarea"
          />
          <div className="search_btn">
            <button onClick={handleForSaleClick}>For Sale</button>
            <button onClick={() => closePopup("first")}>Cancel</button>
            <button onClick={() => closePopup("first")}>Send</button>
          </div>
        </div>
      )}

      {isSecondPopupOpen && (
        <div className="second-popup-menu">
          <div className="forsale_stuff">
            <h2 className="gallery_name">
              {selectedUser ? selectedUser.name + "'s Gallery Sale" : ""}
            </h2>
          </div>

          <button onClick={() => closePopup("second")}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Search;
