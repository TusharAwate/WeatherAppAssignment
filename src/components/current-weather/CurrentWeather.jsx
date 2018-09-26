import React from 'react';
import { WEATHER_ICON_DOMAIN } from '../../constants';

const CurrentWeather = ({currentLocation, currentDay, currentIcon, currentTemp, currentMinTemp, currentMaxTemp, currentUnits, changeUnits}) => {
    return (
        <header className="current-weather">
            <div className="current-weather__data">
                <p className="current-weather__data--max">Max:&#176;{currentMaxTemp}</p>
                <p className="current-weather__data--current">{currentTemp}&#176;<span onClick={changeUnits}>{currentUnits}</span></p>
                <p className="current-weather__data--min">Min:&#176;{currentMinTemp}</p>
            </div>
            <div className="current-weather__icon">
                <img className="current-weather__icon--img" src={`${WEATHER_ICON_DOMAIN}${currentIcon}.png`} alt=""/>
            </div>
            <div className="current-weather__date-loc">
                <p className="current-weather__date-loc--date">{currentDay}</p>
                <p className="current-weather__date-loc--loc">{currentLocation}</p>
            </div>
        </header>
    );
}

export default CurrentWeather;