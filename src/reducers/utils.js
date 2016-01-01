/*
 * Creates a reducer from a map of handlers. Stolen from Redux documentation.
 */

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state || {};
  };
}
