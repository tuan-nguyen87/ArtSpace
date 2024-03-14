import React, { useState } from "react";
import "./styles/Search.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/Firebase.js";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

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
      setError(null);
    } catch (error) {
      console.error("Error searching Firestore:", error);
      setSearchResults([]);
      setError("Error searching Firestore. Please try again later.");
    }
  };

  return (
    <div className="searchpage-container">
      <div className="search-title">
        <h1>Search for artists or services</h1>
      </div>
      <div>
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
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <div className="user-list">
            {searchResults.map((user, index) => (
              <div key={index} className="user-card">
                <img
                  src={user.profilePic}
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
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Search;
