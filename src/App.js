import sun from "./assets/sun.jfif"
import coldBg from "./assets/cold.jpg"
import hotBg from "./assets/hot.jpg"
import './App.css';
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

import { useEffect, useState } from "react";
import { weatherData } from "./weather";

function App() {

  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("chennai");
  const [unitForSpeed, setunitForSpeed] = useState(units);
  const [speedUnit, setSpeedUnit] = useState("m/s");
  const [bg, setBg] = useState(hotBg);
  const unit = units ==="metric" ? "C" : "F";
 

  const handleClick = (e)=>{
      e.preventDefault();
      let innerText = (e.currentTarget.innerText.slice(1));
      let degree = innerText === "C" ? "°F" :"°C";
      e.currentTarget.innerText = degree;
      let state = degree === "°F" ? "imperial" : "metric";
      setUnits(state);
      let value =  degree ==="°C" ? "m/s" : "m/h";
      setSpeedUnit(value)
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  useEffect(() =>{
      const weatherFetchData = async () =>{
      const data = await weatherData(city,units);
      console.log(data)
      setWeather(data);

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    }
    weatherFetchData();
  },[units,city])

  return (
    
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className='container'>

        <div className='upper-container'>
          <input className='inputBox'  onKeyDown={enterKeyPressed} type="text" placeholder='Enter city name'></input>
          <button onClick={handleClick} className='degree'>&deg;C</button>
        </div>

        <div className='middle-container'>
          <div className='content'>
            <h3>{weather.name}, {weather.country}</h3>
            <img className="image" src={weather.iconURL} alt="sun-image"></img>
            <p>{weather.description}</p>
          </div>
          <div className='temp'>
            <h1> {weather.temp}&deg;{unit} </h1>
          </div>
        </div>

        <div className='lower-container'>
          <button>
            <div className ="small">
              <FaArrowDown/><small>max</small>
            </div>
            <h1>{weather.temp_max}&deg;{unit}</h1>
          </button>
          <button>
            <div className ="small">
            <FaArrowUp /><small>min</small>
            </div>
            <h1>{weather.temp_min}&deg;{unit}</h1>
          </button>
          <button>
            <div className ="small">
            <BiHappy /><small>feels like</small>
            </div>
            <h1>{weather.feels_like}&deg;{unit}</h1>
          </button>
          <button>
            <div className ="small">
            <MdCompress /><small>pressure</small>
            </div>
            <h1>{weather.pressure}hpa</h1>
          </button>
          <button>
            <div className ="small">
            <MdOutlineWaterDrop /><small>humidity</small>
            </div>
            <h1>{weather.humidity}%</h1>
          </button>
          <button>
            <div className ="small">
            <FaWind /><small>wind speed</small>
            </div>
            <h1>{weather.speed}{speedUnit}</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
