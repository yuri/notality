require("./Assets/style.scss")

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { notes } from './reducers/notes';
import { filters } from './reducers/filters';
import { initialState } from './initialState';
import App from './App.js';
import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { fetchNotes } from './actions';

/*
 * The redux app and the store.
 */

let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

let store = createStoreWithMiddleware(
  combineReducers({
    filters,
    notes
  }),
  initialState
);

store.dispatch(fetchNotes());

/*
 * Attach React.
 */

React.render((
  <Provider store={store}>
    {() => <App />}
  </Provider>
), document.getElementById('body'));
