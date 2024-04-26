import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./NavigationBar";
import LandingPage from "./LandingPage";
import Commissions from "./Commissions";
import Messaging2 from "./Messaging2";
import Notification from "./Notification";
import DailyChallenge from "./DailyChallenge";
import RatingReview from "./RatingReview";
import TutorialPage from "./TutorialPage";
import ArtistArena from "./ArtistArena";
import ShowroomPage from "./ShowroomPage";
import SocialHub from "./SocialHub";
import Portfolio from "./Portfolio";
import MarketPage from "./MarketPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import Collaborations from "./Collaborations";
import Queue from "./Queue";

import ProfileForSale from "./ProfileForSale";
import VotePage from "./VotePage";
import PointSystem from "./PointSystem";
import NavSite from "./NavSite";
import ArtTutorials from "./ArtTutorials";
import EduCont from "./EduCont";
import ResLinks from "./ResLinks";
import Search from "./Search";

function App() {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type = "info") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000); // Dismiss notification after 3 seconds
  };

  return (
    <div className="App">
      <Notification message={notification.message} type={notification.type} />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Commissions" element={<Commissions />} />
          <Route
            path="/Messaging2"
            element={<Messaging2 triggerNotification={triggerNotification} />}
          />
          <Route path="/DailyChallenge" element={<DailyChallenge />} />
          <Route path="/RatingReview" element={<RatingReview />} />
          <Route path="/TutorialPage" element={<TutorialPage />} />
          <Route path="/ArtistArena" element={<ArtistArena />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/ShowroomPage" element={<ShowroomPage />} />
          <Route path="/SocialHub" element={<SocialHub />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/MarketPage" element={<MarketPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/Collaborations" element={<Collaborations />} />
          <Route path="/Queue" element={<Queue />} />
          <Route path="/PointSystem" element={<PointSystem />} />
          <Route path="/NavSite" element={<NavSite />} />
          <Route path="/ArtTutorials" element={<ArtTutorials />} />
          <Route path="/EduCont" element={<EduCont />} />
          <Route path="/ResLinks" element={<ResLinks />} />
          <Route path="/Search" element={<Search />} />

          <Route path="/ProfileSalePage" element={<ProfileForSale />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
