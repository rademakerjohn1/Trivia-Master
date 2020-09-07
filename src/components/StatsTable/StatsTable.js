import React from 'react';
import './StatsTable.css'

function StatsTable({ stats, category }) {

    return (
      <div className="table-container">
        <table>
          <caption>{category}</caption>
        <thead>
          <tr>
            <th>User</th>
            <th>Diff.</th>
            <th>Score</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
            {stats.map((stat, index) => (
                <tr key={index}>
                    <td>{stat.initials}</td>
                    <td>{stat.difficulty}</td>
                    <td>{Math.round((stat.correct / (stat.correct + stat.incorrect)) * 100)}%</td>
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