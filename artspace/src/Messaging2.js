// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./styles/messaging2.css";



// Define the MessagingPage component
const Messaging2 = () => {
  // State for storing messages and new messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  // Effect hook for initializing and cleaning up the socket connection
  useEffect(() => {

    // Check if the user is already logged in
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setIsLoggedIn(true);
    }

     // Establish socket connection to the server
	const socket = socketIOClient("http://localhost:3000");

    
	// Event listener for incoming chat messages
	socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

     // Event listener for loading existing messages
	socket.on("load messages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Cleanup function to disconnect socket on component unmount
	return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures the effect runs only once during component mount

  
  // Function to send a new message 
  const sendMessage = (content) => {
    if (content.trim() !== "") {
      const socket = socketIOClient("http://localhost:3000");
      const message = { user: "User", content };

      socket.emit("chat message", message);

      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  // JSX structure for the messaging page 
  return (
    <><div className="message-page">
        <div className="m_container">
          <div className="leftSide">
             {/* <div className="header">
                  <div className="userimg">
                      <img src="user.jpg" className="cover"/>
                  </div>
                  <ul className="nav_icons">
                      <li><ion-icon name="scan-circle-outline"></ion-icon></li>
                      <li><ion-icon name="chatbox"></ion-icon></li>
                      <li><ion-icon name="ellipsis-vertical"></ion-icon></li>
                  </ul>
                </div>*/}
              <div className="search_chat">
                  <div>
                      <input type="text" placeholder="Search or start new chat"/>
                          {/*<ion-icon name="search-outline"></ion-icon>*/}
                  </div>
              </div>
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
              <div className="header">
                  {/*<div className="imgText">
                      <div className="userimg">
                          <img src="img1.jpg" className="cover"/>
                      </div>
                      <h4>Mimi<br /><span>online</span></h4>
                  </div>
                  {/*<ul className="nav_icons">
                      <li><ion-icon name="search-outline"></ion-icon></li>
                      <li><ion-icon name="ellipsis-vertical"></ion-icon></li>
                     </ul>*/}
              </div>


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
                  {/*<ion-icon name="happy-outline"></ion-icon>
                  <ion-icon name="attach-outline"></ion-icon>*/}
                  <input type="text" placeholder="Type a message"/>
              </div>
          </div>
      </div>
    </div>
      {/*<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>*/}</>
  );
};

export default Messaging2;
