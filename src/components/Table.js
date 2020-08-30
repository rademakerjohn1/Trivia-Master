import React from 'react';

function StatsTable({ stats }) {

    return (
        <table>
        <thead>
          <tr>
            <th>Initials</th>
            <th>Difficulty</th>
            <th>Correct</th>
            <th>Incorrect</th>
          </tr>
        </thead>
        <tbody>
            {stats.map(stat => (
                <tr>
                    <td>{stat.initials}</td>
                    <td>{stat.difficulty}</td>
                    <td>{stat.correct}</td>
                    <td>{stat.incorrect}</td>
                </tr>
            ))}
        </tbody>
      </table>
    )
}

export default StatsTable;