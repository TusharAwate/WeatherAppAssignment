import React from 'react';
import {WEATHER_ICON_DOMAIN} from '../../constants';

const ForecastTile = ({time, icon, deg, currentUnits}) => {
    return (
        <div className="forecast__tile">
            <p className="forecast__tile--deg">{deg}&#176;{currentUnits}</p>
            <img className="forecast__tile--icon" src={`${WEATHER_ICON_DOMAIN}${icon}.png`} alt=""/>
            <p className="forecast__tile--time">{time}</p>
        </div>
    );
}

export default ForecastTile;