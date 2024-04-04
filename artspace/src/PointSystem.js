//react
import React, { useState, useEffect } from 'react';
import './styles/PointSystem.css'; 
import { auth, db } from "./Firebase/Firebase.js";
import { doc, getDoc } from "firebase/firestore";


function PointSystem() {
  const [userName, setUserName] = useState(""); // State to hold the username

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        try {
          const userDocRef = doc(db, "Portfolio", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserName(userData.name);
          } else {
            // User document does not exist
            setUserName("Guest");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      } else {
        // No user is signed in
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);


  //some dummy data  
  const [artistData] = useState({
    name: userName, //update the name with the username
    totalPoints: 0,
    dailyLoginPoints: 50,
    loginCount: 10,
    dailyChallengesPoints: 300,
    dailyChallengesCompleted: [
      { name: "Challenge", details: "Environment - A Secret Alley way", points: 100 },
      { name: "Challenge", details: "Character - An Elderly Couple on the Beach", points: 50 },
      { name: "Challenge", details: "Creature - A Mischievous Unicorn", points: 50 },
      { name: "Challenge", details: "Object - Ghost catching thermos :)", points: 25 },
      { name: "Challenge", details: "Creature - Robots doing grocery shopping", points: 25 },
      { name: "Challenge", details: "Environment - A thriving swampland with black willow trees", points: 50 }
    ],
    arenaEventsPoints: 250,
    arenaEventsWon: [
      { name: "Event", details: "Best Comics", points: 200 },
      { name: "Event", details: "Best Design", points: 50 }
    ],
    marketPurchasesPoints: -100,
    marketPurchases: [
      { image: '/PointSystem art/ps_item2.png', name: "Market", details: "Icon", points: -20 },
      { image: '/PointSystem art/ps_item5.png', name: "Market", details: "Emote", points: -20 },
      { image: '/PointSystem art/ps_item3.png', name: "Market", details: "Badge", points: -20 },
      { image: '/PointSystem art/ps_item1.png', name: "Market", details: "Emote", points: -20 },
      { image: '/PointSystem art/ps_item4.png', name: "Market", details: "Badge", points: -20 }
    ]
  });

  //for rendering the data 
  const renderList = (data, containerId) => {
    return data.map((item, index) => (
      <p key={index} className="market-item">
        {item.image && <img src={item.image} alt={item.name} className="item-img" />}
        <span>{`${item.name}: ${item.details} ${item.points}`}</span>
      </p>
    ));
  };

  //to calculate the total points
  const calculateTotalPoints = () => {
    let totalPoints = 0;
    totalPoints += artistData.dailyLoginPoints;
    totalPoints += artistData.dailyChallengesPoints;
    totalPoints += artistData.arenaEventsPoints;
    totalPoints += artistData.marketPurchasesPoints;
    return totalPoints;
  };

  //display data
  const renderArtistData = () => {
    return (
      <div className="ps-body">
        <div className="ps-container">
          <div className="ps-header">
            <h1>{userName}</h1> {/* Display username */}

            <h3>My Total Points: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="total-points">{calculateTotalPoints()}</span></h3>
          </div>
          <div className="ps-grid-container">
            <div className="ps-grid-item">
              <h3>Daily Logins</h3>
              <div>Total Points Earned: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="daily-login-points">{artistData.dailyLoginPoints}</span></div>
            </div>
            <div className="ps-grid-item ps-scroll-container">
              <h3>Number of Logins: </h3> <span id="login-count">{artistData.loginCount}</span>
            </div>
            <div className="ps-grid-item">
              <h3>Daily Challenges</h3>
              <div>Total Points Earned: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="daily-challenges-points">{artistData.dailyChallengesPoints}</span></div>
            </div>
            <div className="ps-grid-item ps-scroll-container">
              {renderList(artistData.dailyChallengesCompleted, "Challenge: ")}
            </div>
            <div className="ps-grid-item">
              <h3>Arena Events</h3>
              <div>Total Points Earned: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="arena-events-points">{artistData.arenaEventsPoints}</span></div>
            </div>
            <div className="ps-grid-item ps-scroll-container">
              {renderList(artistData.arenaEventsWon)}
            </div>
            <div className="ps-grid-item">
              <h3>Market Purchases</h3>
              <div>Total Points Used: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="market-purchases-poins">{artistData.marketPurchasesPoints}</span></div>
            </div>
            <div className="ps-grid-item ps-scroll-container market-item">
              {renderList(artistData.marketPurchases)}
            </div>
          </div>
        </div>
      </div>
    );
  };

return renderArtistData();

}

export default PointSystem;

