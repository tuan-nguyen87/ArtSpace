import React, { useState, useEffect } from "react";
import "./styles/messaging2.css";
import { db } from "./Firebase/Firebase";
import { auth } from "./Firebase/Firebase";
import { collection, getDocs, addDoc, query, where, doc, setDoc, getDoc } from "firebase/firestore";





// Define the MessagingPage component
const Messaging2 = () => {
  // State for storing messages and new messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCreateChatPopupOpen, setCreateChatPopupOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchUser, setSearchUser] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  
  
  // Function to send a new message 
  const sendMessage = async (content) => {
    if (content.trim() !== "") {
      const user = auth.currentUser;
      const message = {
        user: user.displayName || user.email,
        content,
        timestamp: new Date(),
      };
  
      try {
        //const docRef = await addDoc(collection(db, "messages"), message);
        //console.log("Document written with ID: ", docRef.id);
        await addDoc(collection(db, "messages"), message);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };
  


  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage(""); // Clear the input after sending the message
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line in the textarea
      handleSendMessage();
    }
  };

  const handleOpenCreateChatPopup = () => {
    setCreateChatPopupOpen(true);
  };

  const handleCloseCreateChatPopup = () => {
    setCreateChatPopupOpen(false);
  };

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "messages"));
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages();
  }, []);
  
  // Fetch chats from Firestore
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const snapshot = await getDocs(collection(db, "chats"));
        const chatsData = snapshot.docs.map((doc) => doc.data());
        setChats(chatsData);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);
//end of messaging

  
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
  
    const handleUserSelect = (user) => {
      setSelectedUser(user); // Set the selected user
      setSearchResults([]); // Clear the search results
    };
  
    // Function to update the chat list after creating a new chat
    const updateChatList = (newChat) => {
      setChats((prevChats) => [...prevChats, newChat]);
    };
  
    const updateChat = async (updatedChat) => {
      try {
          // Get the chat document reference from the database
          const chatDocRef = doc(db, "chats", updatedChat.id);
  
          // Update the chat document with the updated chat data
          await setDoc(chatDocRef, updatedChat);
  
          console.log("Chat updated successfully!");
      } catch (error) {
          console.error("Error updating chat:", error);
          throw error; // Re-throw the error to handle it in the calling function if needed
      }
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
                content: "Welcome to the chat!", // Example msg content
                sender: auth.currentUser.displayName, // Assuming you're using Firebase authentication
                receiver: selectedUsers, 
                timestamp: new Date(),
            };
  
            // Pushes message into the messages array of the newly created chat
            newChat.messages.push(message);
  
            // Update the chat in the database with the new message
            await updateChat(newChat); 
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
  
  


  // JSX structure for the messaging page 
  return (
    <> <div className="message-page">
    <div className="m_container">
      <div className="leftSide">
        {/* Display the chat list */}
        <div className="chatList">
          {chats.map((chat, index) => (
            <div key={index} className="chatItem">
              {/* Display chat participants */}
              {chat.participants.join(", ")}
            </div>
          ))}
        </div>
        {/* Render the CreateChatPopup component if isCreateChatPopupOpen is true */}
        {isCreateChatPopupOpen ? (
          <div className="create-chat-popup">
            <div className="popup-header">
              <h2>Create Chat</h2>
              <button onClick={handleCloseCreateChatPopup}>X</button>
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
                <div className="search-results">
                  {searchResults.map((user, index) => (
                    <div
                      key={index}
                      onClick={() => handleUserSelect(user)}
                    >
                      {user.username}
                    </div>
                  ))}
                </div>
              )}
              <div>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="chat-item"
                    onClick={() => handleChatClick(chat)}
                  >
                    <div className="participants">
                      {chat.participants.map((participant, index) => (
                        <span key={index}>{participant}</span>
                      ))}
                    </div>
                    <div className="last-message">
                      {chat.messages.length > 0 ? (
                        <>
                          <span>{chat.messages[chat.messages.length - 1].senderID}: </span>{" "}
                          {/* Assuming 'senderID' is the sender's username */}
                          <span>
                            {truncateMessage(
                              chat.messages[chat.messages.length - 1]
                                .content
                            )}
                          </span>{" "}
                          {/* Truncate long messages */}
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
        ) : (
          <>
            {/* Button to open the Create Chat popup */}
            <button
              className="button-style"
              onClick={handleOpenCreateChatPopup}
            >
              New Chat +
            </button>
            <div></div>
          </>
        )}
      </div>
      <div className="rightSide">
        <div className="chatBox">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.user === auth.currentUser.displayName ||
                message.user === auth.currentUser.email
                  ? "my_message"
                  : "frnd_message"
              }`}
            >
              <p>
                {message.content}
                <br />
                <span>
                  {new Date(message.timestamp.seconds * 1000).toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="chatBox_input">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
      </>
  );
            
};

export default Messaging2;
