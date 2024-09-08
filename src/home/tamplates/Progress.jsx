import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '../Static/css/Progress.css';

const ProgressTracker = ({ totalLevel, accuracy }) => {
  return (
    <div className="progress-tracker">
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
              color: '#00ff00', // Green color for accuracy progress
              position: 'relative',
            }}
          />
          <div className="emoji-container">
            <span role="img" aria-label="cool-emoji" className="sunglasses-emoji"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Nerd%20Face.png" alt="Nerd Face" width="90" height="90" /></span>
          </div>
        </div>
        <div className="accuracy-percentage">{accuracy}%</div>
      </div>
    </div>
  );
};

export default ProgressTracker;
