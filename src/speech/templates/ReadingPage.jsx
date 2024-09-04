import { Helmet } from 'react-helmet';
import CaptureAudio from './CaptureAudio';
import '../static/css/ReadingPage.css'; 

const ReadingPage = () => {
  return (
    <>
      <Helmet>
        <title>Reading Page | READ</title>
      </Helmet>
      <div className="reading-page">
        <h1>Read the Story</h1>
        <div className="story-content">
          <p>Once upon a time, in a land far, far away...</p>
          {/* ... more story paragraphs ... */}
        </div>
        <CaptureAudio />
      </div>
    </>
  );
};

export default ReadingPage;
