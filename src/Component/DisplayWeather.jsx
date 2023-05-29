import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Forecast } from './Forecast';


export default function DisplayWeather(props) {

    // cityValue는 사용자 입력값을 props로 받아온다.
    const cityValue = props.value;
    const key = 'a4577b548e71817bc8dc60e085680e38';

    // 현재 날씨와 일기예보를 저장할 state
    const [weatherValue, setWeatherValue] = useState('');
    const [forecastValue, setForecastValue] = useState('');
    const [loading, setLoading] = useState(true);


    function currentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                error => {
                    reject('error');
                },
            );
        });
    }


    const getWeather = async () => {
        try {
            const { latitude, longitude } = await currentLocation();

            // * 현재 날씨 API Fetch
            const responseCurrent = fetch(
                `https://api.openweathermap.org/data/2.5/weather?${cityValue ? 'q=' + cityValue : 'lat=' + latitude + '&lon=' + longitude
                }&appid=${key}&units=metric&lang=KR`,
            );

            // * 일기예보 API Fetch
            const responseForecast = fetch(
                `https://api.openweathermap.org/data/2.5/forecast?${cityValue ? 'q=' + cityValue : 'lat=' + latitude + '&lon=' + longitude
                }&appid=${key}&units=metric&lang=KR`,
            );

            // * Promise.all로 두 API를 한번에 호출
            const [dataCurrent, dataForecast] = await Promise.all([responseCurrent, responseForecast]);

            const resultCurrent = await dataCurrent.json();
            const resultForecast = await dataForecast.json();

            console.log('1 :', resultCurrent);
            console.log('2 :', resultForecast);

            // date 객체를 이용해 데이터 추출
            const oneDay = 1000 * 60 * 60 * 24;
            const offset = 1000 * 60 * 60 * 9;
            const current = new Date().getTime() + offset;
            const DesiredTime = ' 18:00:00';
            const oneDaysLater = new Date(current + oneDay).toISOString().slice(0, 10) + DesiredTime;
            const twoDaysLater = new Date(current + oneDay * 2).toISOString().slice(0, 10) + DesiredTime;
            const threeDaysLater = new Date(current + oneDay * 3).toISOString().slice(0, 10) + DesiredTime;

            console.log(oneDaysLater)
            console.log(twoDaysLater)
            console.log(threeDaysLater)

            // 3일치 데이터만 추출 (UTC 시간 계산 고려)
            const weatherData = resultForecast.list.filter(item => {
                return item.dt_txt === oneDaysLater || item.dt_txt === twoDaysLater || item.dt_txt === threeDaysLater;
            });

            // * 각각 API에서 추출한 데이터를 state에 저장
            console.log('api-1 :', resultCurrent);
            setWeatherValue(resultCurrent);

            console.log('api-2 :', resultForecast);
            console.log('data :', weatherData);
            setForecastValue(weatherData);

            setLoading(false);

        } catch (error) {
            console.error('Error: ', error);
            props.turnBack();
        }

    };

    useEffect(() => {
        getWeather();
    }, []);

    const CurrentWeather = styled.article`
    border-bottom: 1px solid #0f0;
        h2 {
            color: #f00;
        }
        h3 {
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 800;
            font-size: 144px;
            line-height: 197px;
            /* identical to box height */


            /* Cool Gray / Gradient */

            background: linear-gradient(180deg, #111827 0%, #6B7280 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h4 {
            color: #FF8E27
        }
        img {
            max-width: 200px;
        }
    `

    return (
        <>
            {loading ? (
                <div>LOADING...</div>
            ) : (
                <div onClick={props.turnBack}>
                    <CurrentWeather>
                        <h2>📍 {weatherValue.name}</h2>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/${weatherValue.weather[0].icon}.png`} alt="" />
                        <h3>{weatherValue.main.temp} °C</h3>
                        <h4>{weatherValue.weather[0].description}</h4>
                        <p>
                            <strong>최고</strong>
                            {weatherValue.main.temp_max}
                        </p>
                        <p>
                            <strong>최저</strong>
                            {weatherValue.main.temp_min}
                        </p>
                    </CurrentWeather>
                    <Forecast forecastValue={forecastValue} />
                </div>
            )}
        </>
    );
}
