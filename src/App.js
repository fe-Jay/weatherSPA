import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import React, { useState, } from 'react';
import DisplayWeather from './Component/DisplayWeather';
import Search from './Component/Search';
import styled from 'styled-components';
import GlobalStyle from './Component/GlobalStyle';
import home from './img/home.svg'
import search from './img/search.svg'

export default function App() {
  // 검색창에 입력한 값을 state로 관리
  const [inputLocation, setInputLocation] = useState('');
  const [preInput, setPreInput] = useState('');

  // 현재 시간을 받아와서 props로 전달
  const currentTime = new Intl.DateTimeFormat('en', { hour: '2-digit', hourCycle: 'h23' }).format(new Date())



  return (
    <>
      <GlobalStyle times={currentTime} />
      <h1 className='a11y-hidden'>WEATHER REPORT</h1>
      <BrowserRouter>
        <Header>
          <Nav icon="home" to="/">
            <span className="a11y-hidden">홈</span>
          </Nav>
          <Nav icon="search" to="/search/">
            <span className="a11y-hidden">검색</span>
          </Nav>
        </Header>

        <h2 className="a11y-hidden">날씨 정보</h2>
        <Routes>
          <Route path="/" element={<DisplayWeather inputLocation={inputLocation} />} />
          <Route path="/search" element={<Search setInputLocation={setInputLocation} preInput={preInput} setPreInput={setPreInput} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Header = styled.header`
    display: flex;
    justify-content: flex-end;
`
const Nav = styled(Link)`
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url(${(props) => (props.icon === "home" ? home : search)})no-repeat center;
`