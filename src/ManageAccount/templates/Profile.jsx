import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../static/css/Profile.css";
import Header from '../../llibrary/tamplates/Header';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdVerified } from 'react-icons/md';
import { MdOutlineMail } from "react-icons/md";
import { Helmet } from 'react-helmet';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const initialProfileValues = {
        email: localStorage.getItem('email') || '',
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
   };

    const profileValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
    });

    const passwordValidationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleUpdate = async (values) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/change-user-details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    email: initialProfileValues.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('firstName', values.firstName);
                localStorage.setItem('lastName', values.lastName);

                setMessage({ type: 'success', text: data.message || 'Profile updated successfully' });
                setIsEditing(false);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update Profile' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error occurred while updating Profile' });
        }
    };

    const handleChangePassword = async (values) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/change-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    oldPassword: values.currentPassword,
                    email: initialProfileValues.email,
                    newPassword: values.newPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: data.message || 'Password changed successfully' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Incorrect old password' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error changing password' });
        }
    };

    return (
        <>
            <Helmet>
                <title>Personal Details | READ</title>
            </Helmet>
            <Header/>
            <div className="profile-container">

                <h1 className="title">Personal Info</h1>

                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security
                    </button>
                </div>

                <div className="card">
                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <>
                            {!isEditing ? (
                                <>
                                    <div className="profile-details">
                                        <div className="input-group email-group">
                                            <MdOutlineMail className="icon" />
                                            <span>{initialProfileValues.email}</span>
                                            <MdVerified className="verified-icon" />
                                        </div>
                                        <button 
                                            className="button primary-button"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Info
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Formik
                                    initialValues={initialProfileValues}
                                    validationSchema={profileValidationSchema}
                                    onSubmit={handleUpdate}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="profile-form">
                                            <div className="field">
                                                <label htmlFor="firstName" className="label">First Name</label>
                                                <Field type="text" name="firstName" className="input" />
                                                <ErrorMessage name="firstName" component="div" className="error-message" />
                                            </div>
                                            <div className="field">
                                                <label htmlFor="lastName" className="label">Last Name</label>
                                                <Field type="text" name="lastName" className="input" />
                                                <ErrorMessage name="lastName" component="div" className="error-message" />
                                            </div>
                                            <div className="button-group">
                                                <button type="submit" className="button primary-button" disabled={isSubmitting}>
                                                    Save Changes
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button secondary-button"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </>
                    )}

                    {activeTab === 'security' && (
                        <Formik
                            initialValues={{
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''
                            }}
                            validationSchema={passwordValidationSchema}
                            onSubmit={handleChangePassword}
                        >
                            {({ isSubmitting }) => (
                                <Form className="password-form">
                                    <div className="field">
                                        <label htmlFor="currentPassword" className="label">Current Password</label>
                                        <Field type="password" name="currentPassword" className="input" />
                                        <ErrorMessage name="currentPassword" component="div" className="error-message" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="newPassword" className="label">New Password</label>
                                        <Field type="password" name="newPassword" className="input" />
                                        <ErrorMessage name="newPassword" component="div" className="error-message" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
                                        <Field type="password" name="confirmPassword" className="input" />
                                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                    </div>
                                    <div className="button-group">
                                        <button type="submit" className="button primary-button" disabled={isSubmitting}>
                                            Change Password
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;