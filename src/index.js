import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css'
import moment from 'moment';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
/*
 API call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}&units={units}
 API key: process.env.REACT_APP_OPEN_WEATHER_API_KEY
 Ashburn Coordinates: Lat: 39.0438 Long: -77.4874
 Image URL: http://openweathermap.org/img/wn/{weather.icon}@2x.png 
*/

function Weather(){
  const [forcasts, setForcasts] = React.useState([]);
  const [dayNum, setDayNum] = React.useState([]);
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  React.useEffect(() =>{
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=39.0438&lon=-77.4874&appid=`+process.env.REACT_APP_OPEN_WEATHER_API_KEY+`&units=imperial`)
      .then(res => {
        const newForcasts = res.data.daily
          .map(obj => ({
            low: `${obj.temp.min}`,
            high: `${obj.temp.max}`,
            dt: `${obj.dt}`,
            date: moment(new Date(obj.dt*1000)).format("MM-DD-YYYY"),
            dayOfWeek: new Date(obj.dt*1000).getDay(),
            icon: `${obj.weather[0].icon}`,
            dayTemp: `${obj.temp.day}`,
            nightTemp: `${obj.temp.night}`,
            eveTemp: `${obj.temp.eve}`,
            mornTemp: `${obj.temp.morn}`,
            dayFeels: `${obj.feels_like.day}`,
            nightFeels: `${obj.feels_like.night}`,
            eveFeels: `${obj.feels_like.eve}`,
            mornFeels: `${obj.feels_like.morn}`,
            pressure: `${obj.pressure}`,
            humidity: `${obj.humidity}`,

          }))         
        setForcasts(newForcasts);
      });
  }, []);
  return(
    <Router>
      <div className='background'>
        <a href="/">
          <h1 className='title'>Ashburn, VA Weather Forcast</h1>
        </a>
        <span className='week'>
          {forcasts.map(forcast => (
            <a href={'/'+forcast.date}>
            <span className='day'>
              <b className='dayOfWeek'>
                {week[forcast.dayOfWeek]}
                <br />
              </b>
              <p className='date'>
                {forcast.date}
              </p>
              <img className='icon' src={'http://openweathermap.org/img/wn/' + forcast.icon + '@2x.png'}></img>   
              <p className='temp'>
                <p className='low'>{forcast.low} 	&#8457; </p>
                <p className='high'> / {forcast.high} &#8457; </p>
              </p>
            </span>
            </a>
          ))}
        </span>
      </div>
      <Switch>
        {forcasts.map(forcast => (
          <Route path={'/'+forcast.date}>
            <DayInfo date={forcast} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

function DayInfo(forcast){
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return (
    <div className="dayInfoData">
      <span className='dayBottom'>
        <b className='dayOfWeek'>
          {week[forcast.date.dayOfWeek]}
          <br />
        </b>
        <p className='date'>
          {forcast.date.date}
        </p>
        <img className='icon' src={'http://openweathermap.org/img/wn/' + forcast.date.icon + '@2x.png'}></img>   
        <p className='temp'>
        <p className='low'>{forcast.date.low} 	&#8457; </p>
        <p className='high'> / {forcast.date.high} &#8457; </p>
        </p>
      </span>
      <div className="dayInfoDataRight">  
        <p>
          Humidity: {forcast.date.humidity} % &emsp; Pressure: {forcast.date.pressure} hPa
        </p>
        <table>
          <tr>
            <th></th>
            <th>Temperature (&#8457;)</th>
            <th>Feels Like (&#8457;)</th>
          </tr>
          <tr>
            <td>Morning</td>
            <td>{forcast.date.mornTemp}</td>
            <td>{forcast.date.mornFeels}</td>
          </tr>
          <tr>
            <td>Day</td>
            <td>{forcast.date.dayTemp}</td>
            <td>{forcast.date.dayFeels}</td>
          </tr>
          <tr>
            <td>Evening</td>
            <td>{forcast.date.eveTemp}</td>
            <td>{forcast.date.eveFeels}</td>
          </tr>
          <tr>
            <td>Night</td>
            <td>{forcast.date.nightTemp}</td>
            <td>{forcast.date.nightFeels}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
 ReactDOM.render(
  <Weather />,
  document.getElementById('root')
); 

