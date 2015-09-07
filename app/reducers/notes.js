import uuid from 'node-uuid';
import { fromJS } from 'immutable';
import { createReducer } from './utils';
import {
  ADD_NOTE,
  FETCH_NOTES,
  ARCHIVE_NOTE,
  UPDATE_NOTE_CONTENT
} from '../actions';

// Makes a new note.
function makeNewNote() {
  return {
    id: uuid.v4(),
    timeCreated: new Date().toISOString(),
    title: 'Needs a title',
    html: 'No content',
    archived: false
  }
}

export const notes = createReducer({
  [UPDATE_NOTE_CONTENT]: (state, action) => state.setIn(
    ['byId', action.payload.noteId, 'html'],
    action.payload.newContent
  ),
  [FETCH_NOTES]: (state, action) => {
    if (action.status === 'success') {
      return state.mergeIn([], action.data);
    } else {
      return state;
    }
  },
  [ADD_NOTE]: (state, action) => {
    var newNote = makeNewNote();
    return state
      .update('ordered', (ids) => ids.unshift(newNote.id))
      .mergeIn(['byId', newNote.id], fromJS(newNote));
  }
});