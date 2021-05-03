import { useState } from 'react';
import './App.css';

const API={
  key:"c0a6af5b98a87a6deea8206f02f7e690",
  base: "https://api.openweathermap.org/data/2.5/"

}
function App() {

  const [query,setQuery]= useState('');
  const [weather,setWeather]= useState({});
  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
      .then(res => res.json() )
      .then(result => setWeather(result));  
    }
  }
  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November",
  "December"];
  let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day= days[d.getDay()];
  let date=d.getDate();
  let month=months[d.getMonth()];
  let year=d.getFullYear();
  return `${day} ${date} ${month} ${year}`
  }
  return (
   
      <div className="col-sm-6 col-md-12 col-lg-12">
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16)
                        ? 'app warm':'app'):'app'}>
      <main >
      
        <div className="search-box">
          <input type="text" className="search-bar" 
          onChange={e =>setQuery(e.target.value)}
          value={query}
          onKeyPress={search} 
           placeholder="Search..."/>
        </div>
        {(typeof weather.main !="undefined")?(
        <div>
          <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ):('')}
      </main>
    </div>
 
    </div>
  
  
   
    )
}

export default App;
