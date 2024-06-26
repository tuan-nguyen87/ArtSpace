import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./NavigationBar";
import LandingPage from "./LandingPage";
import Commissions from "./Commissions";
import Messaging2 from "./Messaging2";
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
import Payment from "./Payment";
import Receipt from "./Receipt";
import MyCommissions from "./MyCommissions";
import GalleryMarketPage from "./GalleryMarketPage";

function App() {
  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = "info") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); // Dismiss notification after 3 seconds
  };

  // Function to handle new review posted event
  const handleNewReview = () => {
    triggerNotification("A new review is posted!", "review");
  };

  // Function to handle new question posted event
  const handleNewQuestion = () => {
    triggerNotification("A new question is posted!", "question");
  };

  return (
    <div className="App">
      <Router>
        <NavigationBar notification={notification} />
        <Routes>
          <Route path="/reviews" element={<RatingReview onNewReview={handleNewReview} />} />
          <Route path="/questions" element={<SocialHub onNewQuestion={handleNewQuestion} />} />
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
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/ShowroomPage" element={<ShowroomPage />} />
          <Route path="/SocialHub" element={<SocialHub />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/MarketPage" element={<MarketPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/Collaborations" element={<Collaborations />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Payment/:id" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/PointSystem" element={<PointSystem />} />
          <Route path="/NavSite" element={<NavSite />} />
          <Route path="/ArtTutorials" element={<ArtTutorials />} />
          <Route path="/EduCont" element={<EduCont />} />
          <Route path="/ResLinks" element={<ResLinks />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyCommissions" element={<MyCommissions />} />
          <Route path="/GalleryMarketPage" element={<GalleryMarketPage />} />
          <Route path="/ProfileSalePage" element={<ProfileForSale />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
