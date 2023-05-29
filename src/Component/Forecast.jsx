import React from 'react'
import styled from 'styled-components';

const Cast = styled.section`
    display: flex;
    img {
        width: 100%;
    }
`

export const Forecast = ({ forecastValue }) => {
    return (
        <Cast>
            {forecastValue.map((item, index) => {
                return (
                    <article className="feature-weather" key={index}>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/${item.weather[0].icon}.png`} alt="" />
                        <h2>{item.weather[0].description}</h2>
                        <p>{item.main.temp} °C</p>
                        <p>{item.dt_txt.slice(5, 10)}</p>
                    </article>
                );
            })}
        </Cast>
    )
}
