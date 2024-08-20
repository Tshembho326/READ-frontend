import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/Registration.css";
import { Helmet } from 'react-helmet';

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const MIN_LENGTH = 8;
  const UPPERCASE_REGEX = /[A-Z]/;
  const DIGIT_REGEX = /\d/;

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < MIN_LENGTH) {
      errors.push(`Password should be at least ${MIN_LENGTH} characters long.`);
    }
    if (!UPPERCASE_REGEX.test(password)) {
      errors.push("Password should include at least one uppercase letter.");
    }
    if (!DIGIT_REGEX.test(password)) {
      errors.push("Password should include at least one number.");
    }
    setPasswordError(errors.join(" "));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
        throw new Error(jsonResponse.message || "An error occurred while submitting your request, please try again.");
      }

      const data = await response.json();
      console.log("Success:", data);
      navigate('/login');

    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create An Account - READ</title>
      </Helmet>
      <div className="registration-body">
        <div className="outer-container">
          <p className="heading">Reading Tutor</p>
          <p className="subheading">Welcome onBoard!!</p>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <p className="slogan">Your Personal<br />Reading Coach Awaits!</p>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
