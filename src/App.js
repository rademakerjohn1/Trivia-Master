import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios'

function Question({ question }) {
  return (
    <p>{question}</p>
  )
}

function Answer({ answer, onClick }) {
  return (
    <li onClick={onClick}>{answer}</li>
  )
}

function App() {

  // State for trivia questions, timer, right/wrong count
  const [questions, setQuestions] = useState([])
  const [seconds, setSeconds] = useState();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  // Get questions and set timer and score
  const startQuiz = async () => {
    const questions = await getQuestions();
    setSeconds(10)
    setQuestions(questions)
  }

  // Get data from API, combine and shuffle right/wrong answers
  const getQuestions = async () => {
    let trivia = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    trivia = trivia.data.results
    trivia.forEach(result => {
      result.answers = shuffle([...result.incorrect_answers, result.correct_answer])
    })
    return trivia;
  }

  // If there are questions in state, setTimeOut decrements timer each second
  useLayoutEffect(() => {
    if (!questions.length) return;
    const timer = setTimeout(() => {
      setSeconds(time => time - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  // If questions left and time reaches 0, increment incorrect count, remove current question, reset timer
  if (questions.length && seconds < 1) {
    setIncorrect(wrong => wrong + 1)
    setQuestions(q => q.slice(1));
    setSeconds(10);
  }

  // If correct or incorrect is non-zero AND no questions left
  if ((correct || incorrect) && !questions.length) {
    console.log("test")
  }

  // If user answer matches questions.correct_answer, increment correct, else increment incorrect
  // Remove current question from array, reset timer
  const userAnswer = (index) => {
    if (questions[0].answers[index] === questions[0].correct_answer) setCorrect(correct => correct + 1)
    else setIncorrect(incorrect => incorrect + 1)
    setQuestions(q => q.slice(1));
    setSeconds(10);
  }

  // Randomize array order
  const shuffle = (array) => {

    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return (
    <div>
      <button onClick={() => startQuiz()}></button>
      {questions.length > 0 &&
        <div>
          <Question question={questions[0].question} />
          {questions[0].answers.map((answer, index) => (
            <Answer
              key={index}
              answer={answer}
              onClick={() => userAnswer(index)} />
          ))}
        </div>
      }
      <p>{seconds}</p>
      <p>Correct: {correct}</p>
      <p>Incorrect: {incorrect}</p>
    </div>

  )
}

export default App;