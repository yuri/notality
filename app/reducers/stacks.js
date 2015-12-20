import { fromJS } from 'immutable';
import { createReducer } from './utils';
import {
  ADD_STACK,
  FETCH_STACKS,
  ARCHIVE_STACK,
  UNARCHIVE_STACK,
  SELECT_STACK,
  UNSELECT_STACK,
  UPDATE_STACK_CONTENT
} from '../actions/stack-actions';

// Makes a new note.
function makeNewStack(tag) {
  console.log('makeNewStack', tag)
  return {
    id: uuid.v4(),
    timeCreated: new Date().toISOString(),
    title: 'Needs a title',
    html: 'No content',
    isArchived: false
  }
}

function log(key, handler) {
  return function(state, action) {
    console.log(key, action.payload.stackId, action, state.toJS());
    var newState = handler(state, action);
    console.log('new state', newState.toJS());
    return newState;
  }
}

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
  }
}

export const notes = createReducer({
  [FETCH_STACKS]: (state, action) => {
    if (action.status === 'success') {
      return state.mergeIn([], action.data);
    } else {
      return state;
    }
  },
  [ADD_STACK]: (state, action) => {
    var newNote = makeNewNote('addNote');
    console.log('NEW NOTE:', newNote.id, state.toJS(), action);
    return state
      .update('ordered', (ids) => ids.unshift(newNote.id))
      .mergeIn(['byId', newNote.id], fromJS(newNote))
      .setIn(['selectedStackId'], newNote.id);
  },
  [UPDATE_STACK_CONTENT]: makeNoteUpdater('html', (payload) => payload.newContent),
  [ARCHIVE_STACK]: makeNoteUpdater('isArchived', (payload) => true),
  [UNARCHIVE_STACK]: makeNoteUpdater('isArchived', (payload) => false),
  [SELECT_STACK]: (state, action) => state
    .setIn(['selectedStackId'], action.payload.stackId)
});