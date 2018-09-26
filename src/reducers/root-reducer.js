import {combineReducers} from 'redux';
import currentWeatherReducer from './current-weather-reducer';
import weatherForecastReducer from './weather-forecast-reducer';
import weatherFilterReducer from './weather-filter-reducer';

export default combineReducers({
    currentWeather: currentWeatherReducer,
    weatherForecast: weatherForecastReducer,
    weatherFilter: weatherFilterReducer
});