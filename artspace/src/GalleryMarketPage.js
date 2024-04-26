import React, { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./styles/GalleryMarketPage.css";

const GalleryMarketPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {isModalOpen && (
        <div className="popup_gallery">
          <div className="popup_gallery_content">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.description}
            />
            <h3>{selectedProduct.description}</h3>
            <p>Price: ${selectedProduct.price}</p>
            {/* Additional information or buttons can be added here */}
            <div className="popup_btn">
              <button className="profile_btn" onClick={closeModal}>
                Contact Seller
              </button>
              <button className="profile_btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryMarketPage;
