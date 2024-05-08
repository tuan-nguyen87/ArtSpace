import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./styles/VotePage.css";

const ArtCard= ({ artist, imageSrc, description}) =>  {
  return (
    <div className="artcard">
      <img className="card-image" src={imageSrc} alt=""/>
      <div className="card-header">
          <h3>{artist}</h3>
          <p>{description}</p>
      </div>
    </div>
  );
}
const VotePage = () => { //jennifer - removed competitionTitle inside the parathesis
  const location = useLocation();
  const { competitionTitle, competitionDescription, competitionPoints} = location.state; //jennifer -moved competitionTitle here

  // State to track the number of votes for each artwork
  // const [votes, setVotes] = useState(Array(artwork.length).fill(0));
  const imagevotes = [];
  const [votes, setVotes] = [imagevotes];

  // Function to handle voting for a specific artwork
  const handleVote = (index) => {
    // Increment the number of votes for the artwork at the given index
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  // Implement logic to display competition details, artwork, and provide a way to vote
  return (
    <div className="vote-container">
      <div className="top-desc">
        <h1>{competitionTitle}</h1>
        <p>{competitionDescription}</p>
        <p>Grand Prize!: {competitionPoints} pts</p>
      </div>
      <div className="chal-image-cards">
        {/* Display artwork in cards */}
        <ArtCard
            artist="Jane Doe"
            imageSrc="/Arena art/4-Panel-Life.png"
            description="This is a test!"
        />
        <ArtCard
            artist="Jane Doe"
            imageSrc="/Arena art/4-Panel-Life.png"
            description="This is a test!"
        />
        <ArtCard
            artist="Jane Doe"
            imageSrc="/Arena art/4-Panel-Life.png"
            description="This is a test!"
        />
        <ArtCard
            artist="Jane Doe"
            imageSrc="/Arena art/4-Panel-Life.png"
            description="This is a test!"
        />
        <ArtCard
            artist="Jane Doe"
            imageSrc="/Arena art/4-Panel-Life.png"
            description="This is a test!"
        />
        <ArtCard
            artist="Jane Doe"
            imageSrc="/Arena art/4-Panel-Life.png"
            description="This is a test!"
        />
      </div>
    </div>
  );
};

export default VotePage;


// {artwork.map((art, index) => (
//   <div key={index}>
//     <img src={art} alt={`Artwork ${index + 1}`} />
//     {/* Display the number of votes for the artwork */}
//     <p>Votes: {votes[index]}</p>
//     {/* Implement voting functionality */}
//     <button onClick={() => handleVote(index)}>Vote</button>
//   </div>
// ))}