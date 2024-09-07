import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../static/css/Profile.css";
import Header from '../../llibrary/tamplates/Header';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const email = localStorage.getItem("email")
    const [password, setPassword] = useState('')

    return(
        <div>
            <Helmet>
                <title>Profile | READ</title>
            </Helmet>
            <Header />
            <div className='profile-info'>
                <h2 className='fullname'>Name</h2>
                <h3>{firstName} {lastName}</h3>
                <div className='bottomline'></div>

                <h2 className='email'>Email</h2>
                <h3>{email}</h3>
                <div className='bottomline'></div>

                <h2 className='password'>Password</h2>
                <h3>********</h3>
                <div className='bottomline'></div>
            </div>
        </div>
    );
}

export default Profile;