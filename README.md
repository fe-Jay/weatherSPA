# weatherSPA

### 공공 API로 날씨 위젯 만들기
<a href="https://jayweather.netlify.app" target="_blank">🔗날씨 위젯 바로가기</a>

<br/>
<br/>

## 🔍 날씨를 확인하고 싶은 지역을 입력해서 날씨 검색

- searchForm 컴포넌트를 만들어서, 검색창을 만든다.
- 검색form을 제출하면, 해당 지역의 날씨를 보여주는 페이지로 이동한다.
- 페이지 이동은 useNavigate Hook을 사용한다.
- setInputLocation 함수를 호출하여, preInput 값을 넘겨준다.

<br/>

![Image](https://github.com/JAYCODE-git/testRepo/assets/22652668/8ec084e6-ca11-47b8-98f0-4d7d8ce18b42)

<br/>

```js
const navigate = useNavigate();

const submitForm = (event) => {
  event.preventDefault();
  setInputLocation(preInput);
  setPreInput('');
  navigate('/');
};

<SearchForm>
  <h2>Local search</h2>
  <form onSubmit={submitForm}>
    <input type='text' placeholder='Seoul' value={preInput} onChange={(event) => setPreInput(event.target.value)} />
    <button type='submit'>🔍</button>
  </form>
</SearchForm>;
```

<br/>
<br/>

---

<br/>
<br/>

## 🌡️ Weather Api 데이터를 가져와서 현재 날씨와 이후 3일간의 날씨를 표기.

- `Promise.all`로 현재 날씨와 일기예보 API를 호출하여, 데이터를 받아온다.
- 각각 API에서 추출한 데이터를 state에 저장한다.
- 첫 접속 시 로딩 화면을 보여주고 현재 위치 데이터 노출한다.

<br/>

![Image](https://github.com/JAYCODE-git/testRepo/assets/22652668/18798b45-ee3e-4a78-b13a-cdb4c13450ba)

<br/>

```js
// 현재 위치를 받아오는 함수
function currentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject('error');
      }
    );
  });
}

// date 객체를 이용해 데이터 추출
const oneDay = 1000 * 60 * 60 * 24;
const offset = 1000 * 60 * 60 * 9;
const current = new Date().getTime() + offset;
const DesiredTime = ' 21:00:00';
const oneDaysLater = new Date(current + oneDay).toISOString().slice(0, 10) + DesiredTime;
const twoDaysLater = new Date(current + oneDay * 2).toISOString().slice(0, 10) + DesiredTime;
const threeDaysLater = new Date(current + oneDay * 3).toISOString().slice(0, 10) + DesiredTime;

// 3일치 데이터만 추출 (UTC 시간 계산 고려)
const weatherData = resultForecast.list.filter((item) => {
  return item.dt_txt === oneDaysLater || item.dt_txt === twoDaysLater || item.dt_txt === threeDaysLater;
});
```

<br/>
<br/>

---

<br/>
<br/>

## 🕰️ 24시간을 인식해서 시간대별로 배경화면에 변화 추가.

- intl.DateTimeFormat을 이용해서 현재 시간을 받아온다.
- styled-components의 props를 이용해서, 시간대별로 배경화면을 변경한다.

<br/>

![Image](https://github.com/JAYCODE-git/testRepo/assets/22652668/602a1c84-0b06-4a2d-9a47-020f258f1520)

<br/>

```js
  // 현재 시간을 받아와서 props로 전달
    const currentTime = new Intl.DateTimeFormat(
        'en', { hour: '2-digit', hourCycle: 'h23' }).format(new Date()
    )

    const GlobalStyle = createGlobalStyle`
    body {
    padding: clamp(1,5rem, 5vw, 3rem);
    background: ${(props) => (
        props.times > 6 && props.times <= 17
            ? 'linear-gradient(345.21deg, #89F7FE 2.6%, #66A6FF 85.16%)'
            : props.times > 17 && props.times <= 19
                ? 'linear-gradient(180deg, #3F51B1 -7.36%, #5A55AE 5.68%, #7B5FAC 17.73%, #8F6AAE 30.77%, #A86AA4 42.81%, #CC6B8E 54.86%, #F18271 67.9%, #F3A469 79.94%, #F7C978 92.99%)'
                : 'linear-gradient(167.44deg, #08244F 0%, #134CB5 47.38%, #0B42AB 100%)'
    )};
    }
```

<br/>
<br/>

---

<br/>
<br/>

## 참조

- https://openweathermap.org/Api
- https://www.figma.com/community/file/1023658389987124693/Miko%C5%82aj-Ni%C5%BCnik-%3A%3A-3D-Weather-icons
