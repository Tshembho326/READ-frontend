import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/SignUp.css';
import Logo from '../static/images/kid.png';
import { Helmet } from 'react-helmet';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const jsonResponse = await response.json();
        setErrorMessage(jsonResponse.message || "An error occurred. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
      navigate("/");

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | READ</title>
      </Helmet>

      <div className="signup-body">
        <div className="signup-container">
          <div className="signup-form-container">
            <h2 className="name">Reading Tutor</h2>
            <img src={Logo} alt="Logo" className="signup-logo" />
            <h2 className='welcome'>Welcome onBoard!</h2>
            <h2 className="slogan">Join Us on Your Reading Journey</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                required
              />
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                required
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              {errorMessage && <div className="error">{errorMessage}</div>}
              <button type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <div className="links">
              <a href="/">Already have an account? Log in</a>
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
