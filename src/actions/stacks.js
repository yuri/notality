import { createAction } from 'redux-actions';
// import { fetchData, saveData } from '../api/data';

import {
  // FETCH_STACKS,
  ADD_STACK,
  SELECT_STACK,
  UNSELECT_STACK,
  UPDATE_STACK_CONTENT,
  ARCHIVE_STACK,
  UNARCHIVE_STACK,
  SHOW_NEW_STACK_FORM,
  HIDE_NEW_STACK_FORM,
  SET_NEW_STACK_NAME,
} from '../constants';

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

function fakeSaveData(data) {
  /* eslint no-console: 0 */
  console.log('PRETENDING TO SAVE:');
  console.log(data);
}

function makeStackSaver(actionType, reducer) {
  return (...args) => {
    return (dispatch, getState) => {
      dispatch(createAction(actionType, reducer)(...args));
      console.log('Saving stack:', getState().stacks.toJS());
      fakeSaveData(getState().stacks.toJS());
    };
  };
}

export const addStack = makeStackSaver(
  ADD_STACK,
  (name) => ({name})
);

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

export const showNewStackForm = createAction(SHOW_NEW_STACK_FORM);
export const hideNewStackForm = createAction(HIDE_NEW_STACK_FORM);
export const setNewStackName = createAction(
  SET_NEW_STACK_NAME,
  (name) => ({name})
);

export default {
  showNewStackForm,
  hideNewStackForm,
  addStack,
  setNewStackName,
};
