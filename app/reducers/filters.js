import { fromJS } from 'immutable';
import { createReducer } from './utils';
import {
  VisibilityFilters,
  SET_VISIBILITY_FILTER
} from '../actions/filter-actions';

export const filters = createReducer({
  [SET_VISIBILITY_FILTER]: (state, action) => state.set(
    'showArchived',
    action.filter===VisibilityFilters.SHOW_ARCHIVED
  )
});