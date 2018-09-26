import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import CurrentWeather from '../../components/current-weather/CurrentWeather';
import {fetchCurrentWeather} from '../../actions/current-weather-actions';
import {changeUnits} from '../../actions/weather-filter-actions';
import {fetchWeatherForecast} from '../../actions/weather-forecast-actions';
import ForecastByDay from '../../components/forecast-by-day/ForecastByDay';
import ForecastByDate from '../../components/forecast-by-date/ForecastByDate';
import {daysNames} from '../../constants';

class WeatherWidget extends Component {
    constructor(props) {
        super(props);

        this.defaultCityId = 2643743;
        this.props.fetchCurrentWeather(this.defaultCityId);
        this.props.fetchWeatherForecast(this.defaultCityId);

        this.state = {
            selectedDate: this.formatCurrentSelectedDate()
        }
    }

    changeSelectedDate = (date) => {
        this.setState({
            selectedDate: date
        });
    }

    formatCurrentWeather = (currentWeatherObj) => {
        const day = daysNames[this.getFormatedDate(currentWeatherObj.dt).getDay()];

        return {
            currentLocation: currentWeatherObj.name,
            currentDay: day,
            currentIcon: currentWeatherObj.weather[0].icon,
            currentTemp: this.formatDegrees(currentWeatherObj.main.temp),
            currentMinTemp: this.formatDegrees(currentWeatherObj.main.temp_min),
            currentMaxTemp: this.formatDegrees(currentWeatherObj.main.temp_max),
            currentUnits: this.props.currentUnits
        }
    }

    formatForecastByDays = () => {
        const {weatherForecast} = this.props;
        let min, max, icon, label, dt;
        let daysArray = [];

        for (let day in weatherForecast) {
            const curDayArr = weatherForecast[day];
            const middleElem = curDayArr[Math.floor(curDayArr.length / 2)];
            label = daysNames[this.getFormatedDate(middleElem.dt).getDay()].substring(0,3);
            icon = middleElem.weather[0].icon;
            min = this.formatDegrees(Math.min.apply(Math, curDayArr.map((item) => item.main.temp_min)));
            max = this.formatDegrees(Math.max.apply(Math, curDayArr.map((item) => item.main.temp_max)));
            dt = day;
            daysArray = [...daysArray, {label, min, max, icon, dt}];
        }

        return daysArray;
    }

    formatForecastByDay = () => {
        const {weatherForecast} = this.props;
        let {selectedDate} = this.state;

        return weatherForecast[selectedDate].map((item) => {
            const hours = this.getFormatedDate(item.dt).getHours();
            const minutesNonFormated = this.getFormatedDate(item.dt).getMinutes()
            const minutes = minutesNonFormated < 10 ? minutesNonFormated + '0' : minutesNonFormated;
            const icon = item.weather[0].icon;
            const deg = this.formatDegrees(item.main.temp);
            return {
                time: `${hours}:${minutes}`,
                icon,
                deg
            }
        });
    }

    formatDegrees = (deg) => {
        return this.props.currentUnits === 'C' ? Math.round(deg-273.15) : Math.round(deg*9/5-459.67);
    }

    getFormatedDate = (dtValue) => {
        const date = new Date(dtValue * 1000);
        return new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    }

    changeUnits = () => {
        this.props.changeUnits();
    }

    formatCurrentSelectedDate = () => {
        const today = new Date();
        const dateMonth = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        const dateDay = today.getDate() < 10 ? '0' + (today.getDate()) : today.getDate();
        return `${today.getFullYear()}-${dateMonth}-${dateDay}`;
    }

    render() {
        const {currentWeather, currentWeatherFetched, weatherForecastFetched, currentUnits} = this.props;
        const currentWeatherObj = currentWeatherFetched && this.formatCurrentWeather(currentWeather);

        return (
            <Fragment>
                {currentWeatherFetched && <CurrentWeather changeUnits={this.changeUnits} {...currentWeatherObj} />}
                {weatherForecastFetched && 
                    <Fragment>
                        <ForecastByDay currentUnits={currentUnits} tiles={this.formatForecastByDay()} />
                        <ForecastByDate currentUnits={currentUnits} onClick={this.changeSelectedDate} days={this.formatForecastByDays()} />
                    </Fragment>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather.currentWeather,
        currentWeatherError: state.currentWeather.error,
        currentWeatherLoading: state.currentWeather.isLoading,
        currentWeatherFetched: state.currentWeather.isFetched,
        currentUnits: state.weatherFilter.currentUnits,
        weatherForecast: state.weatherForecast.weatherForecast,
        weatherForecastError: state.weatherForecast.error,
        weatherForecastFetched: state.weatherForecast.isFetched,
        weatherForecastLoading: state.weatherForecast.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentWeather: (cityId) => {
            dispatch(fetchCurrentWeather(cityId));
        },
        fetchWeatherForecast: (cityId) => {
            dispatch(fetchWeatherForecast(cityId));
        },
        changeUnits: (units) => {
            dispatch(changeUnits(units));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);