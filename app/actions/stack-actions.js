import { createAction } from 'redux-actions';
import { fetchData, saveData } from '../api';

window.debug = window.debug || {};
window.debug.stackActions = {savers: []};

/*
 * Action types.
 */

export const FETCH_STACKS = 'FETCH_STACKS';
export const ADD_STACK = 'ADD_STACK';
export const SELECT_STACK = 'SELECT_STACK';
export const UNSELECT_STACK = 'SELECT_STACK';
export const UPDATE_STACK_CONTENT = 'UPDATE_STACK_CONTENT';
export const ARCHIVE_STACK = 'ARCHIVE_STACK';
export const UNARCHIVE_STACK = 'UNARCHIVE_STACK';

/*
 * Action creators.
 */

export const selectStack = createAction(
  SELECT_STACK,
  (stackId) => ({stackId})
);

export const unselectStack = createAction(
  UNSELECT_STACK,
  (stackId) => ({stackId})
);

function makeStackSaver(actionType, reducer) {
  return function(...args) {
    var saver = (dispatch, getState) => {
      dispatch(createAction(actionType, reducer)(...args));
      console.log('Saving note:', getState().stacks.toJS());
      saveData(getState().stacks.toJS());
    };
    window.debug.stackActions.savers[actionType] = saver;
    return saver;
  }
}

export const addStack = makeStackSaver(ADD_STACK);

export const updateStackContent = makeStackSaver(
  UPDATE_STACK_CONTENT,
  (stackId, newContent) => ({stackId, newContent})
);

export const archiveStack = makeStackSaver(
  ARCHIVE_STACK,
  (stackId) => ({stackId})
);

export const unarchiveStack = makeStackSaver(
  UNARCHIVE_STACK,
  (stackId) => ({stackId})
);