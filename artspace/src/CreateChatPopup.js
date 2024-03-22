// CreateChatPopup.js
import React, { useState } from "react";
import { collection, getDoc, getDocs, where, query, addDoc } from "firebase/firestore";
import { db } from "./Firebase/Firebase";
import { auth } from "./Firebase/Firebase.js";



const CreateChatPopup = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);

  const createChat = async (selectedUsers) => {
    try {
      // Create a new chat document in the "Chats" collection
      const chatData = {
        participants: selectedUsers,
        createdAt: new Date(),
        messages: [],
        updatedAt: new Date(),
        // Do I need to add anything else?
      };
      const chatRef = await addDoc(collection(db, "chats"), chatData);
      
      // Fetch the newly created chat document to get its ID
      const chatDoc = await getDoc(chatRef);
      const newChat = { id: chatDoc.id, ...chatDoc.data() };
  
      // Update the component state to include the new chat
      setChats((prevChats) => [...prevChats, newChat]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  
  
  const handleSearchChange = async (event) => {
    setSearchUser(event.target.value); // Update search query state
    const queryText = event.target.value.trim();
    console.log("Query Text:", queryText);
    if (queryText) {
      try {
        const portfolioRef = collection(db, "Portfolio"); 
        const q = query(portfolioRef, where("name", ">=", queryText));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data().name);
        console.log("Users Array:", users);
        setSearchResults(users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    } else {
      setSearchResults([]); // Clear search results when search query is empty
    }
  };


  const fetchUsers = async () => {
    const usersRef = collection(db, "Portfolio");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map(doc => doc.data());
    return users;
  };


  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user
    setSearchResults([]); // Clear the search results
  };

  // Function to update the chat list after creating a new chat
  const updateChatList = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const handleNewChat = async (selectedUsers) => {
    if (selectedUsers) {
        try {
            // Create the chat
            const newChat = await createChat(selectedUsers);

            // Optionally, update the chat list immediately after creating a new chat
            updateChatList(newChat);

            // Example of sending a message after creating the chat
            const message = {
              content: "Welcome to the chat!", // Example message content
              sender: auth.currentUser.displayName, // Assuming you're using Firebase authentication
              receiver: selectedUsers, // Assuming you're sending the message to the selected users
              timestamp: new Date(),
          };

          // Pushes message into the messages array of the newly created chat
          newChat.messages.push(message);

          // Update the chat in the database with the new message
          await updateChat(newChat); //need to implement the updateChat function to update the chat in the database
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    }
};



     //function to truncate long messages
  const truncateMessage = (message, maxLength = 50) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + '...';
    } else {
      return message;
    }
  };


  // Define the handleChatClick function
  const handleChatClick = (chat) => {
    // Implement logic to handle chat item click
    console.log("Clicked on chat:", chat);
    // For example, to navigate to the chat conversation
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
        {/* Display search results */}
        {searchResults.length > 0 && (
          <div className="search-results" >
            {searchResults.map((user, index) => (
              <div key={index} onClick={() => handleUserSelect(user)}>
                {user.username}
              </div>
            ))}
          </div>
        )}
        <div>
          {chats.map((chat) => (
            <div key={chat.id} className="chat-item" onClick={() => handleChatClick(chat)}>
              <div className="participants">
                {chat.participants.map((participant, index) => (
                  <span key={index}>{participant}</span> 
                ))}
              </div>
              <div className="last-message">
                {chat.messages.length > 0 ? (
                  <>
                    <span>{chat.messages[chat.messages.length - 1].senderID}: </span> {/* Assuming 'senderID' is the sender's username */}
                    <span>{truncateMessage(chat.messages[chat.messages.length - 1].content)}</span> {/* Truncate long messages */}
                  </>
                ) : (
                  <span>No messages yet</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* "Create Chat" button */}
        <button onClick={handleNewChat} disabled={!selectedUser}>
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default CreateChatPopup;
