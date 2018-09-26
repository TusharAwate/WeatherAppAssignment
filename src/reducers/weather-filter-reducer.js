import {CHANGE_UNITS} from '../constants';

const weatherFilterReducer = (
    state = {
        currentUnits: 'C'
    },
    action
 ) => {
    switch (action.type) {
        case CHANGE_UNITS:
            return {
                ...state,
                currentUnits: state.currentUnits === 'C' ? 'F' : 'C'
            }
        default:
            return state;
    }
 }

 export default weatherFilterReducer;