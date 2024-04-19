import React, { useState, useEffect } from "react";
import "./styles/messaging2.css";
import { db } from "./Firebase/Firebase";
import { auth } from "./Firebase/Firebase";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";


const Messaging2 = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const portfolioCollection = collection(db, "Portfolio");
        const querySnapshot = await getDocs(portfolioCollection);
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  
  // Function to send a new message 
  /**These functions handle message input, 
   * sending, and keyboard events.  ensure that 
   * messages are sent when the user inputs text,
   *  presses the "Enter" key, and handles any errors 
   * during message sending. */
  const sendMessage = async (content, receiver) => {
    if (content.trim() !== "" && receiver) {
      const user = auth.currentUser;
      console.log("Current user:", user); // Log current user object
      console.log("Current user display name:", user.displayName);
      if (!user) {
        console.error("No user logged in.");
        return;
      }
      
      const senderEmail = user.email; 
      const message = {
        content: content,
        sender: senderEmail,
        receiver: receiver,
        timestamp: new Date(),
      };
  
      try {
        await addDoc(collection(db, "messages"), message);
        setNewMessage("");
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };
  
  
  
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, selectedUser);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line in the textarea
      handleSendMessage();
    }
  };

  
  /**UseEffect hooks are for fetching messages and chats from 
   * Firestore when the component mounts. They ensure that the 
   * component has the latest data from the Firestore database */
  useEffect(() => {
    const unsubscribeMessages = onSnapshot(collection(db, "messages"), (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesData);
    });

    return () => {
      unsubscribeMessages();
    };
  }, []);
  
//end of messaging

  
  
    /** This function is triggered when a user is selected from the search results. 
     * It updates the selectedUser state with the selected user and clears 
     * the search results. Essential for handling user selections during
     *  the chat creation process */
    const handleUserSelect = (user) => {
      console.log("Selected user:", user);
      setSelectedUser(user && user.email); 
    };
   

  // JSX structure for the messaging page 
  return (
 <> <div className="message-page">
      <div className="m_container">
        <div className="leftSide">
          <div className="userList">
            <h1>User List</h1>
            <ul>
              {users.map((user, index) => (
                <li key={index} onClick={() => handleUserSelect(user)}>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rightSide">
          <div className="chatBox">
            {messages
              .filter(
                (message) =>
                  (message.sender === auth.currentUser.email && message.receiver === selectedUser) ||
                  (message.receiver === auth.currentUser.email && message.sender === selectedUser)
              )
      
              .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
              .map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === auth.currentUser.email ? "my_message" : "frnd_message"}`}
                >
                  <p>
                    {message.content}
                    <br />
                    <span>{new Date(message.timestamp.seconds * 1000).toLocaleString()}</span>
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
