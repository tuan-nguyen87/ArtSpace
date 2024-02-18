import React, { useState, useEffect } from 'react';
import ReactStars from 'react-star-ratings';
import axios from 'axios'; 
import "./styles/RatingReview.css";


const RatingReview = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUserId = '...'; // Get the current user's ID 
      const revieweeId = '...'; // Get the relevant ID of the entity being reviewed

      const reviewData = { 
        rating, 
        reviewText, 
        reviewerId: currentUserId, 
        revieweeId, 
      };

      const response = await axios.post('/api/reviews', reviewData); 
      setReviews([response.data, ...reviews]); 
      setReviewText(''); 
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const revieweeId = '...'; // Get the relevant ID for which to fetch reviews
        const response = await axios.get(`/api/reviews/${revieweeId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="r_container">
      <div className="left-section">
        <h1 className="title">Leave a Review about your Experience</h1>

        <form id="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <ReactStars
              count={5}
              value={rating} //Set value to the current rating state
              onChange={handleRatingChange}
              size={30} 
              emptyIcon={<i className="far fa-star"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700" 
              isHoverable={true}
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-text">Your Review:</label>
            <textarea id="review-text" className="review-text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          </div>

          <button type="submit" className="submit-button">Submit Review</button>
        </form>
      </div>

      <div className="right-section">
        <h2>All Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review-item" key={review._id}>
              {/* Display reviewer name/type, rating, and review text */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingReview;
