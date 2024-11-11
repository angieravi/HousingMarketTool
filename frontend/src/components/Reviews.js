// frontend/src/components/Reviews.js
import React from 'react';

const Reviews = () => {
  const reviews = [
    { name: 'Renter 1', comment: 'Great experience, highly recommend.', rating: 5 },
    { name: 'Renter 2', comment: 'Excellent service and amenities.', rating: 4 },
    { name: 'Renter 3', comment: 'Very satisfied with my stay.', rating: 5 }
  ];

  return (
    <section className="reviews" id="reviews">
      <h2>Recent Reviews</h2>
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <h3>{review.name}</h3>
            <p>{review.comment}</p>
            <div>{'★'.repeat(review.rating)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
