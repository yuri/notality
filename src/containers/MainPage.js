import React from 'react';
import { connect } from 'react-redux';

import stackActions from '../actions/stacks';
import StackSelector from '../components/stack-selector/StackSelector';

import noteActions from '../actions/notes';
import NotePane from '../components/notes/NotePane';

import Container from '../components/ui/Container';
import Column from '../components/ui/Column';

// Returns a set of filters for selecting notes for display.
const getNoteFilterFunctions = (noteFilter) => ({
  showArchived: (note) => (
    (noteFilter.showArchived && noteFilter.showArchived.value)
    || (! note.isArchived)
  ),
  text: (note) => (
    (! noteFilter.text)
    || note.html.search(noteFilter.text.value) >= 0
  ),
});

// Returns notes that should be visible at this point.
const getVisibleNotes = (notes, noteFilter = {}) => {
  const noteFilterFunctions = getNoteFilterFunctions(noteFilter);
  return notes
    .filter(noteFilterFunctions.text)
    .filter(noteFilterFunctions.showArchived);
};

const MainPage = ({ state, handlers }) => (
  <Container className="flex-stretch border flex-auto">
    <Column className="col-3 border-right flex-auto">
      <h1></h1>
      <StackSelector
        stacks={ state.stacks }
        handlers={ handlers.stacks }/>
    </Column>
    <Column className="col-9 px2">
      <h1></h1>
      <NotePane
        noteCounts = {{
          total: state.notes.length,
        }}
        notes = { getVisibleNotes(state.notes, state.noteFilter) }
        handlers = {handlers.notes}
        showArchived = {state.showArchived} />
    </Column>
  </Container>
);

function mapStateToProps(state) {
  const notesAsJS = state.notes.toJS();
  return {
    state: {
      stacks: state.stacks,
      notes: notesAsJS.ordered.map((id) => notesAsJS.byId[id]),
      selectedNoteId: notesAsJS.selectedNoteId,
      noteFilter: state.form.noteFilter,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      stacks: {
        showNewStackForm: () => dispatch(stackActions.showNewStackForm()),
        hideNewStackForm: () => dispatch(stackActions.hideNewStackForm()),
        addStack: (name) => dispatch(stackActions.addStack(name)),
        setNewStackName: (name) => dispatch(stackActions.setNewStackName(name)),
      },
      notes: {
        onContentChange: (noteId, newContent) => dispatch(noteActions.updateNoteContent(noteId, newContent)),
        onAddNote: () => dispatch(noteActions.addNote()),
        onSelectNote: (noteId) => dispatch(noteActions.selectNote(noteId)),
        onArchiveNote: (noteId) => dispatch(noteActions.archiveNote(noteId)),
        onUnarchiveNote: (noteId) => dispatch(noteActions.unarchiveNote(noteId)),
      },
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
