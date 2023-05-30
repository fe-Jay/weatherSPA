import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    }

    body {
    padding: clamp(1,5rem, 5vw, 3rem);
    background: ${(props) => (
        props.times > 6 && props.times <= 17
            ? 'linear-gradient(345.21deg, #89F7FE 2.6%, #66A6FF 85.16%)'
            : props.times > 17 && props.times <= 19
                ? 'linear-gradient(180deg, #3F51B1 -7.36%, #5A55AE 5.68%, #7B5FAC 17.73%, #8F6AAE 30.77%, #A86AA4 42.81%, #CC6B8E 54.86%, #F18271 67.9%, #F3A469 79.94%, #F7C978 92.99%)'
                : 'linear-gradient(167.44deg, #08244F 0%, #134CB5 47.38%, #0B42AB 100%)'
    )};
    background-attachment: fixed;
    font-family: 'SUITE Variable', sans-serif;
    }

#root {
    width: min(100%, 40rem);
    height: 100vh;
    color: #fff;
    margin: 0 auto;
    text-align: center;
    padding: clamp(1.5rem, 5vw, 3rem);
    position: relative;
}

    .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
}

    .fadeInUp {
    animation: fadeInUp ease 1s;
    -webkit-animation: fadeInUp ease 1s;
    -moz-animation: fadeInUp ease 1s;
    -o-animation: fadeInUp ease 1s;
    -ms-animation: fadeInUp ease 1s;
    transition: all 0.5s ease -in -out;
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(3rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
`
export default GlobalStyle;
