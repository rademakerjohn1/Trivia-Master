import React from 'react'
import './Timer.css'

function Timer({ start, seconds }) {

    return start && <p id="timer">{seconds}</p>
}

export default Timer;