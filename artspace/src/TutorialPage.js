//react 
import React from 'react';
import './styles/Tutorial.css';

function Tutorial() {
  return (
    <div className="tutorial-body">
      <hr className="hr"></hr>
      <div className="tutorial-container">
        {/*<hr className="hr"></hr>*/}
        <div className="section-header">
          Explore | Tutorial
        </div>
        <main>
          <div className="quadrant">
            <img src="/Tutorial art/navigation-site-map.png" alt="Navigation Site" />
            <a>Navigation Site</a>
          </div>
          <div className="quadrant">
            <img src="/Tutorial art/art-tutorials-image.png" alt="Art Tutorials" />
            <a>Art Tutorials</a>
          </div>
          <div className="quadrant">
            <img src="/Tutorial art/educational-content-image.png" alt="Educational Content" />
            <a>Educational Content</a>
          </div>
          <div className="quadrant">
            <img src="/Tutorial art/resourceful-links-image.png" alt="Resourceful Links" />
            <a>Resourceful Links</a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tutorial;
