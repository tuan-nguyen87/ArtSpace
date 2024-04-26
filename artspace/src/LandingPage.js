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
      <div className="team-container">
        <div className="team">
          <h2> Meet the Team</h2>
          <img
            className="team-images"
            src="https://firebasestorage.googleapis.com/v0/b/user-signin-b205b.appspot.com/o/aHiUmTvYyyYt5femAM7mK2VC2OF2%2Fprofile-picture.jpg?alt=media&token=f08517aa-a356-464c-a7f2-c698b4135028"
            alt="Profile Generic"
          />
          <img
            className="team-images"
            src="https://firebasestorage.googleapis.com/v0/b/user-signin-b205b.appspot.com/o/h6ivhFw60BN3Eo6Ai8o0saDVjQ73%2Fprofile-picture.jpg?alt=media&token=9df82f90-9e1a-4e0c-91e0-51899bd0d155"
            alt="Profile Generic"
          />
          <img
            className="team-images"
            src="https://firebasestorage.googleapis.com/v0/b/user-signin-b205b.appspot.com/o/uZmTRz7zsdQCVGz7KsFAcM8S9Tc2%2Fprofile-picture.jpg?alt=media&token=956188b7-ca18-4326-baaa-61b181e23c68"
            alt="Profile Generic"
          />
          <img
            className="team-images"
            src="https://firebasestorage.googleapis.com/v0/b/user-signin-b205b.appspot.com/o/jFug2d9bhAZCZ4Dt7g6b8c1SkHK2%2Fprofile-picture.jpg?alt=media&token=15b29b89-8c04-455f-a34c-2b4f90cfd92c"
            alt="Profile Generic"
          />
          <img
            className="team-images"
            src="https://firebasestorage.googleapis.com/v0/b/user-signin-b205b.appspot.com/o/C2ofxCQZ0NMFu4QB98sW37gjnlB2%2Fprofile-picture.jpg?alt=media&token=899cc651-b015-4d3b-bf07-5bd6140f4346"
            alt="Profile Generic"
          />
          <img
            className="team-images"
            src="https://firebasestorage.googleapis.com/v0/b/user-signin-b205b.appspot.com/o/3desXwADbUfKbu25QrFyUKaUMfx1%2Fprofile-picture.jpg?alt=media&token=1d622c4d-ea22-479e-9a5d-5bc1b56e87e0"
            alt="Profile Generic"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
