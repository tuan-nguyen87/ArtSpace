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
      const normalizedQuery = query.toLowerCase(); // Normalize query to lowercase

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const normalizedUserName = user.name.toLowerCase(); // Normalize user name to lowercase

        // Check if the normalized user name includes the normalized query
        if (normalizedUserName.includes(normalizedQuery)) {
          matchingUsers.push(user);
        } else {
          // Check if any of the user's skills include the normalized query
          const matchingSkills = user.skills.filter((skill) =>
            skill.toLowerCase().includes(normalizedQuery)
          );
          if (matchingSkills.length > 0) {
            matchingUsers.push(user);
          }
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
          <ul>
            {searchResults.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Search;
