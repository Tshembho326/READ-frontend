import React, { useState } from 'react';
import '../static/css/ForgotPassword.css';
import { Helmet } from 'react-helmet';
import Logo from '../static/images/kid.png';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        setMessage('');

        if (!username) {
            setError('Please enter your email address.');
            return;
        }

        try {
            const response = await fetch('/forgot-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password reset email sent. Please check your inbox.');
            } else {
                setError(data.error || 'Failed to send password reset email.');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password | READ</title>
            </Helmet>
            <div className="forgot-password-body">
                <div className="forgot-password-container">
                    <div className="forgot-password-form">
                        <h2 className="name">Reading Tutor</h2>
                        <img src={Logo} alt="Storage Sprint Logo" className="logo"/>
                        <h2>Reset your password</h2>
                        <p className='details'>Enter your email address that you use with your account to continue.</p>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                id="email"
                                type="email"
                                value={username}
                                placeholder="Enter your email"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={handleSubmit}>Continue</button>
                        {message && <p className="message">{message}</p>}
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;