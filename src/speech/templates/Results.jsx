import React from 'react';
import '../static/css/Results.css';

const Results = ({ missedWords, audioFiles, totalWords, correctWords }) => {
  return (
    <div className="results-container">
      <h2>Results</h2>
      <div className="results-summary">
        <p><strong>Out of  {totalWords} Words that you read you managed to get {correctWords} Correct and you only missed {missedWords.length}</strong> </p>
      </div>

      {missedWords.length > 0 && (
        <div className="missed-words-container">
          <h3>Below are the words you missed</h3>
          <ul>
            {missedWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>

          {audioFiles.length > 0 && (
            <div className="audio-files-container">
              <h4>Audio for Missed Words:</h4>
              {audioFiles.map((url, index) => (
                <div key={index} className="audio-player">
                  <audio controls>
                    <source src={url} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
