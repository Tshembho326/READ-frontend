import React from 'react';
import { Helmet } from 'react-helmet';
import CaptureAudio from './CaptureAudio';
import '../static/css/ReadingPage.css';
import Header from '../../llibrary/tamplates/Header';

const ReadingPage = () => {
  const query = new URLSearchParams(window.location.search);
  const title = query.get('title');
  const content = query.get('content');


  return (
    <>
      <Helmet>
        <title>Reading Page | READ</title>
      </Helmet>
      <Header />
      <h1>Start Reading</h1>
      <div className="reading-page">      
        <h1>{title}</h1>
        <div className="story-content">
          <p>{decodeURIComponent(content)}</p>
        </div>
        <CaptureAudio />
      </div>
    </>
  );
};

export default ReadingPage;
