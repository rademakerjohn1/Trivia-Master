import React from 'react'
import './Menu.css'
import Button from '../Button/Button'
import PageLink from '../PageLink/PageLink'

function Menu({start, end, setEasy, setMedium, setHard}) {

    return (
        (!start && !end) &&
        <div id="menu">
            <div id="difficulty-btn-container">
                <p>Select a difficulty</p>
                <Button className="difficulty-btn" onClick={setEasy} text="Easy" />
                <Button className="difficulty-btn" onClick={setMedium} text="Medium" />
                <Button className="difficulty-btn" onClick={setHard} text="Hard" />
            </div>
            <PageLink destination="#/scores" message={"See scores"} />
        </div>
    )
}

export default Menu;