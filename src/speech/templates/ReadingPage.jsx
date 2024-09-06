import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the passed state
import CaptureAudio from './CaptureAudio';
import '../static/css/ReadingPage.css';
import Header from '../../llibrary/tamplates/Header';

const ReadingPage = () => {
  const location = useLocation(); // Access location to get the state
  const { story } = location.state || {}; // Destructure the story from state

  return (
    <>
      <Helmet>
        <title>Reading Page | READ</title>
      </Helmet>
      <Header />
      <h1>Start Reading</h1>
      <div className="reading-page">      
        <h1>{story?.title}</h1>
        <div className="story-content">
          <p>{story?.content}</p> {/* Display story content */}
        </div>
        <CaptureAudio />
      </div>
    </>
  );
};

export default ReadingPage;
