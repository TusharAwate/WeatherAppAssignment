import * as weatherFilterReducer from '../../reducers/weather-filter-reducer';

import * as type from '../../actions/weather-filter-actions';

import expect from 'expect';
const defaultState = {
    currentUnits: 'C'
};

describe('weatherFilterReducer CHANGE_UNITS', () => {
    it('should chnage the unit', () => {
      expect(
        weatherFilterReducer(defaultState, {type: CHANGE_UNITS})
      ).toEqual({
        currentUnits: 'F'
      });
    });
  });