import React from 'react';
import '../static/css/BookCard.css';

const BookCard = ({ title, author, coverImage, difficulty }) => {
  return (
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-details">
        <h3>{title}</h3>
        <p>By {author}</p>
        {difficulty && <p className="difficulty">Difficulty: {difficulty}</p>}
      </div>
    </div>
  );
};

export default BookCard;
