import { createAction } from 'redux-actions';
import { fetchData, saveData } from '../api';

window.debug = window.debug || {};
window.debug.noteActions = {savers: []};

/*
 * Action types.
 */

export const FETCH_NOTES = 'FETCH_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE_CONTENT = 'UPDATE_NOTE_CONTENT';
export const ARCHIVE_NOTE = 'ARCHIVE_NOTE';
export const UNARCHIVE_NOTE = 'UNARCHIVE_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const UNSELECT_NOTE = 'SELECT_NOTE';

/*
 * Action creators.
 */

export function fetchNotes(status, data) {
  if (status) {
    return {
      type: FETCH_NOTES,
      status: status,
      data: data
    }
  } else {
    return dispatch => {
      dispatch(fetchNotes('request'))
      return fetchData()
        .then(json => dispatch(fetchNotes('success', json)))
        .then(null, error => dispatch(fetchNotes('error', error)));
    };
  }
}

function makeFetchNotesAction(status, data) {
  return {
    type: FETCH_NOTES,
    payload: {
      status: status,
      data: data
    }
  };
}

export function fetchNotes() {
  return dispatch => {
    dispatch(makeFetchNotesAction('request'));
    return fetchData()
      .then(json => dispatch(makeFetchNotesAction('success', json)))
      .then(null, error => dispatch(makeFetchNotesAction('error', error)));
  };
};


export const selectNote = createAction(
  SELECT_NOTE,
  (noteId) => ({noteId})
);

export const unselectNote = createAction(
  UNSELECT_NOTE,
  (noteId) => ({noteId})
);

function makeNoteSaver(actionType, reducer) {
  return function(...args) {
    var saver = (dispatch, getState) => {
      dispatch(createAction(actionType, reducer)(...args));
      console.log('Saving note:', getState().notes.toJS());
      saveData(getState().notes.toJS());
    };
    window.debug.noteActions.savers[actionType] = saver;
    return saver;
  }
}

export const addNote = makeNoteSaver(ADD_NOTE);

export const updateNoteContent = makeNoteSaver(
  UPDATE_NOTE_CONTENT,
  (noteId, newContent) => ({noteId, newContent})
);

export const archiveNote = makeNoteSaver(
  ARCHIVE_NOTE,
  (noteId) => ({noteId})
);

export const unarchiveNote = makeNoteSaver(
  UNARCHIVE_NOTE,
  (noteId) => ({noteId})
);