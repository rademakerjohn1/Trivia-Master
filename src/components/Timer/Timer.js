import React from 'react'
import './Timer.css'

function Timer({ seconds }) {
    return <p id="timer">{seconds}</p>
}

export default Timer;