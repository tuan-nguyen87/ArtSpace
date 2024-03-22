import React, { useState, useEffect } from "react";
import "./styles/messaging2.css";
import CreateChatPopup from "./CreateChatPopup"; //
import { messaging, requestPermission, updateUI } from "./Firebase/Firebase";
import { db } from "./Firebase/Firebase";
import { auth } from "./Firebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";





// Define the MessagingPage component
const Messaging2 = () => {
  // State for storing messages and new messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCreateChatPopupOpen, setCreateChatPopupOpen] = useState(false);//


 

  
  // Function to send a new message 
  const sendMessage = async (content) => {
    if (content.trim() !== "") {
      const user = auth.currentUser;
      const message = {
        user: user.displayName || user.email,
        content,
        timestamp: new Date().toISOString(),
      };
  
      try {
        const docRef = await addDoc(collection(db, "messages"), message);
        console.log("Document written with ID: ", docRef.id);
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



  // Function to update the UI with a new or modified message
  const updateUI = (message) => {
    // Update the state with the new or modified message
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log('Update UI with message:', message);
  };






  // Fetch messages from Firestore
  useEffect(() => {
    // Fetch messages from Firestore
const fetchMessages = async () => {
    try {
      const snapshot = await getDocs(collection(db, "messages"));
      const messagesData = snapshot.docs.map((doc) => doc.data());
  
      // Combine default messages with fetched messages
      const allMessages = [...defaultMessages, ...messagesData];
  
      // Use Map to ensure uniqueness based on message content
      const uniqueMessagesMap = new Map();
      allMessages.forEach((message) => {
        uniqueMessagesMap.set(message.content, message);
      });
  
      // Update the state with the unique messages
      setMessages(Array.from(uniqueMessagesMap.values()));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  
  // Fetch default messages separately (if needed)
  const defaultMessages = [
    // default messages here
  ];
  
  // Invoke the function to fetch messages
  fetchMessages();
   
    }, []); 
  
  


  // JSX structure for the messaging page 
  return (
    <><div className="message-page">
        <div className="m_container">
          <div className="leftSide">
              {/* Render the CreateChatPopup component if isCreateChatPopupOpen is true */}
              {isCreateChatPopupOpen && (
                <CreateChatPopup
                onClose={handleCloseCreateChatPopup}
                />
              )}
              {/* Button to open the Create Chat popup */}
              <button className="button-style" onClick={handleOpenCreateChatPopup}>New Chat +</button>
              <div>
          </div>
        
              
          </div>
          <div className="rightSide">
              <div className="chatBox">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.user === auth.currentUser.displayName || message.user === auth.currentUser.email ? "my_message" : "frnd_message"}`}
                >
                  <p>{message.content}<br /><span>{new Date(message.timestamp.seconds * 1000).toLocaleString()}</span></p>
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
