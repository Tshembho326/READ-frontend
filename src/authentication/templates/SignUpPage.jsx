import React, { useState } from 'react';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.detail || 'Sign up failed. Please try again.');
      } else {
        const data = await response.json();
        console.log('Sign up successful:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Enter your First Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Enter your Last Name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
