import React from 'react';
import '../static/css/BookCard.css';

const BookCard = ({ title, author, coverImage, difficulty, fetchStory }) => {
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api/stories?title=${title}`); // Replace with your actual API endpoint
      if (response.ok) {
        const story = await response.json();
        // Do something with the fetched story, e.g., display it
        console.log(story); 
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
        <h3 id= {difficulty }>{title}</h3>  
      </div>
    </button>
  );
};

export default BookCard;
