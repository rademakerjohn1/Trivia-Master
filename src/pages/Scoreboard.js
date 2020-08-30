import React, { useState } from 'react';
import StatsTable from '../components/StatsTable'


function Scoreboard() {

    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || [])
    
    return (
        stats.length > 0 ? 
        <StatsTable stats={stats} />
        : <p>No stats available. <span><a href="/">Play a quiz now!</a></span></p>
    )
}
export default Scoreboard;