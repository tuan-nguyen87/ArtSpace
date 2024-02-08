import React, {useState, useEffect} from "react";
import socketIOClient from "socket.io-client";
import "./styles/msg.css";

const MessagingPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = socketIOClient("http://localhost:3000");

  useEffect(() => {

    //Listen for "chat messages" event from server
    socket.on("chat message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    //Listen for "load messages" event from server
    socket.on("load messages", (loadedMessages) => {
        setMessages(loadedMessages);
    });

    //Clean up the socket connection on component unmount
    return() => {
        socket.disconnect();
    };
  }, []);


  const sendMessage = (content) => {
    if (content.trim() !== "") {
      const socket = socketIOClient("http://localhost:3000");
      const message = { user: "Anonymous", content };

      // Emit the message to the server
      socket.emit("chat message", message);

      // Update the local state with the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  
    return (
    <><div className="msg_container">
          <div className="leftSide">
              <div className="header">
                  <div className="userimg">
                      <img src="/images/user1.jpg" className="cover" alt=""/>
                  </div>
                  <ul className="nav_icons">
                      <li><ion-icon name="scan-circle-outline"></ion-icon></li>
                      <li><ion-icon name="chatbox"></ion-icon></li>
                      <li><ion-icon name="ellipsis-vertical"></ion-icon></li>
                  </ul>
              </div>
              <div className="search_chat">
                  <div>
                      <input type="text" placeholder="Search or start new chat"/>
                          <ion-icon name="search-outline"></ion-icon>
                  </div>
              </div>
              <div className="chatlist">
                  <div className="block active">
                      <div className="imgbx">
                          <img src="/images/img1.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>M. Lee</h4>
                              <p className="time">10:50</p>
                          </div>
                          <div className="message_p">
                              <p>Hey how are you?</p>
                          </div>
                      </div>
                  </div>
                  <div className="block unread">
                      <div className="imgbx">
                          <img src="/images/img2.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>John M.</h4>
                              <p className="time">09:56</p>
                          </div>
                          <div className="message_p">
                              <p>What's up? It's been a long time.</p>
                              <b>1</b>
                          </div>
                      </div>
                  </div>
                  <div className="block unread">
                      <div className="imgbx">
                          <img src="/images/img3.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Valerie R.</h4>
                              <p className="time">Yesterday</p>
                          </div>
                          <div className="message_p">
                              <p>Pls lmk</p>
                              <b>2</b>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img4.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Sarah G.</h4>
                              <p className="time">Yesterday</p>
                          </div>
                          <div className="message_p">
                              <p>Thanks alot. I appreciate it.</p>
                          </div>
                      </div>
                  </div>
                  <div className="block unread">
                      <div className="imgbx">
                          <img src="/images/img5.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Tomas</h4>
                              <p className="time">Yesterday</p>
                          </div>
                          <div className="message_p">
                              <p>Helloooo</p>
                              <b>4</b>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img6.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Mark Johnson</h4>
                              <p className="time">01/10/2024</p>
                          </div>
                          <div className="message_p">
                              <p>nice to talk with you</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img7.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Melissa R.</h4>
                              <p className="time">01/20/2024</p>
                          </div>
                          <div className="message_p">
                              <p>Not sure if you wna meet in person or over zoom. But lmk asap. I have a lot to do this week</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img8.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Laila</h4>
                              <p className="time">01/15/2024</p>
                          </div>
                          <div className="message_p">
                              <p>Gimme a call when you have a chance pls</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img9.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Will B.</h4>
                              <p className="time">02/01/2024</p>
                          </div>
                          <div className="message_p">
                              <p>Thank You for the Help</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img2.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Leo B.</h4>
                              <p className="time">02:10</p>
                          </div>
                          <div className="message_p">
                              <p>Hope all is well</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img3.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Marley J.</h4>
                              <p className="time">11:34</p>
                          </div>
                          <div className="message_p">
                              <p>In person or Zoom?</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img4.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Amy</h4>
                              <p className="time">01/02/24</p>
                          </div>
                          <div className="message_p">
                              <p>Sounds good. Ty</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img5.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Ryry</h4>
                              <p className="time">07:29</p>
                          </div>
                          <div className="message_p">
                              <p>oh okay, hope you get better soon</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img6.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Jojo</h4>
                              <p className="time">01/31/24</p>
                          </div>
                          <div className="message_p">
                              <p>Nice!</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img7.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Jade</h4>
                              <p className="time">12/09/2024</p>
                          </div>
                          <div className="message_p">
                              <p>I'll send it asap</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img8.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Brad N</h4>
                              <p className="time">04:20</p>
                          </div>
                          <div className="message_p">
                              <p>Happy Birthday</p>
                          </div>
                      </div>
                  </div>
                  <div className="block">
                      <div className="imgbx">
                          <img src="/images/img9.jpg" className="cover" alt=""/>
                      </div>
                      <div className="details">
                          <div className="listHead">
                              <h4>Allison Smith</h4>
                              <p className="time">01/30/24</p>
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
                  <div className="imgText">
                      <div className="userimg">
                          <img src="/images/img1.jpg" className="cover" alt=""/>
                      </div>
                      <h4>M. Lee<br /><span>online</span></h4>
                  </div>
                  <ul className="nav_icons">
                      <li><ion-icon name="search-outline"></ion-icon></li>
                      <li><ion-icon name="ellipsis-vertical"></ion-icon></li>
                  </ul>
              </div>


              <div className="chatBox">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`message ${message.user === "Anonymous" ? "my_message" : "frnd_message"}`}
                  >
                    <p>{message.content}<br /><span>{message.timestamp}</span></p>
                  </div>
                ))}
              </div>


              <div className="chatBox_input">
                  <ion-icon name="happy-outline"></ion-icon>
                  <ion-icon name="attach-outline"></ion-icon>
                  <input 
                    type="text" 
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) =>{
                        if (e.key === "Enter") {
                            sendMessage(newMessage);
                            setNewMessage(""); // Clear the input field
                          }
                    }}
                 />
                      <ion-icon name="mic"></ion-icon>
              </div>
          </div>
      </div><script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script><script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script></>
  );
};

export default MessagingPage;
