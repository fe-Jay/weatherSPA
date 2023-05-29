import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import React, { useState } from 'react';
import DisplayWeather from './Component/DisplayWeather';
import Search from './Component/Search';
import styled from 'styled-components';
import GlobalStyle from './Component/GlobalStyle';


export default function App() {
  const [inputLocation, setInputLocation] = useState('');
  const [preInput, setPreInput] = useState('');

  const Nav = styled(Link)`
    display: inline-block;
    text-decoration: none;
    padding: 20px;
  `

  return (
    <>
      <GlobalStyle />
      <h1>WEATHER REPORT</h1>
      <BrowserRouter>
        <Nav to="/">홈</Nav>
        <Nav to="/search/">검색</Nav>

        <Routes>
          <Route path="/" element={<DisplayWeather value={inputLocation} />} />
          <Route path="/search" element={<Search setInputLocation={setInputLocation} preInput={preInput} setPreInput={setPreInput} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}