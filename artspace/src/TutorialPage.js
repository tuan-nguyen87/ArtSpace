//react 
import React from 'react';
import './styles/Tutorial.css';

function Tutorial() {
  return (
    <div className="tutorial-container">
      <header>
        <div>
          <img src="/Tutorial art/ArtSpace-Logo-Explore.png" alt="Logo" />
        </div>
      </header>

      <div className="section-header">
        Explore | Tutorials
      </div>

      <main>
        <div className="quadrant">
          <img src="/Tutorial art/navigation-site-map.png" alt="Navigation Site Image" />
          <h3>Navigation Site</h3>
        </div>
        <div className="quadrant">
          <img src="/Tutorial art/art-tutorials-image.png" alt="Art Tutorials Image" />
          <h3>Art Tutorials</h3>
        </div>
        <div className="quadrant">
          <img src="/Tutorial art/educational-content-image.png" alt="Educational Content Image" />
          <h3>Educational Content</h3>
        </div>
        <div className="quadrant">
          <img src="/Tutorial art/resourceful-links-image.png" alt="Resourceful Links Image" />
          <h3>Resourceful Links</h3>
        </div>
      </main>
    </div>
  );
}

export default Tutorial;