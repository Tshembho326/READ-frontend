import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../static/css/Results.css';

const base64ToBlobUrl = (base64Data, contentType = 'audio/wav') => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob); // Create a URL for the Blob
};

const Results = ({ missedWords, audioFiles, totalWords, correctWords }) => {
    const navigate = useNavigate(); // Initialize navigate

    const handleCompleteSession = () => {
        navigate('/end-session'); // Navigate to the end-session URL
    };

    return (
        <div className="container4"> {/* Use the same container class as Session */}
            <div className="content">
                <h1>Results</h1>
                <div className="card3"> {/* Use the same card class as Session */}
                    <div className="results-summary">
                        <p>
                            <strong>
                                Out of {totalWords} words that you read, you managed to get {correctWords} correct, and you only missed {missedWords.length}.
                            </strong>
                        </p>
                    </div>

                    {missedWords.length > 0 && (
                        <div className="missed-words-container">
                            <h3>Below are the words you missed</h3>
                            <ul>
                                {missedWords.map((word, index) => (
                                    <li key={index}>{word}</li>
                                ))}
                            </ul>

                            <div className="audio-files-container">
                                <h4>Audio for Missed Words:</h4>
                                {missedWords.map((word, index) => (
                                    <div key={index} className="audio-player">
                                        <p>{word}</p>
                                        {audioFiles[word] ? (
                                            <audio controls>
                                                <source src={base64ToBlobUrl(audioFiles[word])} type="audio/wav" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        ) : (
                                            <p>No audio available for this word.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={handleCompleteSession} className="next-session">
                    Complete Session
                </button>
            </div>
        </div>
    );
};

export default Results;
