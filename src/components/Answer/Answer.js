import React from 'react'
import './Answer.css'

function Answer({ answer, onClick }) {
    return <li className="answer" onClick={onClick}>{answer}</li>
  }

export default Answer;