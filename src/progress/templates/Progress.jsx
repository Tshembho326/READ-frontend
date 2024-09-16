import React, { useEffect, useState } from "react";
import "../static/css/Progress.css"; 
import Header from '../../llibrary/tamplates/Header';
import { Helmet } from 'react-helmet';
import sadFace from '../static/images/sad-face.png'; 
import normalFace from '../static/images/normal-face.png';
import happyFace from '../static/images/happy-face.png';
import extremelyHappyFace from '../static/images/extremely-happy-face.png';
import ProgressTracker from '../../home/tamplates/Progress'; // Import the ProgressTracker component

const fetchDataFromAPI = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/progress/', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            credentials: 'include', // Ensure cookies are sent with the request
            
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {  total_words: 0, correct_words: 0, progress_percentage: 0, accuracy: 0 }; 
    }
};

const Progress = () => {
    const [totalLevel, setTotalLevel] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [detailedProgress, setDetailedProgress] = useState([]);

    const getAccuracyImage = (accuracy) => {
        if (accuracy >= 75) return extremelyHappyFace;
        if (accuracy >= 50) return happyFace;
        if (accuracy >= 25) return normalFace;
        return sadFace;
    };

    useEffect(() => {
        const updateProgress = async () => {
            const data = await fetchDataFromAPI();
            const totalReads = data.total_words;
            const correctReads = data.correct_words;
            setTotalLevel(totalReads);
            const calculatedAccuracy = totalReads > 0 ? data.progress_percentage : 0;
            setAccuracy(calculatedAccuracy);
            setDetailedProgress([
                { level: 'Easy', levelValue: 1, progress: 70 },
                { level: 'Medium', levelValue: 2, progress: 60 },
                { level: 'Hard', levelValue: 3, progress: 40 },
            ]);
        };

        updateProgress();
    }, []);

    const imgSrc = getAccuracyImage(accuracy);

    return (
        <>
            <Header />
            <div className="progress-page">
            <Helmet>
                <title>Progress | READ</title>
            </Helmet>
            
            <main>
                <ProgressTracker totalLevel={totalLevel} accuracy={accuracy.toFixed(2)} />
                <div className="detailed-progress">
                    <h1>Detailed Progress</h1>
                    {detailedProgress.map((progress, index) => (
                        <div key={index} className={`progress-item ${progress.level.toLowerCase()}`}>
                            <span>{progress.level} Reads : Lv {progress.levelValue}</span>
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
