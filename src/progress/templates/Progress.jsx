import React, { useEffect, useState } from "react";
import "../static/css/Progress.css"; 
import Header from '../../llibrary/tamplates/Header';
import { Helmet } from 'react-helmet';
import sadFace from '../static/images/sad-face.png'; 
import normalFace from '../static/images/normal-face.png';
import happyFace from '../static/images/happy-face.png';
import extremelyHappyFace from '../static/images/extremely-happy-face.png';


const fetchDataFromAPI = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/progress/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return { totalReads: 0, correctReads: 0 }; 
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
            const totalReads = data.totalReads;
            const correctReads = data.correctReads;
            setTotalLevel(totalReads);
            const calculatedAccuracy = totalReads > 0 ? (correctReads / totalReads) * 100 : 0;
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
        <div className="progress-page">
            <Helmet>
                <title>Progress | READ</title>
            </Helmet>
            <Header />

            <main>
                <div className="summary-section">
                    <div className="total-level">
                        <h2>Total Level</h2>
                        <span className="total-level-number">{totalLevel}</span>
                    </div>
                    <div className="accuracy">
                        <h2>Accuracy</h2>
                        <img src={imgSrc} alt={`Accuracy image showing ${accuracy.toFixed(2)}%`} className="accuracy-image" />
                        <div className="accuracy-percentage">
                            <span>{accuracy.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>

                <div className="detailed-progress">
                    <h3>Detailed Progress</h3>
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
    );
};

export default Progress;
