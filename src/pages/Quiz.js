import React, { useState, useLayoutEffect, useEffect } from 'react';
import './Quiz.css'
import axios from 'axios'
import Menu from  '../components/Menu/Menu'
import Question from '../components/Question/Question'
import Answer from '../components/Answer/Answer';
import Timer from '../components/Timer/Timer';
import Scores from '../components/Scores/Scores';
import Form from '../components/Form/Form'

function Quiz() {
    // State for trivia questions, timer, right/wrong count
    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || [])
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
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


    useEffect(() => {

        window.localStorage.setItem('token', token)

        // If no token, set error to request token
        if (!token) setError("new token needed")

        // If token and difficulty exist in state, validate token
        if (token !== '' && difficulty !== '') {
            validateToken(token, difficulty)
        }

        // If token is valid, format question sets and start quiz, else request token
        async function validateToken(sessionToken, level) {
            
            const response = await axios.get(`https://opentdb.com/api.php?token=${sessionToken}&amount=10&category=9&difficulty=${level}&type=multiple`)
            if (response.data.response_code === 4 || response.data.response_code === 3) {
                setError("new token needed")
            } 
            else {
                response.data.results.forEach(result => {
                    result.question = decode(result.question)
                    result.answers = shuffle([...result.incorrect_answers, result.correct_answer])
                    for (var i = 0; i < result.answers.length; i++) {
                        result.answers[i] = decode(result.answers[i])
                    }
                })
                setSeconds(10)
                setQuestions(response.data.results)
                setStart(true)
            }
        }
    }, [token, difficulty])

    // If new token is needed, request new token and set to state 
    useEffect(() => {
        if (error === "new token needed") {
            axios.get("https://opentdb.com/api_token.php?command=request")
                .then(res => setToken(res.data.token)).then(setError(''))
        }
    }, [error])


    // If questions in state, decrement timer each second
    useLayoutEffect(() => {
        if (!questions.length) return;
        const timer = setTimeout(() => {
            setSeconds(time => time - 1);
        }, 1000);
        return () => clearTimeout(timer);
    });

    // If user answer matches correct_answer, increment correct, else increment incorrect. Remove current question, reset timer
    const userAnswer = (index) => {
        if (questions[0].answers[index] === questions[0].correct_answer) setCorrect(correct => correct + 1)
        else setIncorrect(incorrect => incorrect + 1)
        setQuestions(q => q.slice(1));
        setSeconds(10);
    }

    // If questions left and time is 0, increment incorrect count, remove current question, reset timer
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
            initials, difficulty, incorrect, correct,
            date: new Date(Date.now()).toLocaleString().split(",")[0],
            time: formatTime()
        }
        setStats(data => [...data, userData])
        window.location = "#/scores";
    }
    // Format time
    const formatTime = () => {
        let time = new Date(Date.now()).toLocaleString().split(",")[1].trim();
        let arr = time.split(":")
        return `${arr[0]}:${arr[1]} ${arr[2].slice(3)}`;
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

    // Convert special character codes from questions and answers to text
    function decode(html) {
        var text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
    }

    return (
        <div>
            <Menu start={start} end={end} 
            setEasy={() => setDifficulty("easy")} 
            setMedium={() => setDifficulty("medium")} 
            setHard={() => setDifficulty("hard")} />

            <Timer start={start} seconds={seconds} />

            {questions.length > 0 &&
            <div id="question-answer-container">
                <Question question={questions[0].question} />
                <div id="answer-container">
                    <ol type="A">
                        {questions[0].answers.map((answer, index) => (
                            <Answer key={index} answer={answer} onClick={() => userAnswer(index)}/>))}
                    </ol>
                </div>
            </div>
            }   

            <Scores start={start} end={end} correct={correct} incorrect={incorrect} />

            <Form end={end} error={error} 
            onChange={(event) => handleChange(event)} 
            onSubmit={(event) => handleSave(event)}/>
        </div>
    )
}

export default Quiz;