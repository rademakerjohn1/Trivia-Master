import React from 'react';
import './StatsTable.css'

function StatsTable({ stats, difficulty }) {

    return (
      <div className="table-container">
        <table>
          <caption>{difficulty}</caption>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
            {stats.map((stat, index) => (
                <tr key={index}>
                    <td>{stat.initials}</td>
                    <td>{(stat.correct / (stat.correct + stat.incorrect)) * 100}%</td>
                    <td>{stat.date}</td>
                    <td>{stat.time}</td>
                </tr>
            ))}
        </tbody>
      </table>
      </div>
    )
}

export default StatsTable;