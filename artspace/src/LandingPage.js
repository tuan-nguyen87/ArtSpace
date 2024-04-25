import React, { useState } from "react";
import "./styles/LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const performSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search`);
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
    </div>
  );
};

export default LandingPage;
