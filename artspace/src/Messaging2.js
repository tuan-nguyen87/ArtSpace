// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import "./styles/messaging2.css";
import CreateChatPopup from "./CreateChatPopup"; //
import { messaging, requestPermission } from "./Firebase/Firebase";
import { db } from "./Firebase/Firebase"



// Define the MessagingPage component
const Messaging2 = () => {
  // State for storing messages and new messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateChatPopupOpen, setCreateChatPopupOpen] = useState(false);//
  //const [user, setUser] = useState('');

  
  // Function to send a new message 
  const sendMessage = (content) => {
    if (content.trim() !== "") {
      const message = { user: "User", content, timestamp: new Date().toISOString() };
      setMessages((prevMessages) => [...prevMessages, message]);
      db.collection("messages").add(message);
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


  const handleNewChat = () => {
    // Add the logic to handle the creation of a new chat
    console.log("Creating a new chat...");
    // Close the popup after creating the chat
    handleCloseCreateChatPopup();//
  };



  // JSX structure for the messaging page 
  return (
    <><div className="message-page">
        <div className="m_container">
          <div className="leftSide">
              {/* Render the CreateChatPopup component if isCreateChatPopupOpen is true */}
              {isCreateChatPopupOpen && (
                <CreateChatPopup
                onClose={handleCloseCreateChatPopup}
                onCreateChat={handleNewChat}
                />
              )}
              {/* Button to open the Create Chat popup */}
              <button className="button-style" onClick={handleOpenCreateChatPopup}>New Chat +</button>

              <div className="chatlist">
                  <div className="block active">
                      <div className="imgbx">
                          <img src="/Messaging art/img1.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Valerie</h4>
                              <p className="time">10:56</p>
                          </div>
                          <div className="message_p">
                              <p>How are you?</p>
                          </div>
                      </div>
                  </div>
                  <div className="block unread">
                      <div className="imgbx">
                          <img src="/Messaging art/img6.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Yasmine</h4>
                              <p className="time">09:25</p>
                          </div>
                          <div className="message_p">
                              <p>Hello</p>
                              <b>1</b>
                          </div>
                      </div>
                  </div>
                  <div className="block unread">
                      <div className="imgbx">
                          <img src="/Messaging art/img8.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Jennifer</h4>
                              <p className="time">Yesterday</p>
                          </div>
                          <div className="message_p">
                              <p>How are you?</p>
                              <b>2</b>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img3.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Kevin</h4>
                              <p className="time">Yesterday</p>
                          </div>
                          <div className="message_p">
                              <p>Hello</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img2.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Tuan</h4>
                              <p className="time">Yesterday</p>
                          </div>
                          <div className="message_p">
                              <p>oh okay</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/immg4.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>ARTSPACE</h4>
                              <p className="time">08/10/2023</p>
                          </div>
                          <div className="message_p">
                              <p>nice to talk with you</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img1.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Didi</h4>
                              <p className="time">08/10/2023</p>
                          </div>
                          <div className="message_p">
                              <p>please wait...</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img8.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Kaleb</h4>
                              <p className="time">07/10/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Happy Birthday</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img6.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Ali</h4>
                              <p className="time">05/10/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Thank You for the Help</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/immg4.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Cali</h4>
                              <p className="time">02/10/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Pls lmk</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img1.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Jude</h4>
                              <p className="time">09/28/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Send a screenshot</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img2.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Amy</h4>
                              <p className="time">09/28/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Helooo</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img6.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Raul</h4>
                              <p className="time">10/24/2023</p>
                          </div>
                          <div className="message_p">
                              <p>oh okay, hope get better soon</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img8.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Jo</h4>
                              <p className="time">12/23/2023</p>
                          </div>
                          <div className="message_p">
                              <p>nice to talk with you</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/immg4.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Diana</h4>
                              <p className="time">12/09/2023</p>
                          </div>
                          <div className="message_p">
                              <p>please wait...</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img2.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Viv</h4>
                              <p className="time">06/09/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Happy Birthday</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/Messaging art/img6.jpg" className="cover"/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Sam</h4>
                              <p className="time">02/09/2023</p>
                          </div>
                          <div className="message_p">
                              <p>Thank You for the Help</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="rightSide">
              <div className="chatBox">
                  <div className="message my_message">
                      <p>Hi<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>Hello<br /><span>12:15</span></p>
                  </div>
                  <div className="message my_message">
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi expedita in ut quasi laboriosam fugiat adipisci maxime laudantium quia modi magnam, eaque, alias officiis inventore hic cupiditate veritatis eveniet tenetur?<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>Commodi expedita in ut quasi laboriosam fugiat adipisci maxime laudantium quia<br /><span>12:15</span></p>
                  </div>
                  <div className="message my_message">
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi expedita in ut quasi laboriosam fugiat adipisci<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>laudantium quia modi magnam, eaque, alias officiis inventore hic cupiditate veritatis eveniet tenetur?<br /><span>12:15</span></p>
                  </div>
                  <div className="message my_message">
                      <p>cupiditate veritatis eveniet tenetur?<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>Commodi expedita in ut quasi laboriosam fugiat adipisci maxime laudantium quia modi magnam, eaque, alias officiis inventore hic cupiditate veritatis eveniet tenetur?<br /><span>12:15</span></p>
                  </div>
                  <div className="message my_message">
                      <p>ok<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>Lorem, fugiat adipisci maxime laudantium?<br /><span>12:15</span></p>
                  </div>
                  <div className="message my_message">
                      <p>Lorem, ipsum dolor sit<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>thanks<br  /><span>12:15</span></p>
                  </div>
                  <div className="message my_message">
                      <p>veritatis eveniet tenetur<br /><span>12:15</span></p>
                  </div>
                  <div className="message frnd_message">
                      <p>ArtSpace<br /><span>12:15</span></p>
                  </div>
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
