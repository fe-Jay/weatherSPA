import React from 'react'
import styled from 'styled-components';

const rtf = new Intl.RelativeTimeFormat("ko", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
});

export default function Forecast({ forecastValue }) {
    return (
        <Cast>
            {forecastValue.map((item, index) => {
                return (
                    <li className='feature-weather' key={index}>
                        <h3>
                            {rtf.format(index + 1, "day")}
                            <span>{item.dt_txt.slice(5, 10)}</span>
                        </h3>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/${item.weather[0].icon}.png`} alt='' />
                        <h2>{parseInt(item.main.temp)}°C</h2>
                        <span>{item.weather[0].description}</span>
                    </li>
                );
            })}
        </Cast>
    )
}

const Cast = styled.ul`
    display: flex;
    width: 100%;
    list-style: none;
    background: #04337450;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    border-radius: 1.25rem;
    padding: 1.5rem;
    li{
        flex:1 0 0;
        img {
            width: 70%;
        }
        span {
            display: block;
            padding: 0.5rem;
            font-weight: 300;
            font-size: clamp(0.75rem, 2vw, 1rem);
            opacity: 0.7;
        }
        h2 {
            font-size: clamp(1rem, 3vw, 2vw);
        }
    }
`
