import React, { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase.js"; // Adjust the path as needed
import "./styles/GalleryMarketPage.css";

const GalleryMarketPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = db.collection("products");
        const snapshot = await productsCollection.get();
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="gallery-market-page">
      <h1 className="gallery-title">Gallery Market</h1>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.description} />
            <div className="product-info">
              <h3>{product.description}</h3>
              <p>Price: ${product.price}</p>
              <p>Seller: {product.userName}</p>{" "}
              {/* Assuming userName is stored in Firestore */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryMarketPage;
