import React from 'react';
import { Component } from 'react';
import { NoteHeader } from './NoteHeader';
import { NoteContentEditor } from './NoteContentEditor';

export class Note extends Component {

  constructor() {
    super();
    this.state = {isCollapsed: false, isEditable: false };
  }

  toggle(key) {
    this.setState({[key] : !this.state[key]})
  }

  getMode() {
    return (
      (this.state.isCollapsed && 'collapsed')
      || (this.state.isEditable && 'editable')
      || 'read-only'
    );
  }

  showDebugData() {
    console.log('Note data:', JSON.stringify(this.props.data, null, 2));
  }

  render() {
    return (
      <div
        className={this.props.isSelected? 'note selected-note' : 'note'}
        onClick={ () => this.props.onSelect() }
        >
        <div className="note-meta-header">
          <NoteHeader
            title={this.props.data.title}
            timeCreated={this.props.data.timeCreated}
            onClick={() => this.toggle('isCollapsed')}
            >
          </NoteHeader>
          <div className="note-toolbar">
            <button onClick={() => this.toggle('isEditable')}>
              {this.state.isEditable? 'Lock' : 'Edit'}
            </button>
            <button onClick={
              () => this.props.data.isArchived? this.props.onUnarchive() : this.props.onArchive()
            }>
              {this.props.data.isArchived? 'Revive' : 'Archive'}
            </button>
            <button onClick={() => this.showDebugData()}>
              ⌘
            </button>
          </div>
        </div>
        {(() => {
          switch (this.getMode()) {
            case 'collapsed':
              return (
                <div>Collapsed</div>
              );
            case 'editable':
              return (
                <NoteContentEditor
                  onChange={ this.props.onContentChange }
                  html= { this.props.data.html } ></NoteContentEditor>
              );
            default:
              return (
                <div
                  className="content"
                  onDoubleClick={ () => this.toggle('isEditable') }
                  dangerouslySetInnerHTML={{__html: this.props.data.html}}></div>
              );
          }
        })()}
      </div>
    );
  }
}