import React from 'react';
import '../static/css/Session.css' // Import the CSS file for styling

const Session = () => {
    return (
        <div className="container4">

            <div className="content">
                <h1>Reading Session Complete</h1>
                <div className="card3">
                    <div className="level">
                        Lv.1
                    </div>
                    <div className="emoji">
                        <span role="img" aria-label="celebration"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png" alt="Party Popper" width="110" height="110" /></span>
                    </div>
                    <h3>Proficient Reader</h3>
                    <p>(Great Work)</p>
                    <blockquote>
                        “Great work! You’re reading very well and handling most words and sentences like a champ.”
                    </blockquote>
                    <button className="next-session">Next Session</button>
                </div>
            </div>
        </div>
    );
};

export default Session;
