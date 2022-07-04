import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Weather = () => {
    
    const [weather, setWeather] = useState({})
    const[temperature, setTemperature] = useState(0)
    const [isOn, setIsOn] = useState(true)
    const iconUrl =  `https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`
    function success(pos){}
   
    useEffect(()=>{
        let latitude;
        let longitude;
        success = (pos) =>{
             latitude = pos?.coords.latitude;
             longitude = pos?.coords.longitude;
             axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=47402634edee45f6b76fa36e3c94287e&units=metric`)
                .then(res =>{
                    setWeather(res.data)
                    setTemperature(Math.round(res.data.main?.temp) )
                }
                )
                
          }
          const error = () => alert("Acceso a la  ubicacion denegada");
        navigator.geolocation.getCurrentPosition(success,error);
    },[])
    
  document.body.style = 'background: gray'
    const toggleIsOn = () => {
        if(isOn){
            setTemperature(Math.round(temperature * 1.8000 + 32) )
            setIsOn(false)
        }else {
            setTemperature(Math.round((temperature - 32) / 1.8000) )
            setIsOn(true)
        }
    }
    
    return (
        <div className='card-container'>
            <h1>Weather App</h1>
            <p><span>{weather.name}, {weather.sys?.country}</span></p>
            <p><span>{weather.weather?.[0].description}</span></p>
            <img src={iconUrl}  alt="" />
            <p><span>Wind speed:</span> {weather.wind?.speed}</p>
            <p><span>Clouds:</span> {weather.clouds?.all}%</p>
            <p><span>Pressure:</span> {weather.main?.pressure}</p>
            <p >{temperature} {isOn ? ` °C` : `°F` }</p>
         
            <button onClick={toggleIsOn}>°C / °F</button>
        </div>
    );
};

export default Weather;