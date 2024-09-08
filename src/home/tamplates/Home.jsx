import React from 'react';
import Progress from "./Progress.jsx" // Assuming ProgressTracker is in a separate file
import Header from "../../llibrary/tamplates/Header.jsx"
import PreviouslyReadStories from "./PreviouslyReadStories.jsx"
import "../Static/css/home.css"






function Home() {
  return (
    <div className="home">

      <Header></Header>
      {/* Other content */}
      <div>
      <div className='container'>
        <Progress totalLevel={9} accuracy={92} /> 
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