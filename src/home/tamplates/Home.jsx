import React from 'react';
import Progress from "./Progress.jsx" // Assuming ProgressTracker is in a separate file
import Header from "../../llibrary/tamplates/Header.jsx"
import PreviouslyReadStories from "./PreviouslyReadStories.jsx"
import "../Static/css/home.css"
import { Helmet } from 'react-helmet';






function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Home | READ</title>
      </Helmet>
      <Header />
      <div>
      <div className='container'>
        <Progress totalLevel={9} accuracy={50} /> 
      </div>
      <h1>
        Currently Reading:
      </h1>
      <PreviouslyReadStories></PreviouslyReadStories>
      </div>
      
      {/* Other content */}
    </div>
  );
}

export default Home;