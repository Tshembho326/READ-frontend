import React from 'react';
import '../static/css/Session.css' // Import the CSS file for styling

const Session = ({ level, emojiSrc, quote }) => {
    return (
        <div className="container4">
            <div className="content">
                <h1>Reading Session Complete</h1>
                <div className="card3">
                    <div className="level">
                        Lv. {level}
                    </div>
                    <div className="emoji">
                        <span role="img" aria-label="celebration">
                            <img src={emojiSrc} alt="Emoji" width="110" height="110" />
                        </span>
                    </div>
                    <h3>Proficient Reader</h3>
                    <p>(Great Work)</p>
                    <blockquote>
                        "{quote}"
                    </blockquote>
                    <button className="next-session">Next Session</button>
                </div>
            </div>
        </div>
    );
};

export default Session;
