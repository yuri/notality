import { connect } from 'react-redux';
import { Component } from 'react';
import { addNote, updateNoteContent, archiveNote, unarchiveNote, selectNote, unselecteNote } from './actions/note-actions';
import { setVisibilityFilter, VisibilityFilters } from './actions/filter-actions';

var React=require('react');

/////////////////

import { Note } from './components/Note';
import { BinSelector } from './components/BinSelector';

class SearchBox extends Component {
  getDOMNode() {
    return React.findDOMNode(this);
  }
  handleKeyUp() {
    this.props.onSearchStringUpdate(this.getDOMNode().value);
  }
  render() {
    return (
      <input className="note-search" onKeyUp={() => this.handleKeyUp()}></input>
    )
  }  
}


class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.keyMap = {
      'newNote': ['up', 'w']
    };
    this.keyHandlers = {
      'newNote': (event) => console.log('New note!')
    };
  }
  setSearchString(searchString) {
    this.setState({searchString});
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.props.onAddNote}>Add note</button>
          {
            this.props.showArchived? (
              <button onClick={this.props.onHideArchived}>Hide archived</button>
            ) : (
              <button onClick={this.props.onShowArchived}>Show archived</button>
            )
          }
        </div>
        <div className="container">
          <BinSelector/>
          <div className="note-pane">
            {this.props.notes.length} Notes <br/>
            <SearchBox onSearchStringUpdate={(v) => this.setSearchString(v)} />
            {
              this.props.notes
                .filter((note) => this.props.showArchived || !note.isArchived)
                .filter((note) => (
                  !this.state.searchString || note.html.search(this.state.searchString) >= 0
                ))
                .map((note) => (
                  <Note
                    data = {note}
                    isSelected = { note.id === this.props.selectedNoteId }
                    onSelect = { () => this.props.onSelectNote(note.id) }
                    onArchive = { () => this.props.onArchiveNote(note.id) }
                    onUnarchive = { () => this.props.onUnarchiveNote(note.id) }
                    onContentChange={(newContent) => this.props.onContentChange(note.id, newContent)}
                    key={note.id}/>)
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  var notesAsJS = state.notes.toJS();
  return {
    notes: notesAsJS.ordered.map((id) => notesAsJS.byId[id]),
    selectedNoteId: notesAsJS.selectedNoteId,
    showArchived: state.filters.toJS().showArchived
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onContentChange: (noteId, newContent) => dispatch(updateNoteContent(noteId, newContent)),
    onShowArchived: () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ARCHIVED)),
    onHideArchived: () => dispatch(setVisibilityFilter(VisibilityFilters.HIDE_ARCHIVED)),
    onAddNote: () => dispatch(addNote()),
    onSelectNote: (noteId) => dispatch(selectNote(noteId)),
    onArchiveNote: (noteId) => dispatch(archiveNote(noteId)),
    onUnarchiveNote: (noteId) => dispatch(unarchiveNote(noteId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// /////////////////