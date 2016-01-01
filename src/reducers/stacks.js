/* eslint no-console: 0 */

import { fromJS } from 'immutable';
import uuid from 'node-uuid';
import { createReducer } from './utils';
import {
  ADD_STACK,
  FETCH_STACKS,
  ARCHIVE_STACK,
  UNARCHIVE_STACK,
  SELECT_STACK,
  // UNSELECT_STACK,
  SHOW_NEW_STACK_FORM,
  HIDE_NEW_STACK_FORM,
  SET_NEW_STACK_NAME,
} from '../constants';

const INITIAL_STATE = fromJS({
  byId: {},
  ordered: [],
  selectedStackId: null,
  newStackFormIsVisible: false,
});

// Makes a new note.
function makeNewStack(mode, name) {
  return {
    id: uuid.v4(),
    timeCreated: new Date().toISOString(),
    name: name,
    html: 'No content',
    isArchived: false,
  };
}

// function log(key, handler) {
//   return function(state, action) {
//     console.log(key, action.payload.stackId, action, state.toJS());
//     var newState = handler(state, action);
//     console.log('new state', newState.toJS());
//     return newState;
//   }
// }

function makeStackUpdater(stackKey, actionPayloadTranformer) {
  return (state, action) => {
    const stackId = action.payload.stackId || state.get('selectedStackId');
    if (!stackId) {
      throw new Error('stackId needs to be specified.');
    }
    return state.setIn(
      ['byId', stackId, noteKey],
      actionPayloadTranformer(action.payload)
    );
  };
}

const stacksReducer = createReducer(INITIAL_STATE, {
  [FETCH_STACKS]: (state, action) => {
    if (action.status === 'success') {
      return state.mergeIn([], action.data);
    }
    return state;
  },
  [ADD_STACK]: (state, action) => {
    const newStack = makeNewStack('addStack', action.payload.name);
    console.log('NEW STACK:', newStack.id, state.toJS(), action);
    return state
      .update('ordered', (ids) => ids.unshift(newStack.id))
      .mergeIn(['byId', newStack.id], fromJS(newStack))
      .setIn(['selectedStackId'], newStack.id);
  },
  [ARCHIVE_STACK]: makeStackUpdater('isArchived', () => true),
  [UNARCHIVE_STACK]: makeStackUpdater('isArchived', () => false),
  [SELECT_STACK]: (state, action) => state
    .setIn(['selectedStackId'], action.payload.stackId),
  [SHOW_NEW_STACK_FORM]: (state) => state
    .setIn(['newStackFormIsVisible'], true),
  [HIDE_NEW_STACK_FORM]: (state) => state
    .setIn(['newStackFormIsVisible'], false),
  [SET_NEW_STACK_NAME]: (state, action) => state
    .setIn(['newStackName'], action.payload.name),
});

export default stacksReducer;
