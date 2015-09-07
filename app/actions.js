import { createAction } from 'redux-actions';
import { fetchData, saveData } from './api';
/*
 * Action types.
 */

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE_CONTENT = 'UPDATE_NOTE_CONTENT';
export const ARCHIVE_NOTE = 'ARCHIVE_NOTE';
export const FETCH_NOTES = 'FETCH_NOTES';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * Filter constants.
 */

export const VisibilityFilters = {
  HIDE_ARCHIVED: 'HIDE_ARCHIVED',
  SHOW_ARCHIVED: 'SHOW_ARCHIVED'
};

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

export const addNote = createAction('ADD_NOTE');

export const actuallyUpdateNoteContent = createAction(
  'UPDATE_NOTE_CONTENT',
  (noteId, newContent) => ({noteId, newContent})
);

export function updateNoteContent(noteId, newContent) {
  return (dispatch, getState) => {
    dispatch(actuallyUpdateNoteContent(noteId, newContent));
    saveData(getState().notes.toJS());
  };
}

export function archiveNote(nodeId) {
  return { type: ARCHIVE_NOTE, nodeId: noteId};
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}