import React, { useState, useEffect } from 'react';
import "./styles/RatingReview.css";
import { db } from "./Firebase/Firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import '@fortawesome/fontawesome-free/css/all.css';

const RatingReview = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [personName, setPersonName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create a new review object
      const newReview = {
        artistName: personName,
        starRating: rating, 
        reviewText: reviewText,
      };
  
      // Add the new review to Firestore
      const docRef = await addDoc(collection(db, "reviews"), newReview);
      console.log("Review added with ID: ", docRef.id);
  
      // Update the reviews state with the new review
      setReviews([newReview, ...reviews]);
  
      // Clear form fields
      setRating(0);
      setReviewText('');
      setPersonName('');
  
      // Update the rating state to 0 after a brief delay to ensure the stars remain visible
      setTimeout(() => {
        setRating(0);
      }, 100);
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let reviewsRef = collection(db, "reviews");
        if (searchTerm) {
          // Filter reviews based on artist name
          reviewsRef = query(reviewsRef, where("artistName", "==", searchTerm));
        }
        const querySnapshot = await getDocs(reviewsRef);
        const fetchedReviews = [];
        querySnapshot.forEach((doc) => {
          fetchedReviews.push(doc.data());
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };
    fetchReviews();
  }, [searchTerm]);

  return (
    <div className="review-page">
      <div className="r_container">
        <div className="left-section">
          <div className="title-container">
          <h1 className="title">Leave a Review about your Experience</h1>
          </div>

          {/* Form for submitting reviews */}
          <form id="review-form" onSubmit={handleSubmit}>
            {/* Input field for the name of the artist/client */}
            <div className="form-group">
              <label htmlFor="person-name">Name of Artist you worked with:</label>
              <textarea
                id="person-name"
                className="artist-name"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
              />
            </div>

            {/* Star rating input */}
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((index) => (
                  <i
                    key={index}
                    className={`fas fa-star${rating >= index ? ' active' : ''}`}
                    onClick={() => handleRatingChange(index)}
                  ></i>
                ))}
              </div>
            </div>

            {/* Review text input */}
            <div className="form-group">
              <label htmlFor="review-text">Your Review:</label>
              <textarea
                id="review-text"
                className="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="submit-button">Submit Review</button>
          </form>
        </div>

        <div className="right-section">
        <div className="search-bar">
            <input
              type="text"
              placeholder="Search for artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <h2>All Reviews</h2>
          <div className="reviews-list">
            {/* Display the newly submitted review */}
            {/*{[...reviews, { reviewText, personName }].map((review, index) => ( */}
            {reviews.map((review, index) => (
              <div className="review-item" key={index}>
                {/* Display reviewer name/type, rating, and review text */}
                <p>{review.artistName} gets a:</p>
                <p>{`Rating: ${review.starRating}/5`}</p>
                <p>{review.reviewText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingReview;
