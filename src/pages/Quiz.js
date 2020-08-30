import React, { useState, useLayoutEffect, useEffect } from 'react';
import axios from 'axios'
import Button from '../components/Button'
import Question from '../components/Question'
import Answer from '../components/Answer';
import Timer from '../components/Timer'
import Scores from '../components/Scores'
import Form from '../components/Form'

function Quiz() {
    // State for trivia questions, timer, right/wrong count
    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || [])
    const [initials, setInitials] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [questions, setQuestions] = useState([])
    const [seconds, setSeconds] = useState();
    const [correct, setCorrect] = useState(0);
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)
    const [error, setError] = useState('')
    const [incorrect, setIncorrect] = useState(0);

    // When stats state is updated, save to localStorage
    useEffect(() => {
        window.localStorage.setItem('stats', JSON.stringify(stats))
    }, [stats])

    // Get token, get questions and set timer and score
    const startQuiz = async (level) => {
        let token = await axios.get("https://opentdb.com/api_token.php?command=request")
        token = token.data.token;
        const data = await getQuestions(token);
        setDifficulty(level)
        setSeconds(10)
        setQuestions(data)
        setStart(true)
    }

    // Get data from API, combine and shuffle right/wrong answers
    const getQuestions = async (sessionToken) => {
        let trivia = await axios.get(`https://opentdb.com/api.php?token=${sessionToken}&amount=10&category=9&difficulty=${difficulty}&type=multiple`)
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

    // If user answer matches questions.correct_answer, increment correct, else increment incorrect
    // Remove current question from array, reset timer
    const userAnswer = (index) => {
        if (questions[0].answers[index] === questions[0].correct_answer) setCorrect(correct => correct + 1)
        else setIncorrect(incorrect => incorrect + 1)
        setQuestions(q => q.slice(1));
        setSeconds(10);
    }

    // If questions left and time reaches 0, increment incorrect count, remove current question, reset timer
    // If correct or incorrect is non-zero AND no questions left, end quiz
    useEffect(() => {
        if (questions.length && seconds < 1) {
            setIncorrect(wrong => wrong + 1)
            setQuestions(q => q.slice(1));
            setSeconds(10);
        }
        if ((correct || incorrect) && !questions.length) {
            setStart(false)
            setEnd(true)
        }
    }, [correct, incorrect, questions, seconds])


    // Set input value to state
    const handleChange = (event) => {
        setInitials(event.target.value)
    }

    // Save user initials and score to storage state, show error if no input value or input !isNaN
    const handleSave = (event) => {
        event.preventDefault()
        if (!isNaN(initials) || !initials) {
            setError("Please enter at least one initial")
            return;
        }
        let userData = {
            initials: initials,
            difficulty: difficulty,
            incorrect: incorrect,
            correct: correct
        }
        setStats(data => [...data, userData])
        setError("")
        window.location = "/scores"
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
            {/* If quiz not started, render buttons */}
            {!start &&
                <div id="btn-container">
                    <Button onClick={() => startQuiz("easy")} difficulty="easy" />
                    <Button onClick={() => startQuiz("medium")} difficulty="medium" />
                    <Button onClick={() => startQuiz("hard")} difficulty="hard" />
                </div>
            }

            {/* If questions in state render question/answers */}
            {questions.length > 0 &&
                <div id="question-answer-container">
                    <Question question={questions[0].question} />
                    <div id="answer-container">
                        {questions[0].answers.map((answer, index) => (
                            <Answer
                                key={index}
                                answer={answer}
                                onClick={() => userAnswer(index)}
                            />))
                        }
                    </div>
                </div>
            }

            {/* If quiz started, show timer */}
            {start &&
                <Timer seconds={seconds} />
            }

            {/* If quiz started or ended, show scores */}
            {(start || end) &&
                <Scores correct={correct} incorrect={incorrect} />
            }

            {/* If quiz ended, show form */}
            {end &&
                <Form
                    end={end}
                    error={error}
                    onChange={(event) => handleChange(event)}
                    onSubmit={(event) => handleSave(event)}
                />
            }
        </div>

    )
}

export default Quiz;