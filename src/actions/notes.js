import { createAction } from 'redux-actions';
import { fetchData, saveData } from '../api/data';

import {
  FETCH_NOTES,
  ADD_NOTE,
  UPDATE_NOTE_CONTENT,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  SELECT_NOTE,
  UNSELECT_NOTE,
} from '../constants';

/*
 * Action creators.
 */

// export function fetchNotes(status, data) {
//   if (status) {
//     return {
//       type: FETCH_NOTES,
//       status: status,
//       data: data,
//     };
//   }
//   return dispatch => {
//     dispatch(fetchNotes('request'));
//     return fetchData()
//       .then(json => dispatch(fetchNotes('success', json)))
//       .then(null, error => dispatch(fetchNotes('error', error)));
//   };
// }

function makeFetchNotesAction(status, data) {
  return {
    type: FETCH_NOTES,
    payload: {
      status: status,
      data: data,
    },
  };
}

export function fetchNotes() {
  return dispatch => {
    dispatch(makeFetchNotesAction('request'));
    return fetchData()
      .then(json => dispatch(makeFetchNotesAction('success', json)))
      .then(null, error => dispatch(makeFetchNotesAction('error', error)));
  };
}

export const selectNote = createAction(
  SELECT_NOTE,
  (noteId) => ({noteId})
);

export const unselectNote = createAction(
  UNSELECT_NOTE,
  (noteId) => ({noteId})
);

function makeNoteSaver(actionType, reducer) {
  return function saveNote(...args) {
    return (dispatch, getState) => {
      dispatch(createAction(actionType, reducer)(...args));
      saveData(getState().notes.toJS());
    };
  };
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

export default {
  fetchNotes,
  selectNote,
  unselectNote,
  addNote,
  updateNoteContent,
  archiveNote,
};
