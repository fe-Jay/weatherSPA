import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Search({ setInputLocation, preInput, setPreInput }) {
    const navigate = useNavigate();

    const submitForm = (event) => {
        event.preventDefault();
        setInputLocation(preInput)
        setPreInput('');
        navigate('/');
    }

    return (
        <SearchForm>
            <h2>Local search</h2>
            <form onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="Seoul"
                    value={preInput}
                    onChange={event => setPreInput(event.target.value)}
                />
                <button type="submit">🔍</button>
            </form>
        </SearchForm>
    )
}

const SearchForm = styled.article`
        h2 {
            font-size: clamp(1.5rem, 4vw, 2rem);
            margin-bottom: 1rem;
            text-align: left;
        }
        form {
            display: flex;
            input {
                flex: 1 0 0;
                padding: 0.5rem;
                border: none;
                border-radius: 0.5rem 0 0 0.5rem;
                outline: none;
                font-size: clamp(1rem, 3vw, 2vw);
            }
            button {
                padding: 0.5rem;
                border: none;
                border-radius: 0 0.5rem 0.5rem 0;
                outline: none;
                font-size: clamp(1rem, 3vw, 2vw);
                cursor: pointer;
            }
        }
`
