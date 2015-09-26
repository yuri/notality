import { createAction } from 'redux-actions';

/*
 * Action types.
 */
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * Filter constants.
 */

export const VisibilityFilters = {
  HIDE_ARCHIVED: 'HIDE_ARCHIVED',
  SHOW_ARCHIVED: 'SHOW_ARCHIVED'
};

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}