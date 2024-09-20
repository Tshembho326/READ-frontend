import React, { useState, useEffect } from "react";
import "../static/css/Progress.css"; 
import Header from '../../llibrary/tamplates/Header';
import { Helmet } from 'react-helmet';
import ProgressTracker from '../../home/tamplates/Progress';
import bookData from '../../Books.json'; // Import book data

const Progress = () => {
    const [detailedProgress, setDetailedProgress] = useState([]);

    useEffect(() => {
        // Retrieve previously read titles from localStorage
        const titles = JSON.parse(localStorage.getItem('TitlesList')) || [];

        // Filter out the previously read stories from the book data
        const previouslyReadStories = titles.map(title => {
            return bookData.find(book => book.title === title);
        }).filter(Boolean); // Filter out any null values

        // Calculate progress for each difficulty level
        const difficultyLevels = ['Easy', 'Medium', 'Hard'];
        const progressData = difficultyLevels.map(level => {
            const totalStoriesAtLevel = bookData.filter(book => book.difficulty === level).length;
            const storiesReadAtLevel = previouslyReadStories.filter(book => book.difficulty === level).length;
            const progress = totalStoriesAtLevel > 0 ? (storiesReadAtLevel / totalStoriesAtLevel) * 100 : 0;

            return {
                level,
                levelValue: difficultyLevels.indexOf(level) + 1,
                progress: Math.round(progress) // Round to the nearest whole number
            };
        });

        // Update the detailed progress state with the calculated progress
        setDetailedProgress(progressData);
    }, []); // Empty dependency array to run this effect once on component mount

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
                                <span>{progress.progress}% Completed</span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Progress;
