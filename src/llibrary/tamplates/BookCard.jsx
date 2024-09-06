import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/BookCard.css';

const BookCard = ({ title, coverImage, difficulty }) => {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`http://127.0.0.1:8000/stories/${encodedTitle}/`); 
      if (response.ok) {
        const story = await response.json();
        
        // Navigate to the reading page and pass the story data via state
        navigate('/reading-page', { state: { story } });
      } else {
        console.error('Failed to fetch story');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  return (
    <button className="book-card" onClick={handleButtonClick}> 
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-details">
        <h3 id={difficulty}>{title}</h3>
      </div>
    </button>
  );
};

export default BookCard;
