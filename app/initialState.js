import { fromJS } from 'immutable';

export const initialState = {
  filters: fromJS({
    showArchived: false
  }),
  stacks: fromJS({
    byId: {
    },
    selectedStackId: null
  }),
  notes: fromJS({
    ordered: [
    ],
    byId: {},
    selectedNoteId: null
  })
};