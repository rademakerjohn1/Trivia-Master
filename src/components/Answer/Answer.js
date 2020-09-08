import React from 'react'
import './Answer.css'

function Answer({ selected, answer, onClick, message }) {
    return <li className={`answer${selected}`} onClick={!message ? onClick : null}>{answer}</li>
  }

export default Answer;