import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/BookCard.css';

const BookCard = ({ title, coverImage, difficulty }) => {
 
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    // Retrieve titles from localStorage, or initialize as an empty array if it doesn't exist
    let titles = JSON.parse(localStorage.getItem('TitlesList')) || [];
    
    // Check if the title is already in the list and add it if not
    if (!titles.includes(title)) {
      titles.push(title);
    }
  
    // Save the updated list back to localStorage
    localStorage.setItem('TitlesList', JSON.stringify(titles));
  
    console.log(titles); // Optional: log the titles for debugging
  
    try {
      // Fetch the story from the server
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`http://127.0.0.1:8000/stories/${encodedTitle}/`);
  
      if (response.ok) {
        const story = await response.json();
        navigate('/reading-page', {state : {story}});
        
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
