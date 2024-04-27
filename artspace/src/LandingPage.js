import React, { useState, useEffect } from "react";
import "./styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const getDeveloperProfileImageUrl = async (developerID) => {
  const developerRef = ref(storage, `${developerID}/profile-picture.jpg`);
  const url = await getDownloadURL(developerRef);
  return url;
};

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const performSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search`);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [developerID] = useState([
    'jFug2d9bhAZCZ4Dt7g6b8c1SkHK2',
    'h6ivhFw60BN3Eo6Ai8o0saDVjQ73',
    'aHiUmTvYyyYt5femAM7mK2VC2OF2',
    'uZmTRz7zsdQCVGz7KsFAcM8S9Tc2',
    'C2ofxCQZ0NMFu4QB98sW37gjnlB2',
    '99DeVnSL8TZMXfAUOBb4C07KO5p1',
    '3desXwADbUfKbu25QrFyUKaUMfx1'
  ]);

  const [developerProfileImages, setDeveloperProfileImages] = useState([]);

  useEffect(() => {
    const fetchDeveloperProfileImages = async () => {
      try {
        const images = await Promise.all(developerID.map(getDeveloperProfileImageUrl));
        setDeveloperProfileImages(images);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeveloperProfileImages();
  }, [developerID]);

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
          {developerProfileImages.map((url, index) => (
            <img
              key={index}
              className="team-images"
              src={url}
              alt={`Profile of developer ${developerID[index]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
