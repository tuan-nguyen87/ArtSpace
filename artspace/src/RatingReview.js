// Import necessary libraries and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import "./styles/RatingReview.css";
import '@fortawesome/fontawesome-free/css/all.css';



const RatingReview = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [personName, setPersonName] = useState('');

// Function to handle changes in the rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to handle form submission
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
        personName,
      };

      // Log the review data to the console
      console.log('Review data:', reviewData);

      // Send a POST request to submit the review
      const response = await axios.post('/api/reviews', reviewData); 
      console.log('Review submitted:', response.data);

       // Clear the review text, person name, and rating after submission
      setReviews([response.data, ...reviews]); 
      setReviewText(''); 
      setPersonName('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };


  // useEffect to fetch reviews on component mount
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

        {/* Form for submitting reviews */}
        <form id="review-form" onSubmit={handleSubmit}>
      
          {/* Input field for the name of the artist/client */}
          <div className="form-group">
            <label htmlFor="person-name">Name of Artist/Client you worked with:</label>
            <input
              type="text"
              id="person-name"
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
        <h2>All Reviews</h2>
        <div className="reviews-list">
          {/* Display the newly submitted review */}
          {[...reviews, { reviewText, personName }].map((review, index) => (
            <div className="review-item" key={index}>
              {/* Display reviewer name/type, rating, and review text */}
              <p>{review.personName} gets a:</p>
              <p>{`Rating: ${rating}/5`}</p>
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingReview;
