import React from 'react';
import './Scores.css'

function Scores({ correct, incorrect }) {
    return (
        <div id="score-container">
            <p id="correct">Correct: {correct}</p>
            <p id="incorrect">Incorrect: {incorrect}</p>
        </div>
    )
}

export default Scores;