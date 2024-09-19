
import React, { useEffect, useState } from 'react';
import Session from './session';
import { Helmet } from 'react-helmet';
import Header from '../../llibrary/tamplates/Header';
import levelsData from "../../level.json"; // Import the levels data

function EndSession() {
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSessionData = async () => {
            const token = localStorage.getItem('authToken');
            const email = localStorage.getItem('email');

            if (!token || !email) {
                setError('Authentication token or email is missing. Please log in.');
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/progress/?email=${encodeURIComponent(email)}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Assuming `data.level` contains the level
                if (data && data.level) {
                    // Find the corresponding level data from levelsData
                    const levelData = levelsData.find(levelObj => levelObj.level === data.level);

                    if (levelData) {
                        setSessionData(levelData);
                    } else {
                        setError('No matching level data found.');
                    }
                } else {
                    setError('Failed to load session data.');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data.');
            }
        };

        fetchSessionData();
    }, []);

    return (
        <>
            <Helmet>
                <title>End Session Page | READ</title>
            </Helmet>
            <Header />
            <div>
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    sessionData && (
                        <Session
                            level={sessionData.level}
                            emojiSrc={sessionData.emojiSrc}
                            quote={sessionData.quote}
                        />
                    )
                )}
            </div>
        </>
    );
}

export default EndSession;
