//react
import React, { useState, useEffect } from 'react';
import './styles/Market.css'; // Import CSS file
import { auth } from './Firebase/Firebase.js';
import { db } from "./Firebase/Firebase.js";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";


const MarketPage = () => {
    // State variables
    const [points, setPoints] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [pointsRange, setPointsRange] = useState('all');
    const [clickedItem, setClickedItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [alreadyPurchaseMessage, setAlreadyPurchaseMessage] = useState(null); // for already purchased message/pop up
    const [morePointsMessage, setMorePointsMessage] = useState(null); // for not enough points message/pop up

    // fetching user points
    useEffect(() => {
        const fetchPoints = async () => {
            try {
                if (!auth.currentUser) return; // Ensure auth.currentUser is available
                const pointsDocRef = doc(db, "points", auth.currentUser.uid);
                console.log("Points Doc Ref:", pointsDocRef); 
                const pointsDocSnap = await getDoc(pointsDocRef);
                console.log("Points Doc Snapshot:", pointsDocSnap);
                if (pointsDocSnap.exists()) {
                    const userData = pointsDocSnap.data();
                    const userPoints = userData.totalPoints;
                    console.log("User Points:", userPoints);
                    setPoints(userPoints);
                } else {
                    console.error("User points data not found");
                }
            } catch (error) {
                console.error("Error fetching user points:", error);
            }
        };
        
        fetchPoints();
    }, [auth.currentUser?.uid]);

    // to display the items from the database/filter options
    useEffect(() => {
        const filterItems = async () => {
            const itemsRef = collection(db, "marketItems");
            const itemsSnapshot = await getDocs(itemsRef);
            let itemsToShow = [];
    
            itemsSnapshot.forEach((doc) => {
                const itemData = doc.data();
                const itemId = doc.id; // Get the document ID
                const item = { id: itemId, ...itemData }; // Include the document ID in the item object
                const itemPoints = itemData.points;
    
                if (
                    (pointsRange === 'all') || 
                    (pointsRange === '200' && itemPoints <= 200) || 
                    (pointsRange === '601' && itemPoints >= 600) || 
                    (pointsRange.includes('-') && 
                        itemPoints >= parseInt(pointsRange.split('-')[0]) && 
                        itemPoints <= parseInt(pointsRange.split('-')[1]))
                ) {
                    if (selectedCategory === 'all' || itemData.category === selectedCategory) {
                        itemsToShow.push(item);
                    }
                }
            });
    
            setFilteredItems(itemsToShow);
        };
        
        filterItems();
    }, [selectedCategory, pointsRange]);
    

    // Function to handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPointsRange('all'); // Reset points range
    };

    // Function to handle points range selection
    const handlePointsRangeChange = (range) => {
        setPointsRange(range);
    };

    // Fucntion to handle item clicked
    const handleItemClick = (item) => {
        setClickedItem({ id: item.id, ...item }); // Ensure the clickedItem object contains the id field
    };
    
    // Function to handle purchases 
    const purchase = async () => {
        try {
            const pointsDocRef = doc(db, "points", auth.currentUser.uid);
            const pointsDocSnap = await getDoc(pointsDocRef);
            if (pointsDocSnap.exists()) {
                const userMarketPurchases = pointsDocSnap.data().marketPurchases;
                
                // Check if the clicked item is already purchased
                const isItemPurchased = userMarketPurchases.some(purchasedItem => purchasedItem.id === clickedItem.id);
                if (isItemPurchased) {
                    // already purchased message
                    setAlreadyPurchaseMessage("Looks like You've Already Purchased this Item!");
                } else {
                    // Check if the user has enough points
                    if (points >= clickedItem.points) {
                        const updatedPoints = points - clickedItem.points;
                        const updatedPurchases = [...userMarketPurchases, clickedItem];
    
                        await updateDoc(pointsDocRef, {
                            totalPoints: updatedPoints,
                            marketPurchases: updatedPurchases
                        });
    
                        setPoints(updatedPoints);
                        setClickedItem(null);
                    } else {
                        //not enough points message
                        setMorePointsMessage("Sorry, You Don't Have Enough Points for this Item!");
                    }
                }
            } else {
                console.error("User points data not found");
            }
        } catch (error) {
            console.error("Error purchasing item:", error);
        }
    };
    
    // Function to close popups
    const closePopup = () => {
        setClickedItem(null);
        setAlreadyPurchaseMessage(null);
        setMorePointsMessage(null);
    };
    

    return (
        <div className="mp-body">
            <div className="mp-hr"></div>
            <div className="mp-section-header">Market</div>
            <div className="sidebar-title">Filters</div>
            <div className="my-points-display">
                <img src="/Market art/stall.png" className="stall" alt="Stall" /> My Points: <img src="/Market art/coin.png" className="coin" alt="Coin"/><span id="points"> {points}</span>
            </div>
            <div className="container">
                <div className="sidebar">
                        <div className="filter-options">
                        <div className="filter-option">
                            <h3>Categories</h3>
                            <ul>
                                <li><input type="checkbox" id="all" onChange={() => handleCategoryChange('all')} checked={selectedCategory === 'all'} /> <label htmlFor="all">All</label></li>
                                <li><input type="checkbox" id="icons" checked={selectedCategory === 'icons'} onChange={() => setSelectedCategory('icons')} /> <label htmlFor="icons">Icons</label></li>
                                <li><input type="checkbox" id="badges" checked={selectedCategory === 'badges'} onChange={() => setSelectedCategory('badges')} /> <label htmlFor="badges">Badges</label></li>
                                <li><input type="checkbox" id="emotes" checked={selectedCategory === 'emotes'} onChange={() => setSelectedCategory('emotes')} /> <label htmlFor="emotes">Emotes</label></li>
                                <li><input type="checkbox" id="borders" checked={selectedCategory === 'borders'} onChange={() => setSelectedCategory('borders')} /> <label htmlFor="borders">Borders</label></li>
                                <li><input type="checkbox" id="new-items" checked={selectedCategory === 'new-items'} onChange={() => setSelectedCategory('new-items')} /> <label htmlFor="new-items">New Items</label></li>
                            </ul>
                        </div>
                        <div className="filter-option">
                            <h3>Points Range</h3>
                            <select id="points-range" value={pointsRange} onChange={(e) => handlePointsRangeChange(e.target.value)}>
                                <option value="all">All</option>
                                <option value="200">200 or less</option>
                                <option value="201-300">201 - 300</option>
                                <option value="301-400">301 - 400</option>
                                <option value="401-500">401 - 500</option>
                                <option value="501-600">501 - 600</option>
                                <option value="601">600 or more</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="items-container">
                    {filteredItems.length === 0 ? (
                        <div className='empty-message'>
                            <p>Sorry, no items in this points range.</p>
                        </div>
                    ) : (
                        filteredItems.map((item, index) => (
                            <div className="clickable-item" onClick={() => handleItemClick(item)} key={index}>
                                <div className="item mp-hvr-float-shadow" key={index}>
                                    <img src={item.image} alt="Item" />
                                    <p><img src="/Market art/coin.png" className="coin" alt="Coin" /> {item.points}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/*pop up for clicked item/ready to purchase*/}
            {clickedItem && (
                <div>
                    <div className="mp-popup-overlay"></div>
                    <div className="mp-popup">
                        <div className="mp-popup-header">Great Choice! Are you ready to purchase?</div>
                        <img src={clickedItem.image} alt="Item" />
                        <p>Category: {clickedItem.category}</p>
                        <p>Points: <img src="/Market art/coin.png" className="coin" alt="Coin" /> {clickedItem.points}</p>
                        <div className="mp-popup-buttons">
                            <button onClick={purchase}>Purchase</button>
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            {/*pop up for already purchased item*/}
            {alreadyPurchaseMessage && (
                <div>
                    <div className="mp-popup-overlay"></div>
                    <div className="mp-popup">
                        <div className="mp-popup-header">{alreadyPurchaseMessage}</div>
                        <p>Check out your My Points page to see your purchases!</p>
                        <div className="mp-popup-buttons">
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            {/*pop up for not enough points*/}
            {morePointsMessage && (
                <div>
                    <div className="mp-popup-overlay"></div>
                    <div className="mp-popup">
                        <div className="mp-popup-header">{morePointsMessage}</div>
                        <p>Earn more points by participating in Arena Events!</p>
                        <div className="mp-popup-buttons">
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPage;