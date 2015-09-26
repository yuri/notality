import React from 'react';
import { Component } from 'react';
import Rx from 'rx';

function getEditorOptions() {
  return {
    toolbars: {
      add: {
        buttons: ['h1', 'h2', 'ul', 'table', 'quote', 'code'],
        tabIndex: 2
      },
      styles: {
        selections: [{
          name: 'text',
          buttons: ['italic', 'bold', 'h1', 'h2', 'ul', 'quote', 'code', 'removeFormat'],
          test: AlloyEditor.SelectionTest.text
        }],
        tabIndex: 1
      }
    }
  };
}

export class NoteContentEditor extends Component {

  constructor() {
    super();
    // Create an Rx subject for debouncing edits.
    this.inputSubject = new Rx.Subject();
    this.inputSubject.debounce(500).subscribe(() => this.emitChange());
  }

  // Emits a content change to the parent.
  emitChange(event) {
    console.log('emitChange', event);
    var html = React.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  }

  // Never update this component.
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  // Initialize the editor after mounting the component.
  componentDidMount() {
    const node = React.findDOMNode(this);
    this._editor = AlloyEditor.editable(node, getEditorOptions());
  }

  // Destroy the editor before unmounting the component.
  componentWillUnmount() {
    this.emitChange();
    if (this._editor) {
      this._editor.destroy();
    }
  }

  render() {
    return (
      <div
        contentEditable
        onInput={() => this.inputSubject.onNext()}
        onBlur={() => this.emitChange('blur')}
        className="content editor"
        dangerouslySetInnerHTML={{__html: this.props.html}} ></div>
    )
  }
}