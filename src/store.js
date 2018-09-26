import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/root-reducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;