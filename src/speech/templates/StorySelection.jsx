import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/StorySelection.css';
import Logo from '../static/images/kid.png';
import { Helmet } from 'react-helmet';

const StorySelection = () => {
  const [selectedStory, setSelectedStory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStory) {
      setErrorMessage('Please select a story.');
      return;
    }
    navigate(`/read/${selectedStory}`);
  };

  return (
    <>
      <Helmet>
        <title>Select a Story | READ</title>
      </Helmet>

      <div className="story-selection-body">
        <div className="story-selection-container">
          <div className="story-selection-form-container">
            <h2 className="name">Reading Tutor</h2>
            <img src={Logo} alt="Logo" className="story-selection-logo" />
            <h2 className="slogan">Unlock the Joy of Reading, Your Personal Reading Coach Awaits!</h2>
            <form className="story-selection-form" onSubmit={handleSubmit}>
              <label htmlFor="story">Choose a Story:</label>
              <select
                id="story"
                value={selectedStory}
                onChange={(e) => setSelectedStory(e.target.value)}
              >
                <option value="">Select a story</option>
                <option value="story1">Story 1</option>
                <option value="story2">Story 2</option>
                <option value="story3">Story 3</option>
              </select>
              {errorMessage && <div className="error">{errorMessage}</div>}
              <button type="submit">Start Reading</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorySelection;
