import {GET_CURRENT_WEATHER, GET_CURRENT_WEATHER_SUCCESS, GET_CURRENT_WEATHER_ERROR} from '../constants';

const currentWeatherReducer = (
    state = {
        currentWeather: {},
        isLoading: false,
        isFetched: false,
        error: ''
    },
    action
 ) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER:
            return {
                ...state,
                isLoading: true,
                isFetched: false
            }
        case GET_CURRENT_WEATHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                error: '',
                currentWeather: action.payload
            }
        case GET_CURRENT_WEATHER_ERROR:
            return {
                ...state,
                isLoading: false,
                isFetched: false,
                error: action.payload
            }
        default:
            return state;
    }
 }

 export default currentWeatherReducer;

