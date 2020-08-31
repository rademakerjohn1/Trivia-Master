import React from 'react';
import './Button.css'

function Button({ onClick, difficulty }) {
    return (
      <button className="difficulty-btn" onClick={onClick}>{difficulty}</button>
    )
}
export default Button;