import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'
import Button from '../../components/Button/Button'
import PageLink from '../../components/PageLink/PageLink'

function Menu() {
    
    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('')

    const handleCategory = (cat) => {
        if (category === cat) {
            setCategory('')
        } else setCategory(cat)
    }

    const handleDifficulty = (diff) => {
        if (difficulty === diff) {
            setDifficulty('')
        } else setDifficulty(diff)
    }

    const checkState = (event) => {
        if (!category || !difficulty) {
            event.preventDefault()
        }
    }

    return (
        <div id="menu">
            <div className="btn-container">
                <p>Category:</p>
                <Button className={`menu-btn category-btn ` + (category === "12" ? `active` : 'inactive')} onClick={() => handleCategory("12")} text={"Music"}/>
                <Button className={`menu-btn category-btn ` + (category === "11" ? `active` : 'inactive')}  onClick={() => handleCategory("11")} text={"Movies"} />
                <Button className={`menu-btn category-btn ` + (category === "14" ? `active` : 'inactive')} onClick={() => handleCategory("14")} text={"Television"} />
            </div>
            <div className="btn-container">
                <p>Difficulty:</p>
                <Button className={`menu-btn difficulty-btn ` + (difficulty === "easy" ? `active` : 'inactive')}   onClick={() => handleDifficulty("easy")} text={"Easy"}/>
                <Button className={`menu-btn difficulty-btn ` + (difficulty === "medium" ? `active` : 'inactive')}   onClick={() => handleDifficulty("medium")} text={"Medium"} />
                <Button className={`menu-btn difficulty-btn ` + (difficulty === "hard" ? `active` : 'inactive')}  onClick={() => handleDifficulty("hard")} text={"Hard"} />
            </div>
            <Link onClick={(event) => checkState(event)} id="start-quiz" className={(!category || !difficulty) ? 'disabled' : 'abled'} to={{ pathname: "/quiz", state: { category: category, difficulty: difficulty }}}>Start Quiz!</Link>
            <PageLink destination="#/scores" message={"See scores"} />
        </div>
    )
}

export default Menu;