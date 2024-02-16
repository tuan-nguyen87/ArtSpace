// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./styles/msg.css";



// Define the MessagingPage component
const MessagingPage = () => {
  // State for storing messages and new messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");



  // Effect hook for initializing and cleaning up the socket connection
  useEffect(() => {
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
    <div className="msg_container">
      <div className="leftSide">
      <div class="search_chat">
		<div>
		  <input type="text" placeholder="Search or start new chat"/>
		</div>
	  </div>
        <div className="chatList">
          {/* Chat list items */}
          <div className="block active">
					<div className="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div className="details">
						<div className="listHead">
							<h4>Mimi</h4>
							<p className="time">10:56</p>
						</div>
						<div className="message_p">
							<p>ArtSpace</p>
						</div>
					</div>
				</div>
				<div className="block unread">
					<div className="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div className="details">
						<div className="listHead">
							<h4>Amy</h4>
							<p className="time">09:25</p>
						</div>
						<div className="message_p">
							<p>Hi, i found you on justdial</p>
							<b>1</b>
						</div>
					</div>
				</div>
				<div className="block unread">
					<div className="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div className="details">
						<div className="listHead">
							<h4>Olivia</h4>
							<p className="time">Yesterday</p>
						</div>
						<div className="message_p">
							<p>Send for processing</p>
							<b>2</b>
						</div>
					</div>
				</div>
				<div className="block">
					<div className="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div className="details">
						<div className="listHead">
							<h4>Amelia</h4>
							<p className="time">Yesterday</p>
						</div>
						<div className="message_p">
							<p>Helooo</p>
						</div>
					</div>
				</div>
                <div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Joseph</h4>
							<p class="time">08/10/2021</p>
						</div>
						<div class="message_p">
							<p>nice to talk with you</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Diana</h4>
							<p class="time">08/10/2021</p>
						</div>
						<div class="message_p">
							<p>please wait...</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Kabir</h4>
							<p class="time">07/10/2021</p>
						</div>
						<div class="message_p">
							<p>Happy Birthday</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Alina Smith</h4>
							<p class="time">05/10/2021</p>
						</div>
						<div class="message_p">
							<p>Thank You for the Help</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Ash</h4>
							<p class="time">02/10/2021</p>
						</div>
						<div class="message_p">
							<p>Hi, i found you on justdial</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Olivia</h4>
							<p class="time">09/28/2021</p>
						</div>
						<div class="message_p">
							<p>Send for processing</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Amelia</h4>
							<p class="time">09/28/2021</p>
						</div>
						<div class="message_p">
							<p>Helooo</p>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="imgbx">
						<img src="img.jpg" class="cover"/>
					</div>
					<div class="details">
						<div class="listHead">
							<h4>Kumar</h4>
							<p class="time">09/23/2021</p>
						</div>
						<div class="message_p">
							<p>oh okay, hope get better soon</p>
						</div>
					</div>
				</div>
          {messages.map((message, index) => (
            <div
              key={index}
              className="chatListItem"
              onClick={() => console.log("Clicked on chat:", message.user)}
            >
              {message.user}
            </div>
          ))}
        </div>
      </div>
      <div className="mainContent">
        <div className="chatBox">
          {/* Chat messages */}
          <div class="message my_message">
					<p>Hi<br /><span>12:15</span></p>
				</div>
				<div class="message frnd_message">
					<p>Whats up<br /><span>12:15</span></p>
				</div>
				<div class="message my_message">
					<p>Hello<br /><span>12:15</span></p>
				</div>
				<div class="message frnd_message">
					<p>whatsup<br /><span>12:15</span></p>
				</div>
				<div class="message my_message">
					<p>Hola<br /><span>12:15</span></p>
				</div>
				<div class="message frnd_message">
					<p>sup<br /><span>12:15</span></p>
				</div>
				<div class="message my_message">
					<p>???<br /><span>12:15</span></p>
				</div>
				<div class="message frnd_message">
					<p>Hi?<br /><span>12:15</span></p>
				</div>
				<div class="message my_message">
					<p>ok<br /><span>12:15</span></p>
				</div>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`message ${message.user === "Anonymous" ? "my_message" : "frnd_message"}`}
            >
              <p>{message.content}<br /><span>{message.timestamp}</span></p>
            </div>
          ))}
        </div>
        {/* Input area for sending messages */}
        <div className="chatBox_input">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(newMessage);
                setNewMessage("");
              }
            }}
          />
          <button onClick={() => sendMessage(newMessage)}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
