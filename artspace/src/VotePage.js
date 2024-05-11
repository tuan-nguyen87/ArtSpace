import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './Firebase/Firebase';
import './styles/VotePage.css';

const ArtCard= ({ artist, imageSrc, imageId}) =>  {

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    // Fetch initial likes count and like status from Firestore
    const fetchLikes = async () => {
      try {
        // Construct the document reference using the user's ID
        const userId = auth.currentUser.uid;
        const docRef = doc(db, 'arena', userId);
  
        // Fetch the document corresponding to the user's ID from Firestore
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          // If the document exists, update likes count and like status
          const userLikes = data.likes || []; // Get the user's likes array
          setLikesCount(userLikes.length); // Update likes count

          // Check if the user has liked the current image
          const isLikedLocalStorage = localStorage.getItem(`isLiked_${imageId}`);
          setIsLiked(isLikedLocalStorage === 'true' || userLikes.includes(imageId)); // Check if the user has liked the current image
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
  
    fetchLikes(); // Call the fetchLikes function when the component mounts
  }, [imageId]); // Include imageId as a dependency to refetch likes when it changes

  const toggleLike = async () => {
    try {
      // Ensure user is authenticated
      if (!auth.currentUser) {
        console.error('User not authenticated.');
        return;
      }
  
      // Update local state
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  
      // Store the like status in localStorage
      localStorage.setItem(`isLiked_${imageId}`, !isLiked);

      // Construct the document reference using the user's ID
      const userId = auth.currentUser.uid;
      const docRef = doc(db, 'arena', userId);
  
      // Fetch current data of the user's document
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
  
      // Find the index of the imageId in the arenaImages array
      const imageIndex = data.arenaImages.findIndex(image => image.imageId === imageId);
  
      // Update hearts count nested inside the arenaImages array
      const updatedHearts = isLiked ? data.arenaImages[imageIndex].hearts - 1 : data.arenaImages[imageIndex].hearts + 1;
  
      // Update the entire arenaImages array with the updated nested field
      const updatedArenaImages = [...data.arenaImages]; // Create a copy of the array
      updatedArenaImages[imageIndex] = { // Update the specific image object
        ...updatedArenaImages[imageIndex],
        hearts: updatedHearts // Update hearts count
      };
  
      // Update the Firestore document with the updated arenaImages array
      await updateDoc(docRef, {
        arenaImages: updatedArenaImages // Update the entire arenaImages array
      });
    } catch (error) {
      console.error('Error updating hearts:', error);
    }
  };
    
  return (
    <div className="artcard" >
      <div className="cardWrapper">
        <img className="vote-image" src={imageSrc} alt=""/>
        <div className="cardData">
          <div className="content">
            <span className="artist">{artist}</span>
            {/* Add the clickable heart somewhere in here */}
            <span className="heart" onClick={toggleLike}>
              {/* Conditional rendering of heart icons based on isLiked state */}
              {isLiked ? (
                <i className="fa-solid fa-heart" id="heartI"></i>
              ) : (
                <i className="fa-regular fa-heart" id="heartI"></i>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const VotePage = () => { //jennifer - removed competitionTitle inside the parathesis
  const location = useLocation();
  const { competitionTitle, competitionDescription, competitionPoints} = location.state; //jennifer -moved competitionTitle here

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const arenaCollectionRef = collection(db, 'arena');
        const querySnapshot = await getDocs(arenaCollectionRef);
  
        let allImages = [];
  
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const arenaImages = userData.arenaImages || []; // Ensure arenaImages is defined and not null
  
          // Iterate over the arenaImages array within each document
          arenaImages.forEach((image) => {
            // Extract challenge, hearts, and imageURL from each image object
            const { challenge, hearts, imageURL, imageId } = image;
  
            // Push the extracted image data into the allImages array
            allImages.push({ challenge, hearts, imageURL, imageId });
          });
        });
  
        // Set the fetched images in state
        setUploadedImages(allImages);
      } catch (error) {
        console.error('Error fetching uploaded images:', error);
      }
    };
  
    fetchUploadedImages(); // Call fetchUploadedImages when the component mounts
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
        {uploadedImages.map((arenaCHImage) => (
          <ArtCard
              key={arenaCHImage.imageId} // Assuming imageId is unique for each image
              artist="Jane Doe" // Artist name is hardcoded for now
              imageSrc={arenaCHImage.imageURL} // image URL is stored in a field named 'imageURL'
              imageId={arenaCHImage.imageId}
            />
        ))}
      </div>
    </div>
  );
};

export default VotePage;