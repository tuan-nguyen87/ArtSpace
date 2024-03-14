import React, { useState } from "react";
import "./styles/LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const performSearch = (event) => {
    if (event.key === "Enter") {
      // Perform some processing or logic based on the search term
      // For example, you can check if it matches a specific value or use regular expressions

      // Simulate a simple example by checking for a specific search term
      navigate("/Search");
      // if (searchTerm === "hello") {
      //   setOutput("You typed: " + searchTerm);
    } else {
      setOutput("No matching result for the search term: " + searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="landing-container">
      <div className="main">
        <section className="welcome">
          <h1>Connecting Artists to Clients Everywhere</h1>
          <input
            type="text"
            id="search"
            placeholder="Search ArtSpace"
            value={searchTerm}
            onChange={handleChange}
            onKeyUp={performSearch}
          />
          <p>{output}</p>
        </section>
        <section className="services">
          <h2>Popular:</h2>
          <button type="submit" className="btns">
            Logo Design
          </button>
          <button type="submit" className="btns">
            Flyers
          </button>
          <button type="submit" className="btns">
            Business Cards
          </button>
        </section>
      </div>
      <div className="user-highlight-container">
        {/* Yasmine
          Thinking of making the landing page scrollable. 
          Would include a preview of highly rated artists, and About, and Contact*/}
      </div>
    </div>
  );
};

export default LandingPage;
