import React from 'react';
import Day from '../day/Day';

const ForecastByDate = ({days, onClick, currentUnits}) => {
    return (
        <section className="days">
            {days.map((day, i) => <Day currentUnits={currentUnits} key={i} onClick={onClick} {...day} />)}
        </section>
    );
}

export default ForecastByDate;