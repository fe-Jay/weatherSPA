import React, { useState } from 'react';
import DisplayWeather from './Component/DisplayWeather';

function App() {

  const [inputLocation, setInputLocation] = useState('');
  const [searchPage, setSearchPage] = useState(false);
  const [preInput, setPreInput] = useState('');


  const submitForm = (event) => {
    event.preventDefault();
    setSearchPage(true);
    setInputLocation(preInput)
    setPreInput('');
  }

  const turnBack = () => {
    setSearchPage(false);
  }

  return (
    <section className="container">
      <h1>WEATHER REPORT</h1>
      <article className='wrapper'>
        {searchPage ? (
          <DisplayWeather value={inputLocation} turnBack={turnBack} />
        ) :
          <form onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Seoul"
              value={preInput}
              onChange={event => setPreInput(event.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        }

      </article>
    </section>
  );
}
export default App;
