import { fromJS } from 'immutable';

export const initialState = {
  filters: fromJS({
    showArchived: false
  }),
  notes: fromJS({
    ordered: [
    ],
    byId: {}
  })
};