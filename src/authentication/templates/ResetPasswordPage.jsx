import React, { useState } from 'react';
import Logo from '../static/images/kid.png';
import '../static/css/ResetPassword.css';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const { uid, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const showPassword = useState(false); // Corrected initialization
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handlePasswordReset = async () => {
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`/reset-password/${uid}/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setMessage('Password reset successful!');
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | READ</title>
            </Helmet>
            <div className="ResetPassword-body">
                <div className="reset-password-container">
                    <div className="password-reset-form">
                        <h2 className="name">Reading Tutor</h2>
                        <img src={Logo} alt="READ Logo" className="logo"/>
                        <h2 className="slogan">Reset Password</h2>
                        <div className="reset-password-form">
                            <label>New Password</label>
                            <div className="input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <label>Confirm Password</label>
                            <div className="input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handlePasswordReset}>Continue</button>
                            {message && <p className="message">{message}</p>}
                            {error && <div className="error">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
