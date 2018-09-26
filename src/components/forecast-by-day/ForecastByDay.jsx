import React from 'react';
import ForecastTile from '../forecast-tile/ForecastTile';

const ForecastByDay = ({currentUnits, tiles}) => {
    return (
        <section className="forecast">
            {tiles.map((tile, i) => <ForecastTile currentUnits={currentUnits} key={i} {...tile} />)}
        </section>
    );
}

export default ForecastByDay;