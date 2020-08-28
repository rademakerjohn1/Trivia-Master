import React from 'react'

function Form({ onSubmit, onChange, error }) {
    return ( 
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} maxLength="3" />
            {error && <p>{error}</p>}
        </form>
    )
}

export default Form;