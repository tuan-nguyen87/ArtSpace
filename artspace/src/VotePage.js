import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase/Firebase';
import './styles/VotePage.css';

const ArtCard= ({ artist, imageSrc, key}) =>  {
  return (
    <div className="artcard" key={key}>
      <div className="cardWrapper">
        <img className="vote-image" src={imageSrc} alt=""/>
        <div className="cardData">
          <div className="content">
            <span className="artist">{artist}</span>
            {/* Add the clickable heart somewhere in here */}
          </div>
        </div>
      </div>
    </div>
  );
}

const VotePage = () => { //jennifer - removed competitionTitle inside the parathesis
  const location = useLocation();
  const { competitionTitle, competitionDescription, competitionPoints} = location.state; //jennifer -moved competitionTitle here

  // State to track the number of votes for each artwork
  const imagevotes = [];
  const [votes, setVotes] = [imagevotes];
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    // Function to fetch uploaded images for the current user
    const fetchUploadedImages = async () => {
      try {
        // Query Firestore for the 'arena' collection
        const arenaCollectionRef = collection(db, 'arena');
    
        // Get all documents in the 'arena' collection
        const querySnapshot = await getDocs(arenaCollectionRef);
    
        // Array to store all uploaded images from all users
        let allImages = [];
    
        // Iterate through each document in the collection
        querySnapshot.forEach((doc) => {
          // Extract the 'images' array from the document data
          const userData = doc.data();
          const images = userData.images || []; // Default to an empty array if 'images' is not present
          
          // Add the images from this document to the array
          allImages = allImages.concat(images);
        });
    
        // Set the fetched images in state
        setUploadedImages(allImages);
      } catch (error) {
        console.error('Error fetching uploaded images:', error);
      }
    };

    fetchUploadedImages(); // Fetch uploaded images when the component mounts
  }, []);

  // Implement logic to display competition details and images
  // Going to add hearts and counting for points
  // There is a field named 'hearts' in the images array
  return (
    <div className="vote-container">
      <div className="top-desc">
        <h1>{competitionTitle}</h1>
        <p>{competitionDescription}</p>
        <p>Grand Prize!: {competitionPoints} pts</p>
      </div>
      <div className="chal-image-cards">
        {/* Map through uploaded images and render ArtCard for each */}
        {uploadedImages.map((image) => (
          <ArtCard
            key={image.id} // Ensure each ArtCard has a unique key
            artist="Jane Doe" // Artist name is hardcoded for now
            imageSrc={image.image} // image URL is stored in a field named 'image'
          />
        ))}
      </div>
    </div>
  );
};

export default VotePage;