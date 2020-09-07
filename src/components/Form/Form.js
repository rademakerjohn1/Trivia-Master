import React from 'react'
import './Form.css'
import PageLink from '../PageLink/PageLink'

function Form({ end, onSubmit, onChange, error }) {
    return (
        end && 
        <form onSubmit={onSubmit}>
            <label htmlFor="initials">Enter your initials</label><br />
            <input type="text" name="initials" onChange={onChange} maxLength="3" />
            <button type="submit">Submit</button>
            {error && <p id="error">{error}</p>}
            <PageLink destination="#/" message={"Play Again"} />
        </form>
    )
}

export default Form;