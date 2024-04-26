import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "./Firebase/Firebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

import "./styles/ArtistArena.css";

// Attempt at reducing repetitions
const CompetitionCard = ({ title, imageSrc, date, intro, description, maxPoints}) => {
    const navigate = useNavigate();

    // Function to navigate to the VotePage with competition details
    const navigateToVotePage = () => {
        navigate(`/vote`, { state: { competitionTitle: title, competitionDescription: description, artwork: imageSrc } });
        };

    const initialImages = [];
    const [userID, setUserID] = useState(null);
    const [images, setImages] = useState(initialImages);

    useEffect(() => {
        // Authentication listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUserID(user.uid);
            const userDocRef = doc(db, "Arena", user.uid);
            const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              setImages(userData.images || initialImages);
            } else {
              console.log("No such document!");
            }
          });
          return () => unsubscribeSnapshot();
        } else {
          setUserID(null);
        }
      });
    
        // Retrieve image URLs from local storage when component mounts -- Yasmine
        const storedImages = localStorage.getItem("uploadedImages");
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          // Filter out images that do not exist in storage
          const existingImages = parsedImages.filter(image => {
            const imageRef = ref(storage, image);
            return getDownloadURL(imageRef).then(() => true).catch(() => false);
          });
          setImages(existingImages);
          localStorage.setItem("uploadedImages", JSON.stringify(existingImages));
        }
        return () => unsubscribe();
    }, []);

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const storageRef = ref(storage, `${userID}/arena-images/${file.name}`); // Set the storage path for work images
    
        // Ensure a file is selected -- Yasmine
        if (!file) {
          console.error("No file selected.");
          return;
        }
        
        // Upload file to Firebase Storage
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            // Get the download URL of the uploaded image
            // Save image URL to local storage after successful upload
            getDownloadURL(storageRef).then((downloadURL) => {
              // Update state with the new image URL
              const updatedImages = [...images, downloadURL];
              console.log("Download URL:", downloadURL);
              // I got the images to persist after reload!! -- Yasmine
              setImages(updatedImages);
              localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
            })
            .catch((error) => {
              console.error("Error getting download URL: ", error);
            });
          })
          // Included more error handling -- Yasmine
          .catch((error) => {
            console.error("Error uploading work image: ", error);
          });
      }
    
    // const handleVoteClick = () => {
    //     const competitionTitle = title;
    //     const competitionDescription = description;
    //     const artwork = [{ url: imageSrc }];
    
    //     navigate("/vote", { state: { competitionTitle, competitionDescription, artwork } });
    // };

    return (
        <div className="card">
            <img className="card-image" src={imageSrc} alt=""/>
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-content">
                <p>{intro}</p>
                <div className="popbox">
                    <a className="popbutton" href={`#popup-${title}`}>Compete!</a>
                </div>
                <div id={`popup-${title}`} className="overlay">
                    <div className="popup">
                        <div className="left-content">
                            <img className="popimages" src={imageSrc} alt=""/>
                            <p>Date: {date}</p>
                            <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> {maxPoints}</p>
                        </div>
                        <a className="close" href="#">&times;</a>
                        <div className="right-content">
                            <h2>{title}</h2>
                            <p className="desc">{description}</p>
                        </div>
                        <div className="buttons">
                            <button className="upload" onClick={() => document.getElementById("file-upload").click()}>Upload</button>

                            {/* The hidden file input */}
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />
                            {/* <button className="vote" onClick={handleVoteClick}>Vote!</button> */}
                            <button className="vote" onClick={navigateToVotePage}>Vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

//Winners Card component populated with winner data -- firstPlaceImage, secondPlaceImage, thirdPlaceImage, winner1, description1 
const WinnerCard = ({ title, coverImageSrc, intro, winners}) => {
    return (
        <div className="card">
            <img className="card-image" src={coverImageSrc} alt=""/>
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-content">
                <p>{intro}</p>
                <div className="popbox">
                    <a className="popbutton" href={`#popup-${title}`}>View!</a>
                </div>
                <div id={`popup-${title}`} className="overlay">
                    <div className="popup">
                        <div className="content">
                            {winners.map((winner, index) => (
                                <div key={index} className="place-sec">
                                    <div className="left-content">
                                        <h2>{index + 1}st Place</h2>
                                        <img className="popimages" src={winner.image} alt=""/>
                                    </div>
                                    <div className="right-content">
                                        <h2>{winner.name}</h2>
                                        <p>{winner.description}</p>
                                        <img className="winner-image" src={winner.pimage} alt=""></img>
                                    </div>
                                </div>
                            ))}
                            <div className="buttons">
                                    <button className="mentions">Honorable Mentions</button>
                            </div>
                        </div>
                        <a className="close" href="#">&times;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArtistArena = () => {
    return(
        <div className="arena-bg">
            <div className="arena-container">
                <div className="arena-section-header">
                    Interact | Artist Arena
                </div>

                <div className="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>This Week</h3>
                    <div className="timeframe-line-bottom"></div>
                    <CompetitionCard
                        title="4 Panel Comic"
                        imageSrc="/Arena art/4-Panel-Life.png"
                        date="Mar 9, 2024"
                        intro="Tell a story in 4 pictures!"
                        description="A picture is worth a thousand words. What can you say in four?
                        Tell us your story using only four pannels!"
                        maxPoints="200"
                    />
                    
                    <CompetitionCard
                        title="Character Design"
                        imageSrc="/Arena art/Char-Design.png"
                        date="Mar 9, 2024"
                        intro="Characters that leap off the page!"
                        description="Dive into the depths of your creativity and bring 
                        forth a character that resonates with you. 
                        Consider their appearance, quirks, and backstory, 
                        allowing their personality to shine through."
                        maxPoints="400"
                    />

                    <CompetitionCard
                        title="Mythical Creatures"
                        imageSrc="/Arena art/creature.png"
                        date="Mar 10, 2024"
                        intro="Creatures, big and small, cute and creepy!"
                        description="Bring creatures of myth to life! 
                        Be they original creations or legends of old, 
                        challenge yourself to create creatures that inspire!"
                        maxPoints="300"
                    />
                </div>
                
                <div className="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Upcoming</h3>
                    <div className="timeframe-line-bottom"></div>

                    <CompetitionCard
                        title="March of Robots"
                        imageSrc="Arena art/robomarch.jpg"
                        date="Mar 31, 2024"
                        intro="The robot uprising is underway! How many unique robots can you build?"
                        description="A robot a day keeps the people away! Grow your 
                        army of unique robots and forward march!"
                        maxPoints="200"
                    />

                    <CompetitionCard
                        title="Wizard April"
                        imageSrc="/Arena art/WIZARD.png"
                        date="April 30, 2024"
                        intro="Wands, potions, and pointy hats! Showcase the magic of your creativity!"
                        description="Let Wizard April ignite your creativity, 
                        as you delve into the realms of fantasy, 
                        weaving spells with your brush or pen to bring 
                        captivating tales of sorcery and wonder to life 
                        on canvas or paper. Don your wizard's hat, 
                        wield your artistic wand, and embark on an 
                        enchanting adventure that will leave a lasting 
                        mark on both your artistry and imagination."
                        maxPoints="400"
                    />

                    <CompetitionCard
                        title="Inky April"
                        imageSrc="/Arena art/inkyapril.png"
                        date="April 30, 2024"
                        intro="Pen to paper! Create inky masterpieces!"
                        description="Immerse yourself in the captivating world of ink 
                        and pen! Challenge your artistic skills by 
                        embracing the simplicity and boldness of these 
                        traditional tools, allowing your imagination to 
                        flow freely as you create intricate and mesmerizing 
                        artworks that truly come to life on paper."
                        maxPoints="550"
                    />
                </div>
                <div className="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Winners</h3>
                    <div className="timeframe-line-bottom"></div>

                    <WinnerCard
                        title="Best Comic Covers"
                        coverImageSrc="/Arena art/best-comic.png"
                        intro="This cycles voted best comic cover artists!"
                        winners={[
                            { name: "Jessica Bail", image: "/Arena art/cover1.jpg", description:"Superman", pimage:"/Arena art/User_Icon.png" },
                            { name: "John Doe", image: "/Arena art/cover2.png", description:"Spider-Punk", pimage:"/Arena art/User_Icon.png" },
                            { name: "Jane Doe", image: "/Arena art/cover3.jpg", description:"Godzilla", pimage:"/Arena art/User_Icon.png" },
                            // Add more winners as needed
                        ]}
                    />

                    <WinnerCard
                        title="Best Design"
                        coverImageSrc="/Arena art/design.jpg"
                        intro="This cycles voted best design artists!"
                        winners={[
                            { name: "Tammy Thompson", image: "/Arena art/design1.jpg", description:"The Wolf", pimage:"/Arena art/User_Icon.png" },
                            { name: "John Doe", image: "/Arena art/design2.png", description:"General Desc", pimage:"/Arena art/User_Icon.png" },
                            { name: "Jane Doe", image: "/Arena art/design3.png", description:"General Desc", pimage:"/Arena art/User_Icon.png" },
                            // Add more winners as needed
                        ]}
                    />
                </div>
            </div> 
        </div>
    ); 
};

export default ArtistArena;