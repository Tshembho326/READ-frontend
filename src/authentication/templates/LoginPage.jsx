import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../static/css/Login.css';
import Logo from '../static/images/kid.png';
import { Helmet } from 'react-helmet';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleError = (error) => {
        if (typeof error === 'string') {
            setError(error);
        } else if (error && typeof error.text === 'string') {
            setError(error.text);
        } else {
            setError('An unknown error occurred.');
        }
    };


    const navigate = useNavigate();


    const handleLogin = async () => {
        setError('');

        if (!username || !password) {
            setError('Email and password are required.');
            return;
        }
    

    

        try {
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {

                 if (data.token) {
                     localStorage.setItem('authToken', data.token);
                     localStorage.setItem('firstName', data.user.first_name);
                     localStorage.setItem('lastName', data.user.last_name);
                     localStorage.setItem('email', data.user.email);
                     navigate('/home');
                 } else {
                     handleError('Unexpected response format.');
                 }
            } else {
                handleError(data.message || 'Incorrect email or password.');
            }
        } catch (error) {
            handleError('An error occurred while submitting your request.');
        }
    };

    return (

        <>

        <Helmet>
            <title>Sign In | READ</title>
        </Helmet>

        <div className="login-body">
            <div className="login-container">
                <div className="login-form-container">
                    <h2 className="name">Reading Tutor</h2>
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2 className='welcome'>Welcome Back!</h2>
                    <h2 className="slogan">Unlock the Joy of Reading</h2>
                    <div className="login-form">
                 
                        <input
                            id="email"
                            type="email"
                            value={username}
                            placeholder="Enter your email"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        
                       
                        <div className="password-container">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="password-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                            </span>
                        </div>
                        <button onClick={handleLogin}>Continue</button>
                        {error && <div className="error">{error}</div>}
                        <div className="links">
                            <a href="/forgot-password/">Forgot password?</a>
                            <a href="/sign-up/">Create Account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
};

export default Login;