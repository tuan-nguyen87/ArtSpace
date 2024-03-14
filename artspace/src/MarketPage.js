//react
import React, { useState, useEffect } from 'react';
import './styles/Market.css'; // Import CSS file

const MarketPage = () => {
    // State variables
    const [points] = useState(500);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [pointsRange, setPointsRange] = useState('all');
    const [clickedItem, setClickedItem] = useState(null);
    
    // Dummy data for items
    const [originalItems] = useState ([
        { image: '/Market art/mp1.png', points: 100, category: 'icons' },
        { image: '/Market art/mp5.png', points: 250, category: 'badges' },
        { image: '/Market art/mp10.png', points: 350, category: 'emotes' },
        { image: '/Market art/mp8.png', points: 450, category: 'borders' },
        { image: '/Market art/mp2.png', points: 550, category: 'new-items' },
        { image: '/Market art/mp12.png', points: 650, category: 'icons' },
        { image: '/Market art/mp3.png', points: 750, category: 'badges' },
        { image: '/Market art/mp9.png', points: 850, category: 'emotes' },
        { image: '/Market art/mp4.png', points: 90, category: 'borders' },
        { image: '/Market art/mp11.png', points: 290, category: 'new-items' },
        { image: '/Market art/mp6.png', points: 400, category: 'icons' },
        { image: '/Market art/mp7.png', points: 10, category: 'badges' },
        { image: '/Market art/mp13.png', points: 185, category: 'emotes' }
        // Add more items here
    ]);

    // Function to update points
    /*const updatePoints = (newPoints) => {
        setPoints(newPoints);
    }*/

    const [filteredItems, setFilteredItems] = useState([]);

    // Function to filter items
    // Effect to filter items when selectedCategory or pointsRange changes
    useEffect(() => {
        const filterItems = () => {
            let itemsToShow = originalItems.slice(); // Clone original items

            if (pointsRange !== 'all') {
                if (pointsRange === '200') {
                    itemsToShow = itemsToShow.filter(item => item.points <= 200);
                } else if (pointsRange === '601') {
                    itemsToShow = itemsToShow.filter(item => item.points >= 600);
                } else {
                    const [minPoints, maxPoints] = pointsRange.split('-').map(Number);
                    itemsToShow = itemsToShow.filter(item => item.points >= minPoints && item.points <= maxPoints);
                }
            }

            if (selectedCategory !== 'all') {
                itemsToShow = itemsToShow.filter(item => item.category === selectedCategory);
            }

            /*if (itemsToShow.length === 0) {
                setFilteredItems(['Sorry, no items in this points range.']);
            } else {
                setFilteredItems(itemsToShow);
            }*/

            setFilteredItems(itemsToShow);
        };
        
        filterItems();
    }, [selectedCategory, pointsRange, originalItems]);

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
        setClickedItem(item);
    };

    // Function to handle purchase button
    const purchase = () => {
        console.log("Item purchased!");
    }

    // Function to close popup
    const closePopup = () => {
        setClickedItem(null);
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
            {clickedItem && (
                <div>
                    <div className="mp-popup-overlay"></div>
                    <div className="mp-popup">
                        <div className="mp-popup-header">Great Choice! Are you ready to purchase?</div>
                        <img src={clickedItem.image} alt="Item" />
                        <p>Category: {clickedItem.category}</p>
                        <p>Points: {clickedItem.points}</p>
                        <div className="mp-popup-buttons">
                            <button onClick={purchase}>Purchase</button>
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPage;