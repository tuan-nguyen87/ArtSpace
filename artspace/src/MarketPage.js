//react
import React, { useState } from 'react';
import './Market.css'; // Import CSS file

const MarketPage = () => {
    // State variables
    const [points, setPoints] = useState(500);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [pointsRange, setPointsRange] = useState('all');
    const [filteredItems, setFilteredItems] = useState([]);

    // Dummy data for items
    const originalItems = [
        { image: 'mp1.png', points: 100, category: 'icons' },
        { image: 'mp5.png', points: 250, category: 'badges' },
        { image: 'mp10.png', points: 350, category: 'emotes' },
        { image: 'mp8.png', points: 450, category: 'borders' },
        { image: 'mp2.png', points: 550, category: 'new-items' },
        { image: 'mp12.png', points: 650, category: 'icons' },
        { image: 'mp3.png', points: 750, category: 'badges' },
        { image: 'mp9.png', points: 850, category: 'emotes' },
        { image: 'mp4.png', points: 90, category: 'borders' },
        { image: 'mp11.png', points: 290, category: 'new-items' },
        { image: 'mp6.png', points: 400, category: 'icons' },
        { image: 'mp7.png', points: 10, category: 'badges' },
        // Add more items here
    ];

    // Function to update points
    const updatePoints = (newPoints) => {
        setPoints(newPoints);
    };

    // Function to filter items
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

        if (itemsToShow.length === 0) {
            setFilteredItems(['Sorry, no items in this points range.']);
        } else {
            setFilteredItems(itemsToShow);
        }
    };

    // Function to handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPointsRange('all'); // Reset points range
        filterItems();
    };

    // Function to handle points range selection
    const handlePointsRangeChange = (range) => {
        setPointsRange(range);
        filterItems();
    };

    // Populate items initially
    filterItems();

    return (
        <div className="mp-body">
            <div className="mp-hr"></div>
            <div className="mp-section-header">Market</div>
            <div className="sidebar-title">Filters</div>
            <div className="my-points-display">
                <h2><img src="stall.png" className="stall" alt="Stall" /> My Points: <img src="coin.png" className="coin" alt="Coin" /><span id="points"> {points}</span></h2>
            </div>
            <div className="container">
                <div className="sidebar">
                    <div className="filter-option">
                        <h3>Categories</h3>
                        <ul>
                            <li><input type="checkbox" id="all" onChange={() => handleCategoryChange('all')} checked={selectedCategory === 'all'} /> <label htmlFor="all">All</label></li>
                            <li><input type="checkbox" id="icons" checked={selectedCategory === 'icons'} onChange={() => setSelectedCategory('icons')} /> <label htmlFor="icons">Icons</label></li>
                            <li><input type="checkbox" id="badges" checked={selectedCategory === 'badges'} onChange={() => setSelectedCategory('badges')} /> <label htmlFor="badges">Badges</label></li>
                            <li><input type="checkbox" id="emotes" checked={selectedCategory === 'emotes'} onChange={() => setSelectedCategory('emotes')} /> <label htmlFor="emotes">Emotes</label></li>
                            <li><input type="checkbox" id="borders" checked={selectedCategory === 'borders'} onChange={() => setSelectedCategory('borders')} /> <label htmlFor="borders">Badges</label></li>
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
                <div className="items-container">
                    {filteredItems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.image} alt="Item" />
                            <p><img src="coin.png" className="coin" alt="Coin" /> {item.points}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketPage;