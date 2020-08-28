import React from 'react'

function Answer({ answer, onClick }) {
    return <li className="answer" onClick={onClick}>{answer}</li>
  }

export default Answer;