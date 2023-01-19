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

  const [weather, setWeather] = useState();
  const [units, setUnits] = useState("metric");
  useEffect(() =>{
     
      const weatherFetchData = async () =>{
      const data = await weatherData("salem");
      console.log(data)
      setWeather(data.data);
    }
    weatherFetchData();
  },[])

  return (
    <div style={{backgroundImage : `url(${coldBg})`}} className="App">
      <div className='container'>

        <div className='upper-container'>
          <input className='inputBox' type="text" placeholder='Enter city name'></input>
          <button className='degree'>&deg;F</button>
        </div>

        <div className='middle-container'>
          <div className='content'>
            <h3>{weather.name}, {weather.country}</h3>
            <img className="image" src={weather.iconURL} alt="sun-image"></img>
            <p>{weather.description}</p>
          </div>
          <div className='temp'>
            <h1> {weather.temp.toFixed()}&deg;{units ==="metric" ? "C" : "F"} </h1>
          </div>
        </div>

        <div className='lower-container'>
          <button>
            <div className ="small">
              <FaArrowDown/><small>min</small>
            </div>
            <h1>32&deg;</h1>
          </button>
          <button>
            <div className ="small">
            <FaArrowUp /><small>max</small>
            </div>
            <h1>32&deg;</h1>
          </button>
          <button>
            <div className ="small">
            <BiHappy /><small>feels like</small>
            </div>
            <h1>32&deg;</h1>
          </button>
          <button>
            <div className ="small">
            <MdCompress /><small>pressure</small>
            </div>
            <h1>32&deg;</h1>
          </button>
          <button>
            <div className ="small">
            <MdOutlineWaterDrop /><small>humidity</small>
            </div>
            <h1>32&deg;</h1>
          </button>
          <button>
            <div className ="small">
            <FaWind /><small>wind speed</small>
            </div>
            <h1>32&deg;</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
