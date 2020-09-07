import React, { useState, useEffect } from 'react';
import './Scores.css'
import StatsTable from '../../components/StatsTable/StatsTable';
import PageLink from '../../components/PageLink/PageLink'
import Button from '../../components/Button/Button'


function Scores() {

    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || []);
    const [easy, setEasy] = useState([]);
    const [medium, setMedium] = useState([]);
    const [hard, setHard] = useState([]);

    useEffect(() => {
        setEasy(stats.filter(stat => stat.difficulty === "easy"))
        setMedium(stats.filter(stat => stat.difficulty === "medium"))
        setHard(stats.filter(stat => stat.difficulty === "hard"))
    }, [stats])

    const clear = () => {
        setStats([])
        localStorage.removeItem("stats");
    }

    return (
        stats.length > 0 ?
            <div id="stats-container">
                <PageLink destination="#/" message={"Back"} />
                {easy.length > 0 &&
                    <StatsTable difficulty={"Easy"} stats={easy} />
                }
                {medium.length > 0 &&
                    <StatsTable difficulty={"Medium"} stats={medium} />
                }
                {hard.length > 0 &&
                    <StatsTable difficulty={"Hard"} stats={hard} />
                }
                <Button className="clear-btn" onClick={() => clear()} text="Clear" />
            </div>
            : <div id="stats-container">
                <p>No stats available.</p>
                <PageLink destination="#/" message={"Play a quiz now!"} />
            </div>
            

    )
}

export default Scores;