import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    }

    body {
    padding: 20px;
    background-color: #e9ecef;
    font-family: 'SUITE Variable', sans-serif;
    }

    #root {
    width: min(100%, 640px);
    background-color: #fff;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    border-radius: 16px;
    }
`

export default GlobalStyle;