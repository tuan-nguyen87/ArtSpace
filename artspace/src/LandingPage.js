import React, { useState, useEffect } from "react";
import "./styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const getDeveloperProfileImageUrl = async (developerID) => {
  const developerImageRef = ref(storage, `${developerID}/profile-picture.jpg`);
  const url = await getDownloadURL(developerImageRef);
  return url;
};

const developerData = [
  { id: 'jFug2d9bhAZCZ4Dt7g6b8c1SkHK2', name: 'Valeria Ruvalcaba' },
  { id: 'h6ivhFw60BN3Eo6Ai8o0saDVjQ73', name: 'Yasmine Valencia' },
  { id: 'aHiUmTvYyyYt5femAM7mK2VC2OF2', name: 'Jennifer Carrera' },
  { id: 'uZmTRz7zsdQCVGz7KsFAcM8S9Tc2', name: 'Developer 4' },
  { id: 'C2ofxCQZ0NMFu4QB98sW37gjnlB2', name: 'Developer 5' },
  // { id: '99DeVnSL8TZMXfAUOBb4C07KO5p1', name: 'Developer 6' },
  // { id: '3desXwADbUfKbu25QrFyUKaUMfx1', name: 'Developer 7' }
];

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const navigate = useNavigate();

  const performSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search`);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

//   const [developerID] = useState(developerData.map(developer => developer.id));

//   const [developerProfileImages, setDeveloperProfileImages] = useState([]);


  useEffect(() => {
    developerData.forEach(async (developer, index) => {
      const url = await getDeveloperProfileImageUrl(developer.id);
      developerData[index].url = url;
    });
  }, []);

  //   useEffect(() => {
  //     const fetchDeveloperProfileImages = async () => {
  //       try {
  //         const images = await Promise.all(developerID.map(getDeveloperProfileImageUrl));
  //         setDeveloperProfileImages(images);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchDeveloperProfileImages();
  //   }, [developerID]);

  const showName = (index) => {
    setVisibleIndex(index);
  };

  const hideName = () => {
    setVisibleIndex(-1);
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
          <h2> Meet the Team</h2>
          <div className="team">
            {developerData.map((developer, index) => (
              <div
                key={index}
                className="team-image-container"
                onMouseEnter={() => showName(index)}
                onMouseLeave={hideName}
              >
                <img className="team-images" src={developer.url} alt={`Profile of developer ${developer.id}`} />
                <div id={`name-${index}`} className={`team-name ${index === visibleIndex ? "visible" : ""}`}>
                  {developer.name}
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default LandingPage;