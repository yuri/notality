import uuid from 'node-uuid';
import { fromJS } from 'immutable';
import { createReducer } from './utils';
import {
  ADD_NOTE,
  FETCH_NOTES,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  UPDATE_NOTE_CONTENT,
  SELECT_NOTE,
  UNSELECT_NOTE
} from '../actions/note-actions';
import { SELECT_STACK } from '../actions/stack-actions';

// Makes a new note.
function makeNewNote(tag) {
  console.log('makeNewNote', tag)
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
    console.log(key, action.payload.noteId, action, state.toJS());
    var newState = handler(state, action);
    console.log('new state', newState.toJS());
    return newState;
  }
}

function makeNoteUpdater(noteKey, actionPayloadTranformer) {
  return (state, action) => {
    const noteId = action.payload.noteId || state.get('selectedNoteId');
    if (!noteId) {
      throw new Error('NoteId needs to be specified.');
    }
    return state.setIn(
      ['byId', noteId, noteKey],
      actionPayloadTranformer(action.payload)
    );
  }
}

export const notes = createReducer({
  [FETCH_NOTES]: (state, action) => {
    if (action.status === 'success') {
      return state.mergeIn([], action.data);
    } else {
      return state;
    }
  },
  [ADD_NOTE]: (state, action) => {
    var newNote = makeNewNote('addNote');
    console.log('NEW NOTE:', newNote.id, state.toJS(), action);
    return state
      .update('ordered', (ids) => ids.unshift(newNote.id))
      .mergeIn(['byId', newNote.id], fromJS(newNote))
      .setIn(['selectedNoteId'], newNote.id);
  },
  [UPDATE_NOTE_CONTENT]: makeNoteUpdater('html', (payload) => payload.newContent),
  [ARCHIVE_NOTE]: makeNoteUpdater('isArchived', (payload) => true),
  [UNARCHIVE_NOTE]: makeNoteUpdater('isArchived', (payload) => false),
  [SELECT_NOTE]: (state, action) => state
    .setIn(['selectedNoteId'], action.payload.noteId),
  [SELECT_STACK]: (state, action) => state
    .setIn(['selectedStackId'], action.payload.stackId)
});