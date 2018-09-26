import React, { Component } from 'react';
import './main.css';
import WeatherWidget from './containers/weather-widget/WeatherWidget';

class App extends Component {
  render() {
    return (
      <section className="weather-widget">
        <WeatherWidget/>
      </section>
    );
  }
}

export default App;
