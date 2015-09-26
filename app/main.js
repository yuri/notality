import assets from './assets/style.scss';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { notes } from './reducers/notes';
import { filters } from './reducers/filters';
import { initialState } from './initialState';
import { bindKeyboardShortcuts } from './keyboardShortcuts';
import App from './App.js';
import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { fetchNotes } from './actions/note-actions';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

/*
 * The redux app and the store.
 */

// let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(thunk, logger),
  // Provides support for DevTools:
  // devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

let store = finalCreateStore(
  combineReducers({
    filters,
    notes
  }),
  initialState
);

store.dispatch(fetchNotes());

bindKeyboardShortcuts(store);

window.debug = window.debug || {};
window.debug.store = store;
window.debug.execute = function(actionCreator, ...args) {
  const action = actionCreator.apply(null, args);
  if (typeof action === 'function') {
    action(store.dispatch.bind(store), store.getState.bind(store));
  } else {
    window.debug.dispatch(action);
  }
}

/*
 * Attach React.
 */

//<DebugPanel top right bottom>
//  <DevTools store={store} monitor={LogMonitor} />
//</DebugPanel>

React.render((
  <div>
    <Provider store={store}>
      {() => <App />}
    </Provider>
  </div>
), document.getElementById('body'));
