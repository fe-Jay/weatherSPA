import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Forecast from './Forecast';
import Loading from './Loading';
import marker from '../img/marker.svg';


export default function DisplayWeather(props) {
    // cityValue는 사용자 입력값을 props로 받아온다.
    const cityValue = props.inputLocation;
    const key = 'a4577b548e71817bc8dc60e085680e38';

    // 현재 날씨와 일기예보를 저장할 state
    const [weatherValue, setWeatherValue] = useState('');
    const [forecastValue, setForecastValue] = useState('');
    const [loading, setLoading] = useState(true);


    // * 현재 위치를 받아오는 함수
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


    // * 현재 날씨와 일기예보 API를 호출하는 함수
    const getWeather = async () => {
        try {
            const { latitude, longitude } = await currentLocation();

            // 현재 날씨 API Fetch
            const responseCurrent = fetch(
                `https://api.openweathermap.org/data/2.5/weather?${cityValue ? 'q=' + cityValue : 'lat=' + latitude + '&lon=' + longitude
                }&appid=${key}&units=metric&lang=KR`,
            );

            // 일기예보 API Fetch
            const responseForecast = fetch(
                `https://api.openweathermap.org/data/2.5/forecast?${cityValue ? 'q=' + cityValue : 'lat=' + latitude + '&lon=' + longitude
                }&appid=${key}&units=metric&lang=KR`,
            );

            // Promise.all로 두 API를 한번에 호출
            const [dataCurrent, dataForecast] = await Promise.all([responseCurrent, responseForecast]);
            const resultCurrent = await dataCurrent.json();
            const resultForecast = await dataForecast.json();

            // date 객체를 이용해 데이터 추출
            const oneDay = 1000 * 60 * 60 * 24;
            const offset = 1000 * 60 * 60 * 9;
            const current = new Date().getTime() + offset;
            const DesiredTime = ' 21:00:00';
            const oneDaysLater = new Date(current + oneDay).toISOString().slice(0, 10) + DesiredTime;
            const twoDaysLater = new Date(current + oneDay * 2).toISOString().slice(0, 10) + DesiredTime;
            const threeDaysLater = new Date(current + oneDay * 3).toISOString().slice(0, 10) + DesiredTime;

            // 3일치 데이터만 추출 (UTC 시간 계산 고려)
            const weatherData = resultForecast.list.filter(item => {
                return item.dt_txt === oneDaysLater || item.dt_txt === twoDaysLater || item.dt_txt === threeDaysLater;
            });


            // * 각각 API에서 추출한 데이터를 state에 저장
            setWeatherValue(resultCurrent);
            setForecastValue(weatherData);
            setLoading(false);

            console.log(resultCurrent);
            console.log(weatherData);

        } catch (error) {
            console.error('Error: ', error);
            alert('⚠️ 위치를 받아올 수 없습니다. 영문으로 입력해주세요.');
        }

    };

    useEffect(() => {
        getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    // 로딩 화면을 보여주고 현재 위치를 받아오도록 한다.
    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <CurrentWeather value={weatherValue.weather[0].icon}>
                            <h2>{weatherValue.name}</h2>
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/img/${weatherValue.weather[0].icon}.png`}
                                alt={`${weatherValue.weather[0].description}`}
                            />
                            <h3>
                                {parseInt(weatherValue.main.temp)}°C
                            </h3>
                            <h4>현재 날씨는 <strong>{weatherValue.weather[0].description}</strong> 상태입니다.</h4>
                            <ul>
                                <li>
                                    <strong>습도</strong>
                                    {weatherValue.main.humidity}
                                </li>
                                <li>
                                    <strong>풍속</strong>
                                    {weatherValue.wind.speed}
                                </li>
                            </ul>
                        </CurrentWeather>
                        <Forecast forecastValue={forecastValue} />
                    </>
                )
            }
        </>
    );
}


// 현재 날씨를 보여주는 스타일 컴포넌트
const CurrentWeather = styled.article`
    margin: 40px 0;
    h2 {
        position: absolute;
        left: clamp(2rem, 4vw, 2.5rem);
        top: clamp(2rem, 4vw, 2.5rem);
        font-size: clamp(1.5rem, 4vw, 2rem);
        vertical-align: middle;
        &::before {
            content: '';
            display: inline-block;
            vertical-align: middle;
            width: 1.5rem;
            height: 1.5rem;
            margin:  0 0.25rem 0;
            background-image: url(${marker});
        }
    }
    h3 {
        font-weight: 800;
        font-size: clamp(3rem, 10vw, 7rem);
    }
    h4 {
        font-size: clamp(1.5rem, 4vw, 2rem);
        padding: 1.5rem;
        font-weight: 300;
        strong {
            font-weight: 800;
        }
    }
    ul {
        display: flex;
        justify-content: center;
        gap: 1rem;
        list-style-type: none;
        li {
            font-size: clamp(1rem, 3vw, 1.5rem);
            opacity: 0.8;
            strong {
                font-weight: 800;
                margin-right: 0.5rem;
                opacity: 1;
            }
        }
        li + li {
            border-left: 2px solid #ffffff40;
            padding-left: 1rem;
        }
    }
    img {
        width: clamp(10rem, 80vw, 20rem);
        padding: 0 0 1rem;
    }
`