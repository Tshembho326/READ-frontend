import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the passed state
import CaptureAudio from './CaptureAudio';
import Logo from '../static/images/reading.png';
import '../static/css/ReadingPage.css';
import Header from '../../llibrary/tamplates/Header';

const ReadingPage = () => {
  const location = useLocation();
  const { story } = location.state || {}; 

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
          <p>{story?.content}</p> 
        </div>
        <CaptureAudio />
      </div>
    </>
  );
};

export default ReadingPage;
