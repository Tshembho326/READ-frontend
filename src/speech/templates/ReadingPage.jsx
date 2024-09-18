import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import CaptureAudio from './CaptureAudio';
import Logo from '../static/images/reading.png';
import '../static/css/ReadingPage.css';
import Header from '../../llibrary/tamplates/Header';

const ReadingPage = () => {
  const location = useLocation();
  const { story } = location.state || {};

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const storyLines = story?.content ? story.content.split('.') : [];

  useEffect(() => {
    let interval;
    if (isRecordingStarted && !isPaused && currentLineIndex < storyLines.length) {
      interval = setInterval(() => {
        setCurrentLineIndex(prevIndex => {
          if (prevIndex < storyLines.length - 1) {
            // Send current line to the backend for phoneme conversion
            fetch('http://127.0.0.1:8000/convert-to-phonemes/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1] || '',
              },
              body: JSON.stringify({ text: storyLines[prevIndex] })
            })
            .then(response => response.json())
            .then(data => {
              if (data.phonemes) {
                console.log(`Phonemes for line ${prevIndex}:`, data.phonemes);
              } else if (data.error) {
                console.error('Error converting to phonemes:', data.error);
              }
            })
            .catch(error => console.error('Error:', error));

            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 5000);
    } else if (isPaused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecordingStarted, isPaused, currentLineIndex, storyLines]);

  const handleRecordingStart = () => {
    setIsRecordingStarted(true);
    setCurrentLineIndex(0);
  };

  const handlePauseRecording = () => {
    setIsPaused(true);
  };

  const handleResumeRecording = () => {
    setIsPaused(false);
  };

  return (
    <>
      <Helmet>
        <title>Reading Page | READ</title>
      </Helmet>
      <Header />
      <div className="reading-page">
        <h1>{story?.title}</h1>
        <img src={Logo} alt="Logo" className="login-logo" />
        <div className="story-content">
          {storyLines.map((line, index) => (
            <p 
              key={index}
              className={index === currentLineIndex ? "visible-line" : "blurry-line"}
            >
              {line}
            </p>
          ))}
        </div>
        <CaptureAudio 
          storyTitle={story?.title}
          onStartRecording={handleRecordingStart}
          onPauseRecording={handlePauseRecording}
          onResumeRecording={handleResumeRecording}
        />
      </div>
    </>
  );
};

export default ReadingPage;
