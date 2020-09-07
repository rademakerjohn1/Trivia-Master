import React from 'react'
import './Answer.css'

function Answer({ answer, onClick, message }) {
    return <li className="answer" onClick={!message ? onClick : null}>{answer}</li>
  }

export default Answer;