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
  const [isPaused, setIsPaused] = useState(false); // To manage pause state

  const storyLines = story?.content ? story.content.split('.') : [];

  // Effect to manage the line display when recording starts
  useEffect(() => {
    let interval;
    if (isRecordingStarted && !isPaused && currentLineIndex < storyLines.length) {
      interval = setInterval(() => {
        setCurrentLineIndex(prevIndex => {
          if (prevIndex < storyLines.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval); // Clear interval when done
            return prevIndex;
          }
        });
      }, 5000); // Display each line for 5 seconds
    } else if (isPaused) {
      clearInterval(interval); // Clear interval if paused
    }
    return () => clearInterval(interval);
  }, [isRecordingStarted, isPaused, currentLineIndex, storyLines.length]);

  // Callback for CaptureAudio when recording starts
  const handleRecordingStart = () => {
    setIsRecordingStarted(true);
    setCurrentLineIndex(0); // Start from the first line
  };

  // Callback for CaptureAudio when recording is paused
  const handlePauseRecording = () => {
    setIsPaused(true);
  };

  // Callback for CaptureAudio when recording resumes
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

        {/* Pass callbacks to CaptureAudio */}
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
