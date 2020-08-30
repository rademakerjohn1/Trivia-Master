import React, { useState, useLayoutEffect, useEffect } from 'react';
import StatsTable from '../components/Table'


function Scoreboard() {

    const [stats, setStats] = useState(JSON.parse(window.localStorage.getItem('stats')) || [])
    
    useEffect(() => {
        console.log(stats)
    })
    
    return (
        <StatsTable stats={stats} />
    )
}
export default Scoreboard;