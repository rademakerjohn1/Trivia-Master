import React from 'react';

function Button({ onClick, difficulty }) {
    return (
      <button onClick={onClick}>{difficulty}</button>
    )
}
export default Button;