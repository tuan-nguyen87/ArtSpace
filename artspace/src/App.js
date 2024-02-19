import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./NavigationBar";
import LandingPage from "./LandingPage";
import Commissions from "./Commissions";
import MessagingPage from "./MessagingPage";
import Notification from "./Notification";
import DailyChallenge from "./DailyChallenge";
import RatingReview from "./RatingReview";
import TutorialPage from "./TutorialPage";
import ArtistArena from "./ArtistArena";
import ShowroomPage from './ShowroomPage';
import SocialHub from './SocialHub';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const triggerNotification = (message, type = 'info') => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000); // Dismiss notification after 3 seconds
  };

    useEffect(() => {
    socket.on('newMessage', (data) => {
      triggerNotification(data.message, 'success');
    });
    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="App">
      <Notification message={notification.message} type={notification.type} />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Commissions" element={<Commissions />} />
          <Route path="/MessagingPage" element={<MessagingPage socket={socket} triggerNotification={triggerNotification} />} />
          <Route path="/DailyChallenge" element={<DailyChallenge />} />
          <Route path="/RatingReview" element={<RatingReview />} /> 
          <Route path="/TutorialPage" element={<TutorialPage />} />
          <Route path="/ArtistArena" element={<ArtistArena />} />
          <Route path="/ShowroomPage" element={<ShowroomPage />} />
          <Route path="/SocialHub" element={<SocialHub />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
