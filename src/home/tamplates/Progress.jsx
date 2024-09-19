import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '../Static/css/Progress.css';

const fetchDataFromAPI = async (token, email) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/progress/?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,  
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return { total_words: 0, correct_words: 0, accuracy: 0 }; 
    }
};

const ProgressTracker = () => {
  const [totalLevel, setTotalLevel] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const updateProgress = async () => {
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('email');

      if (!token) {
        setError('Authentication token is missing. Please log in.');
        return;
      }

      if (!email) {
        setError('Email is missing. Please log in.');
        return;
      }

      const data = await fetchDataFromAPI(token, email);
      setTotalLevel(data.level);
      setAccuracy(data.accuracy);
    };

    updateProgress();
  }, []);

  return (
    <div className="progress-tracker">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="total-level-section">
            <div className="total-level">TOTAL LEVEL</div>
            <div className="level-value">{totalLevel}</div>
          </div>
          <div className="accuracy-section">
            <div className="accuracy-label">ACCURACY</div>
            <div className="accuracy-container">
              <CircularProgress
                variant="determinate"
                value={accuracy}
                size={100}
                thickness={4}
                sx={{
                  color: '#00ff00',
                  position: 'relative',
                }}
              />
              <div className="emoji-container">
                <span role="img" aria-label="cool-emoji" className="sunglasses-emoji">
                  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Nerd%20Face.png" alt="Nerd Face" width="90" height="90" />
                </span>
              </div>
            </div>
            <div className="accuracy-percentage">{accuracy}%</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressTracker;
 