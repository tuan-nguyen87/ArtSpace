import React, { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./styles/GalleryMarketPage.css";

const GalleryMarketPage = () => {
  const [products, setProducts] = useState([]);
  console.log(db);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched products:", productsData);
        setProducts(productsData);
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
              <p>Seller: {product.userId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryMarketPage;
