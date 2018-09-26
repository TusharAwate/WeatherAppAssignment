import {
    GET_WEATHER_FORECAST, 
    GET_WEATHER_FORECAST_SUCCESS, 
    GET_WEATHER_FORECAST_ERROR,
    OPEN_WEATHER_API_DOMAIN,
    OPEN_WEATHER_API_FORECAST,
    OPEN_WEATHER_API_KEY_PARAM
} from '../constants';

export const fetchWeatherForecast = (cityId) => {
    return (dispatch) => {
        dispatch({
            type: GET_WEATHER_FORECAST
        });

        fetch(`${OPEN_WEATHER_API_DOMAIN}${OPEN_WEATHER_API_FORECAST}?id=${cityId}&${OPEN_WEATHER_API_KEY_PARAM}`)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: GET_WEATHER_FORECAST_SUCCESS,
                    payload: formatForecastByDates(res.list)
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_WEATHER_FORECAST_ERROR,
                    payload: err
                });
            })
    }
}

const formatForecastByDates = (forecastList) => {
    return forecastList.reduce((forecastObj, day) => {
        const date = day.dt_txt.split(' ')[0];
        forecastObj[date] = forecastObj[date] ? [...forecastObj[date], day] : [day];           
        return forecastObj
    }, {});
}