import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a237636b683ca065f849f9b5dc2fd4b9`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('');
   }
  }

  return (
    <div className='app'>

      <div className='search'>
        <input type='text' 
               value={location}
               onChange={event => setLocation(event.target.value)}
               onKeyPress={searchLocation}
               placeholder='Enter location'/>
      </div>

      <div className='container'>

        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
           {data.main ? <h1>{data.main.temp.toFixed(0)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main != undefined &&
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed(0)}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p>: null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.main ? <p className='bold'>{data.wind.speed.toFixed(0)} KM/h</p> : null}
            <p>Wind speed</p>
          </div>
        </div>
        }

      </div>  {/* className='container' */}

    </div> // className='app'
  );
}

export default App;
