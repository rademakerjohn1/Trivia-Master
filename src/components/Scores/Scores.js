import React from 'react';
import './Scores.css'

function Scores({ start, end, correct, incorrect }) {
    return (
        (start || end) &&
        <div id="score-container">
            <p id="correct">Correct: <span className="score-text">{correct}</span></p>
            <p id="incorrect">Incorrect: <span className="score-text">{incorrect}</span></p>
        </div>
    )
}

export default Scores;