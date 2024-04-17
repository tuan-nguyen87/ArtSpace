import React, { useState } from "react";
import "./styles/ForSalePage.css";

const itemsData = [
  { id: 1, name: "Item 1", price: 100, description: "Description of Item 1" },
  { id: 2, name: "Item 2", price: 150, description: "Description of Item 2" },
  { id: 3, name: "Item 3", price: 200, description: "Description of Item 3" },
];

const ForSalePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    const item = itemsData.find((item) => item.id === itemId);
    setSelectedItem(item);
  };

  return (
    <div className="forsale-page">
      <h1>Items For Sale</h1>
      <div className="item-list">
        {itemsData.map((item) => (
          <div
            key={item.id}
            className="item-card"
            onClick={() => handleItemClick(item.id)}
          >
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="item-details">
          <h2>{selectedItem.name}</h2>
          <p>Price: ${selectedItem.price}</p>
          <p>Description: {selectedItem.description}</p>
        </div>
      )}
    </div>
  );
};

export default ForSalePage;
