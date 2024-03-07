//react
import React, { useState } from 'react';
import './PointSystem.css'; 

function PointSystem() {
  //some dummy data  
  const [artistData, setArtistData] = useState({
    name: "Artist Name",
    totalPoints: 0,
    dailyLoginPoints: 50,
    loginCount: 10,
    dailyChallengesPoints: 300,
    dailyChallengesCompleted: [
      { name: "Challenge: Environment - A Secret Alley way", points: 100 },
      { name: "Challenge: Character - An Elderly Couple on the Beach", points: 50 },
      { name: "Challenge: Creature - A Mischievous Unicorn", points: 50 },
      { name: "Challenge: Object - Ghost catching thermos :)", points: 25 },
      { name: "Challenge: Creature - Robots doing grocery shopping", points: 25 },
      { name: "Challenge: Environment - A thriving swampland with black willow trees", points: 50 }
    ],
    arenaEventsPoints: 250,
    arenaEventsWon: [
      { name: "Event: Best Comics", points: 200 },
      { name: "Event: Best Design", points: 50 }
    ],
    marketPurchasesPoints: -100,
    marketPurchases: [
      { image: "ps_item2.png", name: "Icon", points: -20 },
      { image: "ps_item5.png", name: "Emote", points: -20 },
      { image: "ps_item3.png", name: "Badge", points: -20 },
      { image: "ps_item1.png", name: "Emote", points: -20 },
      { image: "ps_item4.png", name: "Badge", points: -20 }
    ]
  });

  //for rendering the data 
  const renderList = (data, containerId) => {
    return data.map((item, index) => (
      <p key={index} className="market-item">
        {item.image && <img src={item.image} alt={item.name} className="item-img" />}
        <span>{`${item.name}: ${item.points}`}</span>
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
      <div className="ps-container">
        <div className="header">
          <h1>{artistData.name}</h1>
          <h2>My Total Points: <img src="ps_coin.png" className="ps_coin" alt="ps_Coin" /><span id="total-points">{calculateTotalPoints()}</span></h2>
        </div>
        <div className="grid-container">
          {/* Render other parts of your UI here */}
        </div>
      </div>
    );
  };

  return (
    <body className="ps-body">
      {renderArtistData()}
    </body>
  );
}

export default PointSystem;