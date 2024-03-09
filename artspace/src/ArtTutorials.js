//react
import React from 'react';
import './styles/ArtTutorials.css';

function ArtTutorials() {
  return (
    <div className="at-body">
      <hr className="at-hr" />
      <div className="at-section-header">
        Explore | Tutorials | Art Tutorials
      </div>
      <div className="at-container">
        <h3>Art Tutorials!</h3>
        <div className="p1">Explore Your Creativity with Step-by-Step Guidance</div>
      
        <div className="at-section">
          <div className="h2">Introduction</div>
          <div className="p2">Whether you're a beginner looking to learn the basics or an experienced artist seeking to refine your skills, you'll find something here to inspire and guide you on your artistic journey.</div>
        </div>

        <div className="at-section">
          <div className="h2">Getting Started</div>
          <ol>
            <li><strong>Gather Your Supplies:</strong> Make sure you have all the necessary materials before starting each tutorial. This may include pencils, paper, brushes, paints, etc.</li>
            <li><strong>Set Up Your Workspace:</strong> Find a quiet and comfortable place to work where you can focus without distractions.</li>
            <li><strong>Take Your Time:</strong> Don't rush through the tutorials. Take your time to understand each step and practice until you feel confident.</li>
            <li><strong>Experiment:</strong> Don't be afraid to experiment with different techniques and styles. This is your opportunity to explore and discover what works best for you.</li>
          </ol>
        </div>

        <div className="at-section">
          <div className="h2">Tutorial Categories</div>
          <ol>
            <li>
              <h1>Drawing Tutorials</h1>
              <ul>
                <li><a href="https://drawingacademy.com/how-to-draw-a-portrait">How to Draw a Portrait</a></li>
                <li><a href="https://www.youtube.com/watch?v=QXLmtukYU3s">Step-by-Step Guide to Sketching Landscapes</a></li>
                <li><a href="https://www.youtube.com/watch?v=HQYHH3UUnAY">Mastering Perspective Drawing</a></li>
                <li><a href="https://www.youtube.com/watch?v=mA77noU56_8">Drawing Animals: Basic</a></li>
              </ul>
            </li>

            <li>
              <h1>Painting Tutorials</h1>
              <ul>
                <li><a href="https://www.youtube.com/watch?v=ZfZKzTR2YqE">Introduction to Acrylic Painting Techniques</a></li>
                <li><a href="https://www.strathmoreartist.com/blog-reader/id-7-watercolor-tips-for-beginners">Watercolor Basics: Tips for Beginners</a></li>
                <li><a href="https://realismtoday.com/depth-oil-painting-for-beginners/">Oil Painting: Creating Depth and Texture</a></li>
                <li><a href="https://www.youtube.com/watch?v=1s58rW0_LN4">Step-by-Step Guide to Painting Landscapes</a></li>
              </ul>
            </li>

            <li>
              <h1>Digital Art Tutorials</h1>
              <ul>
                  <li><a href="https://www.youtube.com/watch?v=OFw4jcBjQKs">Getting Started with Digital Drawing Tablets</a></li>
                  <li><a href="https://www.youtube.com/watch?v=TeM4jYNin6I">Photoshop Tutorial: Creating Digital Illustrations</a></li>
                  <li><a href="https://www.youtube.com/watch?v=Vn8bj0YpZg4">Introduction to Procreate: Painting on iPad</a></li>
                  <li><a href="https://www.youtube.com/watch?v=Xs3xK6eGxgs">Digital Character Design: From Sketch to Finish</a></li>
              </ul>
            </li>

            <li>
              <h1>Mixed Media Tutorials</h1>
              <ul>
                  <li><a href="https://www.youtube.com/watch?v=d0PLuEf2RXg">Collage Art: Exploring Texture and Composition</a></li>
                  <li><a href="https://www.youtube.com/watch?v=ijq9rqZ0cWs">Mixed Media Techniques for Abstract Art</a></li>
                  <li><a href="https://www.youtube.com/watch?v=2OEMxppCK5I">Combining Watercolor and Ink: Creating Vibrant Artwork</a></li>
                  <li><a href="https://www.artistsandillustrators.co.uk/how-to/masterclass-how-to-create-a-layered-portrait/">Mixed Media Portraits: Adding Depth and Personality</a></li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="at-section">
          <div className="h2">Start Creating!</div>
          <div className="p2">Ready to unleash your creativity? Click on any tutorial to get started, and don't forget to share your artwork here on ArtSpace!</div>
        </div>
      </div>
    </div>
  );
}

export default ArtTutorials;