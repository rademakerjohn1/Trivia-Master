import React from 'react';
import './Button.css'

function Button({ className, onClick, text }) {
    return (
      <button className={className} onClick={onClick}>{text}</button>
    )
}
export default Button;