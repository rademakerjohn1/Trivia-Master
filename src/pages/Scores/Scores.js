import React, { useState, useEffect } from 'react';
import './Scores.css'
import StatsTable from '../../components/StatsTable/StatsTable';
import PageLink from '../../components/PageLink/PageLink'
import Button from '../../components/Button/Button'


function Scores() {

    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || []);
    const [music, setMusic] = useState([]);
    const [movies, setMovies] = useState([]);
    const [television, setTelevision] = useState([]);

    useEffect(() => {
        stats.forEach(stat => {
            stat.difficulty = stat.difficulty.charAt(0).toUpperCase() + stat.difficulty.slice(1).toLowerCase()
        })
        setMusic(stats.filter(stat => stat.category === "12"))
        setMovies(stats.filter(stat => stat.category === "11"))
        setTelevision(stats.filter(stat => stat.category === "14"))
    }, [stats])

    const clear = () => {
        setStats([])
        localStorage.removeItem("stats");
    }

    return (
        stats.length > 0 ?
            <div id="stats-container">
                <PageLink destination="#/" message={"Back"} />
                {music.length > 0 &&
                    <StatsTable category={"Music"} stats={music} />
                }
                {movies.length > 0 &&
                    <StatsTable category={"Movies"} stats={movies} />
                }
                {television.length > 0 &&
                    <StatsTable category={"Television"} stats={television} />
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