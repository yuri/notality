import assert from 'assert';
import fireAction from '../utils/fireAction';
import notesReducer from './notes';
import { ADD_NOTE } from '../constants';
import { Map } from 'immutable';

let state = notesReducer(undefined, {});

describe('notes reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      assert.strictEqual(Map.isMap(state), true);
    });
  });

  describe('on ADD_NOTE', () => {
    const getNoteCount = () => state.toJS().ordered.length;
    it('should create a new note', () => {
      const previousCount = getNoteCount();
      state = fireAction(notesReducer, state, ADD_NOTE);
      assert.strictEqual(previousCount + 1, getNoteCount());
      const newNoteId = state.toJS().ordered[0];
      const newNoteHtml = state.getIn(['byId', newNoteId, 'html']);
      assert.strictEqual(newNoteHtml, 'No content');
    });
  });
});
