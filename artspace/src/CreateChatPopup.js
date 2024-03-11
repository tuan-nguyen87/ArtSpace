// CreateChatPopup.js
import React, { useState } from "react";

const CreateChatPopup = ({ onClose, onCreateChat }) => {
  const [searchUser, setSearchUser] = useState(""); // State for search input

  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  return (
    <div className="create-chat-popup">
      <div className="popup-header">
        <h2>Create Chat</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className="popup-content">
        {/* Search bar for adding users */}
        <input
          type="text"
          placeholder="Search for users"
          value={searchUser}
          onChange={handleSearchChange}
        />
        {/* Add logic for searching and displaying users */}
        
        <button onClick={onCreateChat}>Create Chat</button>
      </div>
    </div>
  );
};

export default CreateChatPopup;
