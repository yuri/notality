import Mousetrap from 'mousetrap';

import { addNote, archiveNote } from './actions/note-actions';

const shortcuts = [
  {
    keySequences: ['ctrl+n', 'n'],
    action: addNote
  },
  {
    keySequences: ['ctrl+a', 'a'],
    action: archiveNote
  }
];

export function bindKeyboardShortcuts(store) {
  shortcuts.forEach(function(shortcut) {
    Mousetrap.bind(shortcut.keySequences, function() {
      store.dispatch(shortcut.action());
    });
  });
}

