/*
 * Creates a reducer from a map of handlers. Stolen from Redux documentation.
 */

export function createReducer(handlers) {
  return function reducer(state, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state || {};
    }
  }
}