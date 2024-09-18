import React, { useState, useEffect } from "react";
import "../static/css/Progress.css"; 
import Header from '../../llibrary/tamplates/Header';
import { Helmet } from 'react-helmet';
import ProgressTracker from '../../home/tamplates/Progress'; 

const Progress = () => {
    const [detailedProgress, setDetailedProgress] = useState([]);


    useEffect(() => {
        // Example progress levels to display
        setDetailedProgress([
            { level: 'Easy', levelValue: 1, progress: 70 },
            { level: 'Medium', levelValue: 2, progress: 60 },
            { level: 'Hard', levelValue: 3, progress: 40 },
        ]);
    }, []);

    return (
        <>
            <Header />
            <div className="progress-page">
                <Helmet>
                    <title>Progress | READ</title>
                </Helmet>
                
                <main>
                    {/* Reusing the ProgressTracker component */}
                    <ProgressTracker />

                    <div className="detailed-progress">
                        <h1>Detailed Progress</h1>
                        {detailedProgress.map((progress, index) => (
                            <div key={index} className={`progress-item ${progress.level.toLowerCase()}`}>
                                <span>{progress.level} Reads: Lv {progress.levelValue}</span>
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: `${progress.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Progress;
