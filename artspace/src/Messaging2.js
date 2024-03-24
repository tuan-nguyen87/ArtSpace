import React, { useState, useEffect } from "react";
import "./styles/messaging2.css";
import { db } from "./Firebase/Firebase";
import { auth } from "./Firebase/Firebase";
import { collection, getDocs, addDoc, query, where, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

const Messaging2 = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCreateChatPopupOpen, setCreateChatPopupOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchUser, setSearchUser] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Function to send a new message 
  /**These functions handle message input, 
   * sending, and keyboard events.  ensure that 
   * messages are sent when the user inputs text,
   *  presses the "Enter" key, and handles any errors 
   * during message sending. */
  const sendMessage = async (content) => {
    if (content.trim() !== "") {
      const user = auth.currentUser;
      const message = {
        user: user.displayName || user.email,
        content,
        timestamp: new Date(),
      };
  
      try {
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

/**These functions are responsible for setting the state to 
 * control the visibility of the create chat popup */
  const handleOpenCreateChatPopup = () => {
    setCreateChatPopupOpen(true);
  };

  const handleCloseCreateChatPopup = () => {
    setCreateChatPopupOpen(false);
  };

  
  /**UseEffect hooks are for fetching messages and chats from 
   * Firestore when the component mounts. They ensure that the 
   * component has the latest data from the Firestore database */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesData);
    });
  
    return () => unsubscribe(); // Cleanup function to unsubscribe from real-time updates
  }, []);
  
  
  
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const snapshot = await getDocs(collection(db, "chats"));
        const chatsData = snapshot.docs.map((doc) => {
          const data = doc.data()
          if(!data.participants) {
            data.participants = [];
          }
          return data;
        });
        setChats(chatsData);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);
//end of messaging

  /**This function is for creating a new chat document in the 
   * Firestore database. It's called when the user selects participants 
   * and initiates a new chat. The newly created chat is then added to 
   * the component state to reflect the changes immediately. */
    const createChat = async (selectedUsers) => {
      try {
        const chatData = {
          participants: selectedUsers,
          createdAt: new Date(),
          messages: [],
          updatedAt: new Date(),
        };
        const chatRef = await addDoc(collection(db, "chats"), chatData);
        const chatDoc = await getDoc(chatRef);
        const newChat = { id: chatDoc.id, ...chatDoc.data() };

        setChats((prevChats) => [...prevChats, newChat]);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    };
    
    /**This function handles the change event in the search input field. 
     * It updates the search query state (searchUser) and performs a search 
     * query based on the input text. If the query text is not empty, 
     * it queries the Firestore collection "Portfolio" and retrieves 
     * documents where the "name" field matches the query text. 
     * Then, it updates the search results state (searchResults) with the
     *  names of the users found in the search. */
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
  
    /** This function is triggered when a user is selected from the search results. 
     * It updates the selectedUser state with the selected user and clears 
     * the search results. Essential for handling user selections during
     *  the chat creation process */
    const handleUserSelect = (user) => {
      setSelectedUser(user); 
    };
  
    /**This function is responsible for updating the chat list with a 
     * new chat after it has been created. It adds the new chat to the 
     * existing list of chats in the state. This function ensures that
     *  newly created chats are immediately reflected in the user interface.
     *  */
    
    const updateChatList = (newChat) => {
      setChats((prevChats) => [...prevChats, newChat]);
    };
  
    /**updates the chat document in the Firestore database with the 
     * provided updated chat data. It takes the updated chat object as 
     * a parameter, gets the reference to the chat document using its ID,
     *  and then updates the document with the new data using the 
     * setDoc function */
    const updateChat = async (updatedChat) => {
      try {
          const chatDocRef = doc(db, "chats", updatedChat.id);
  
          await setDoc(chatDocRef, updatedChat);
  
          console.log("Chat updated successfully!");
      } catch (error) {
          console.error("Error updating chat:", error);
          throw error; // Re-throw the error to handle it in the calling function if needed
      }
  };
  
  /**function is responsible for creating a new chat. 
   * It takes the selected users as input, 
   * creates a new chat using the createChat function, 
   * updates the chat list with the newly 
   * created chat using updateChatList, and then sends a welcome 
   * message to the new chat to test its functionality. */
  const handleNewChat = async (selectedUsers) => {
    if (selectedUsers) { // Check if any user is selected
      try {
        const newChat = await createChat(selectedUsers);
        updateChatList(newChat);
  
        const message = {
          content: "Welcome to the chat!", // Example msg content
          sender: auth.currentUser.displayName, // Assuming you're using Firebase authentication
          receiver: selectedUsers, 
          timestamp: new Date(),
        };
        newChat.messages.push(message);
  
        // Update the chat in the database with the new message
        await updateChat(newChat); 
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    } else {
      console.error('No user selected for chat');
    }
  };
  
  
  
  
       //limits the length of messages displayed in the UI 
       //to prevent them from overflowing
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
              {chat.participants && chat.participants.join(", ")}
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
                      {user}
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
        {messages.slice().sort((a, b) => (a.timestamp.seconds * 1000) - (b.timestamp.seconds * 1000)).map((message, index) => (
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
