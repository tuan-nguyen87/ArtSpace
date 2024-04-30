import React, { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./styles/GalleryMarketPage.css";

const GalleryMarketPage = () => {
  // const variable to be used
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // use to fetch data from firestore using the Firebase SDK methods
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle opening the modal and setting the selected product
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Function to handle opening the contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Function to handle closing the contact modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Function to handle sending the message
  const sendMessage = () => {
    // Clear the message box after sending the message
    setMessage("");
    // Close the contact modal
    setIsContactModalOpen(false);
  };

  return (
    <div className="gallery-market-page">
      <h1 className="gallery-title">Gallery Market</h1>
      <div className="product-container">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => openModal(product)}
          >
            <img src={product.imageUrl} alt={product.description} />
          </div>
        ))}
      </div>
      {/* pop up menu */}
      {isModalOpen && (
        <div className="popup_gallery">
          <div className="popup_gallery_content">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.description}
            />
            <h3>{selectedProduct.description}</h3>
            <p>Price: ${selectedProduct.price}</p>

            <div className="popup_btn">
              <button className="profile_btn" onClick={openContactModal}>
                Contact Seller
              </button>
              <button className="profile_btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* a second popup menu within the first menu */}
      {isContactModalOpen && (
        <div className="popup_gallery">
          <div className="popup_gallery_content">
            <h3>Contact Seller</h3>

            <textarea
              className="message-box"
              placeholder="Write your message..."
              rows="4"
              cols="50"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="popup_btn">
              <button className="profile_btn" onClick={closeContactModal}>
                Close
              </button>
              <button className="profile_btn" onClick={sendMessage}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryMarketPage;
