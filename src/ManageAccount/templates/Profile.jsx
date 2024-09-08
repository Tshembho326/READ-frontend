import React, { useState } from 'react';
import "../static/css/Profile.css";
import Header from '../../llibrary/tamplates/Header'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdVerified } from 'react-icons/md';
import { MdOutlineMail } from "react-icons/md";
import { Helmet } from 'react-helmet';
import ProfilePhoto from '../../ManageAccount/images/ProfilePhoto.png';
import ProfilePhoto2 from '../../ManageAccount/images/ProfilePhoto2.png';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile'); // state for active tab
    const [isEditing, setIsEditing] = useState(false); // state for edit mode
    const [message, setMessage] = useState({ text: '', type: '' }); // state for message

    const initialProfileValues = {
        firstName: localStorage.getItem("firstName") || '',
        lastName: localStorage.getItem("lastName") || '',
        email: localStorage.getItem("email") || ''
    };

    const profileValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
    });

    const passwordValidationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleUpdate = (values) => {
        // Handle profile update logic here
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setIsEditing(false);
    };

    const handleChangePassword = (values) => {
        // Handle password change logic here
        setMessage({ text: 'Password changed successfully!', type: 'success' });
    };

    return (
        <div>
            <Header />
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
                                        <img src={ProfilePhoto} className="profile-photo" alt="Profile" />

                                        <div className="name-email-wrapper">
                                            <label className="profile-name">
                                                {initialProfileValues.firstName} {initialProfileValues.lastName}
                                            </label>
                                            <div className="email-group">
                                                <MdOutlineMail className="icon" />
                                                <span className="profile-email">{initialProfileValues.email}</span>
                                                <MdVerified className="verified-icon" />
                                            </div>
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
        </div>
    );
};

export default Profile;
