'use strict'
import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { eventsReducers } from './eventsReducers';

export default combineReducers({
   events: eventsReducers
});