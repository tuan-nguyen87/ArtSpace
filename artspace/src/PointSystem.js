//react
import React, { useState, useEffect } from 'react';
import './styles/PointSystem.css'; 
import { auth, db } from "./Firebase/Firebase.js";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";


function PointSystem() {
  // state variables
  const [userName, setUserName] = useState(""); // State to hold the username
  const [totalPoints, setTotalPoints] = useState(0);
  const [marketPurchases, setMarketPurchases] = useState([]);
  const [arenaEventsWon, setArenaEventsWon] = useState([]);
  const [dailyChallengesCompleted, setDailyChallengesCompleted] = useState([]);

  
  // get user name
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "Portfolio", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserName(userData.name || "Guest");
          } else {
            setUserName("Guest");
          }
          
          // Check if points document exists for the user
          const pointsDocRef = doc(db, "points", user.uid);
          const pointsDocSnap = await getDoc(pointsDocRef);
          if (!pointsDocSnap.exists()) {
            // Points document doesn't exist, create it with initial data
            await setDoc(pointsDocRef, { 
              totalPoints: 200, // set to 200 for demo
              marketPurchases: [],
              arenaEventsWon: [],
              dailyChallengesCompleted: []
            }); 
          }
          
          // Fetch points data
          if (pointsDocSnap.exists()) {
            const pointsData = pointsDocSnap.data();
            setTotalPoints(pointsData.totalPoints || 0);
            setMarketPurchases(pointsData.marketPurchases || []);
            setArenaEventsWon(pointsData.arenaEventsWon || []);
            setDailyChallengesCompleted(pointsData.dailyChallengesCompleted || []);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserName("Guest");
        setTotalPoints(0);
        setMarketPurchases([]);
        setArenaEventsWon([]);
        setDailyChallengesCompleted([]);
      }
    });

    return () => unsubscribe();
  }, []);

  /*//some dummy data  
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
  });*/

  //for rendering the data 
  const renderList = (data, containerId) => {
    return data.map((item, index) => (
      <p key={index} className="market-item">
        {item.image && <img src={item.image} alt={item.name} className="item-img" />}
        <span>{`${item.category}: ${item.points}`}</span>
      </p>
    ));
  };

  //to calculate the total points
  /*const calculateTotalPoints = () => {
    let totalPoints = 0;
    totalPoints += artistData.dailyLoginPoints;
    totalPoints += artistData.dailyChallengesPoints;
    totalPoints += artistData.arenaEventsPoints;
    totalPoints += artistData.marketPurchasesPoints;
    return totalPoints;
    return marketPurchases.reduce((total, item) => total + Math.abs(item.points), 0);
  };*/

  // calculate total points earned from daily challenges
  const calculateDailyChallengesPoints = () => {
    return dailyChallengesCompleted.reduce((total, item) => total + item.points, 0);
  };
  
  // calculated total points earned from arena events
  const calculateArenaEventsPoints = () => {
    return arenaEventsWon.reduce((total, item) => total + item.points, 0);
  };
  
  // calculate total points used for market purchases
  const calculateMarketPurchasesPoints = () => {
    return marketPurchases.reduce((total, item) => total + Math.abs(item.points), 0);
  };

  //display data
  return (
    <div className="ps-body">
      <div className="ps-container">
        <div className="ps-header">
          <h1>{userName}</h1>
          <h3>My Total Points: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="total-points">{totalPoints}</span></h3>
        </div>
        <div className="ps-grid-container">
          <div className="ps-grid-item">
            <h3>Daily Challenges</h3>
            <div>Total Points Earned: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="daily-challenges-points">{calculateDailyChallengesPoints()}</span></div>
          </div>
            <div className="ps-grid-item ps-scroll-container">
              {renderList(dailyChallengesCompleted)}
          </div>
          <div className="ps-grid-item">
              <h3>Arena Events</h3>
              <div>Total Points Earned: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="arena-events-points">{calculateArenaEventsPoints()}</span></div>
          </div>
          <div className="ps-grid-item ps-scroll-container">
            {renderList(arenaEventsWon)}
          </div>
          <div className="ps-grid-item">
            <h3>Market Purchases</h3>
            <div>Total Points Used: <img src="/PointSystem art/ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="market-purchases-poins">{calculateMarketPurchasesPoints()}</span></div>
          </div>
          <div className="ps-grid-item ps-scroll-container market-item">
            {renderList(marketPurchases)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointSystem;

