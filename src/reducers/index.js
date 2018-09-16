'use strict'
import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { eventsReducers } from './eventsReducers';
import { notificationReducers } from './notificationReducers';

export default combineReducers({
   events: eventsReducers,
   notifications:notificationReducers
});