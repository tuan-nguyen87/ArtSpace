import React from 'react';

const VotePage = ({ competitionTitle, competitionDescription, artwork }) => {
    // Implement logic to display competition details, artwork, and provide a way to vote
    return (
        <div>
            <h1>{competitionTitle}</h1>
            <p>{competitionDescription}</p>
            {/* Display artwork */}
            {artwork.map((art, index) => (
                <div key={index}>
                    <img src={art.url} alt={`Artwork ${index + 1}`} />
                    {/* Implement voting functionality */}
                    <button>Vote</button>
                </div>
            ))}
        </div>
    );
};

export default VotePage;
