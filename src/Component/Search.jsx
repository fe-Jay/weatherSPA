import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Search({ setInputLocation, preInput, setPreInput }) {
    const navigate = useNavigate();

    const submitForm = (event) => {
        event.preventDefault();
        setInputLocation(preInput)
        setPreInput('');
        navigate('/');
    }

    return (
        <article className='search'>
            <form onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="Seoul"
                    value={preInput}
                    onChange={event => setPreInput(event.target.value)}
                />
                <button type="submit">🔍</button>
            </form>
        </article>
    )
}

