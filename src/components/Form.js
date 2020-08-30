import React from 'react'

function Form({ onSubmit, onChange, error }) {
    return ( 
        <form onSubmit={onSubmit}>
            <label htmlFor="initials">Enter your initials</label><br />
            <input type="text" name="initials" onChange={onChange} maxLength="3" />
            <button type="submit">Submit</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Form;