import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/GetStarted.css';
import Logo from '../static/images/kid.png';
import { Helmet } from 'react-helmet';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/sign-up/');  // Adjust the route as needed
  };

  return (
    <>
      <Helmet>
        <title>Get Started | Reading Tutor</title>
      </Helmet>

      <div className="get-started-body">
        <div className="get-started-container">
          <div className="get-started-form-container">
            <h2 className="name">Reading Tutor</h2>
            <img src={Logo} alt="Logo" className="get-started-logo" />
            <h2 className='welcome'>Get Started</h2>
            <h2 className="slogan">
              Unlock the Joy of Reading,
              <br />Your Personal Reading
              <br />Coach Awaits!
            </h2>
            <button className="get-started-button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
