import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const VotePage = ({ title }) => {
    // Use useLocation to access the state passed from the previous component
    const location = useLocation();
    const { competitionTitle, competitionDescription, artwork } = location.state;

    // State to track the number of votes for each artwork
    const [votes, setVotes] = useState(Array(artwork.length).fill(0));

    // Function to handle voting for a specific artwork
    const handleVote = (index) => {
        // Increment the number of votes for the artwork at the given index
        const newVotes = [...votes];
        newVotes[index]++;
        setVotes(newVotes);
    };

    // Implement logic to display competition details, artwork, and provide a way to vote
    return (
        <div>
            <h1>{competitionTitle}</h1>
            <p>{competitionDescription}</p>
            {/* Display artwork */}
            {artwork.map((art, index) => (
                <div key={index}>
                    <img src={art.url} alt={`Artwork ${index + 1}`} />
                    {/* Display the number of votes for the artwork */}
                    <p>Votes: {votes[index]}</p>
                    {/* Implement voting functionality */}
                    <button onClick={() => handleVote(index)}>Vote</button>
                </div>
            ))}
        </div>
    );
};

export default VotePage;
