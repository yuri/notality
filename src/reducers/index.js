import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import stacks from './stacks';
import notes from './notes';

/* eslint no-console: 0 */
console.log('notes', notes);

const rootReducer = combineReducers({
  session,
  stacks,
  notes,
  router: routerStateReducer,
  form: formReducer,
});

export default rootReducer;
