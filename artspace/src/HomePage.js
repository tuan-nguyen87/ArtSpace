import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "/Homepage art/sample pic 1.png",
    "/Homepage art/sample pic 2.png",
    "/Homepage art/sample pic 3.png",
    "/Homepage art/sample pic 4.png",
    "/Homepage art/sample pic 5.png",
    "/Homepage art/sample pic 6.png",
  ]; // Array of image filenames

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="homepage-container">
      <div className="left-section">
        <h1>Find the Right Artist for you!</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit"></button>
        </div>
        <div class="button-container">
          <p>Popular Searches:</p>
          <button>Logo Design</button>
          <button>Flyers</button>
          <button>Business Cards</button>
        </div>
      </div>
      <div className="right-section">
        <img
          src={images[imageIndex]}
          alt="Rotating Image"
          className="rotating-image hidden"
        />
      </div>
    </div>
  );
};

export default HomePage;
