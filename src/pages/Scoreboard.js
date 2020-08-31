import React, { useState } from 'react';
import StatsTable from '../components/StatsTable/StatsTable'


function Scoreboard() {

    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || [])

    const clear = () => {
        setStats([])
        localStorage.clear();
    }
    
    return (
        stats.length > 0 ? 
        <StatsTable stats={stats} onClick={() => clear()} />
        : <p>No stats available. <span><a href="#/">Play a quiz now!</a></span></p>
    )
}
export default Scoreboard;