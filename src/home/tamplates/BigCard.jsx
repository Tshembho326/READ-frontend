import React, { useState } from 'react';
import '../Static/css/BigCard.css';
import { useNavigate } from 'react-router-dom';

const BigCard = ({ title, coverImage, difficulty, content, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleReadNowClick = async () => {
    // Fetch the story from the server
    const encodedTitle = encodeURIComponent(title);
    try {
      const response = await fetch(`http://127.0.0.1:8000/stories/${encodedTitle}/`);
      if (response.ok) {
        const story = await response.json();
        navigate('/reading-page', {state: {story}});
        // Handle story display or any other logic here
      } else {
        console.error('Failed to fetch story');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  const handleRemoveClick = () => {
    // Retrieve the list of titles from localStorage
    const titles = JSON.parse(localStorage.getItem('TitlesList')) || [];
    
    // Filter out the current title
    const updatedTitles = titles.filter(t => t !== title);

    // Save the updated list back to localStorage
    localStorage.setItem('TitlesList', JSON.stringify(updatedTitles));

    // Hide the card without reloading the window
    setIsVisible(false);

    // Optionally call a callback function if provided
    if (onRemove) {
      onRemove(title);
    }
  };

  if (!isVisible) {
    return null; // Do not render the card if it's marked as invisible
  }

  return (
    <div className="big-card">
      <img src={coverImage} alt={title} className="big-book-cover" />
      <div className="big-book-details">
        <h2>{title}</h2>
        <p>Difficulty: {difficulty}</p>
        <p>{content}</p>
        <div className="button-container">
          <button className="read-now-button" onClick={handleReadNowClick}>
            Read Now
          </button>
          <button className="remove-button" onClick={handleRemoveClick}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigCard;
