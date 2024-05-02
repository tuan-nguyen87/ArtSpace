//react
import React, { useState, useEffect } from 'react';
import './styles/Showroom.css';
import { db, auth } from "./Firebase/Firebase.js";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { doc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs, getDoc } from "firebase/firestore";

// shuffle the users in the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function ShowroomPage() {
    const [selectedCategory, setSelectedCategory] = useState('Featured');
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTitle, setActiveTitle] = useState('Featured'); // state for active title
    const [artwork, setArtwork] = useState([]);
    const [user, setUser] = useState(null);
    const userIds = shuffleArray([
        //{ id: 'jFug2d9bhAZCZ4Dt7g6b8c1SkHK2', name: 'LouDog95'},
        { id: 'h6ivhFw60BN3Eo6Ai8o0saDVjQ73', name: 'JamminYammin'},
        { id: 'aHiUmTvYyyYt5femAM7mK2VC2OF2', name: 'JC'},
        { id: 'uZmTRz7zsdQCVGz7KsFAcM8S9Tc2', name: 'Joker'},
        { id: 'C2ofxCQZ0NMFu4QB98sW37gjnlB2', name: 'Bobby3218'},
        { id: '99DeVnSL8TZMXfAUOBb4C07KO5p1', name: 'Euniva'},
    ]);

    useEffect(() => {
        // Fetch images based on the selected category
        const fetchImages = async () => {
            try {
                const storage = getStorage();
                let images = [];
                
                // fetch from users work-images folder
                for (const { id } of userIds) {
                    const imagesRef = ref(storage, `${id}/work-images`);
                    const imagesList = await listAll(imagesRef);

                    switch (selectedCategory) {
                        // randomly display fetched images from users
                        case 'Featured':
                            const randomImageRefs = imagesList.items.sort(() => 0.5 - Math.random());
                            images.push(...(await Promise.all(randomImageRefs.map(async (imageRef) => {
                                const imageUrl = await getDownloadURL(imageRef);
                                const artistName = userIds.find(user => user.id === id).name; 
                                return { imageUrl, artistName };
                            }))));
                            break;
                        // display the newest uploaded image from users based on the upload date
                        // ive set it to three weeks ago for newest 
                        case 'Newest':
                            const currentDate = new Date();
                            const threeWeeksAgo = new Date(currentDate.getTime() - (21 * 24 * 60 * 60 * 1000)); // Calculate the date three weeks ago
                            const metadataPromises = imagesList.items.map(imageRef => getMetadata(imageRef)); // Fetch metadata for each image
                            const metadataArray = await Promise.all(metadataPromises);
                            const filteredImageRefs = metadataArray.filter(metadata => {
                                return new Date(metadata.timeCreated) > threeWeeksAgo; // Filter images based on creation time
                            }).map(metadata => metadata.fullPath);
                            images.push(...(await Promise.all(filteredImageRefs.map(async (imageRef) => {
                                const imageUrl = await getDownloadURL(ref(storage, imageRef));
                                const artistName = userIds.find(user => user.id === id).name; 
                                return { imageUrl, artistName };
                            }))));
                            break;
                        // display the images with the most views
                        case 'Most Views':
                            const viewsQuery = query(collection(db, 'showroomViews'), orderBy('views', 'desc'), limit(4)); // Limit to top 4 most viewed
                            const viewsSnapshot = await getDocs(viewsQuery);
                            const topViewedImages = await Promise.all(viewsSnapshot.docs.map(async (doc) => {
                                const imageUrl = doc.data().imageUrl;
                                const artistName = doc.data().username; // Get the artist name from the document
                                return { imageUrl, artistName };
                            }));
                            images = [...topViewedImages];
                            break;
                        //display the oldest images from users based on the when it was uploaded(similar to newest tab)
                        //ive set it to beyond three weeks ago for oldest
                        case 'Oldest':
                            const nowDate = new Date();
                            const beyondThreeWeeksAgo = new Date(nowDate.getTime() - (21 * 24 * 60 * 60 * 1000)); // Calculate the date three weeks ago
                            const mdPromises = imagesList.items.map(imageRef => getMetadata(imageRef)); // Fetch metadata for each image
                            const mdArray = await Promise.all(mdPromises);
                            const fiRefs = mdArray.filter(metadata => {
                                return new Date(metadata.timeCreated) < beyondThreeWeeksAgo; // Filter images based on creation time
                            }).map(metadata => metadata.fullPath);
                            images.push(...(await Promise.all(fiRefs.map(async (imageRef) => {
                                const imageUrl = await getDownloadURL(ref(storage, imageRef));
                                const artistName = userIds.find(user => user.id === id).name; 
                                return { imageUrl, artistName };
                            }))));
                            break;
                        default:
                            break;
                    }

                    // shuffle images every time and set amount of images displayed. 30 in featured, 10 each in newest/oldest
                    images = shuffleArray(images).slice(0, selectedCategory === 'Featured' ? 30 : 10);
                }

                setArtwork(images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user); // Set the user state
                await fetchImages(); // Call fetchImages when user is authenticated
            } else {
                setUser(null);
                setArtwork([]);
            }
        });
    
        return () => unsubscribe();
    }, [selectedCategory]);

    // funciton to handle selecting different tabs
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setActiveTitle(category); // update active title when category changes
    };

    // function to handle clicked images
    const handleImageClick = async (imageUrl, artistName) => {
        setSelectedImage(imageUrl);
        if (user) {
            try {
                // Sanitize the imageUrl to remove any invalid characters. make the clicked image url a document
                const sanitizedImageUrl = imageUrl.replace(/[.#$/[\]]/g, '_');
    
                const viewsDocRef = doc(db, 'showroomViews', sanitizedImageUrl);
                const viewsDocSnapshot = await getDoc(viewsDocRef);
                if (viewsDocSnapshot.exists()) {
                    await updateDoc(viewsDocRef, { views: viewsDocSnapshot.data().views + 1 });
                } else {
                    // Store both the sanitized and original URLs in Firestore
                    //sanitized url is the document. original url is to display the image
                    await setDoc(viewsDocRef, { imageUrl: imageUrl, sanitizedImageUrl: sanitizedImageUrl, username: artistName, views: 1 });
                }
            } catch (error) {
                console.error('Error updating views count:', error);
            }
        }
    };
    
    // function to close modal
    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="showroom-body">
            <hr className="showroom-hr"></hr>
            <div className="showroom-section-header">
                Explore | Show Room
            </div>
            
            {/*change a anchor */}
            <div className="showroom-section-titles">
                <div className="showroom-title-line-top"></div>
                <br></br>
                <a className={activeTitle === 'Featured' ? 'active' : ''} onClick={() => handleCategoryChange('Featured')}>Featured</a>
                <a className={activeTitle === 'Newest' ? 'active' : ''} onClick={() => handleCategoryChange('Newest')}>Newest</a>
                <a className={activeTitle === 'Most Views' ? 'active' : ''} onClick={() => handleCategoryChange('Most Views')}>Most Views</a>
                <a className={activeTitle === 'Oldest' ? 'active' : ''} onClick={() => handleCategoryChange('Oldest')}>Oldest</a>
                <br></br>
                <div className="showroom-title-line-bottom"></div>
            </div>

            <div className="artwork-container">
                {artwork.map((item, index) => (
                    <div className="artwork-item" key={index} onClick={() => handleImageClick(item.imageUrl, item.artistName)}>
                        <img src={item.imageUrl} alt={`Artwork ${index + 1}`} />
                        <div className="shrm-overlay">
                            {/* Display the artist's name */}
                            <p>Artist: {item.artistName || 'Unknown'}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for displaying the selected image */}
            {selectedImage && (
                <div className="shrm-modal" onClick={closeModal}>
                    <div className="shrm-modal-content">
                        <span className="shrm-close" onClick={closeModal}>&times;</span>
                        <img src={selectedImage} alt="Expanded artwork" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowroomPage;