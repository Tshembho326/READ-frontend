import React from 'react';
import Session from './session';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import Header from '../../llibrary/tamplates/Header';
import levelsData from "../../level.json";



function EndSession({ level = 3 }) {
    const sessionData = levelsData.find(session => session.level === level) || levelsData[0];

    return (
        <>
            <Helmet>
                <title>End Session Page | READ</title>
            </Helmet>
            <Header />
            <div>
                <Session
                    level={sessionData.level}
                    emojiSrc={sessionData.emojiSrc}
                    quote={sessionData.quote}
                />
            </div>
        </>
    );
}

export default EndSession;
