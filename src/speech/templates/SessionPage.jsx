import React from 'react';
import Session from './session';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import Header from '../../llibrary/tamplates/Header';



function EndSession() {
    return (
        <>
            <Helmet>
            <title>End Session Page | READ</title>
            </Helmet>
            <Header />
            <div>
                <Session />
            </div>
        </>
    );
}

export default EndSession;
