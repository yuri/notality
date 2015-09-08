import { Component } from 'react';
import Rx from 'rx';
import { NoteHeader } from './NoteHeader';
import React from 'react';

export class Note extends Component {

  constructor() {
    super();
    this.state = {collapsed: false, isEditable: false };
    this.inputSubject = new Rx.Subject();
    this.inputSubject.debounce(500).subscribe(() => this.emitChange());
  }

  getDOMNode() {
    return React.findDOMNode(this);
  }

  getContentNode() {
    return this.getDOMNode().getElementsByClassName('content')[0];
  }

  emitChange() {
    var html = this.getContentNode().innerHTML;
    if (this.props.onContentChange && html !== this.lastHtml) {
      this.props.onContentChange(html);
    }
    this.lastHtml = html;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateChanged = (
      (this.state.isEditable !== nextState.isEditable)
      || (this.state.collapsed !== nextState.isCollapsed)
    );
    const htmlChanged = nextProps.html !== this.getContentNode().innerHTML;
    return stateChanged || htmlChanged;
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  componentDidUpdate() {
    // if (this.props.html !== this.getDOMNode().innerHTML) {
    //    this.getDOMNode().innerHTML = this.props.html;
    // }
  }

  toggleCollapse() {
    console.log('toggle collapse');
    this.setState({collapsed: !this.state.collapsed},
      () => {
        console.log('New state:', this.state.collapsed);
      });
  }

  stopEditing() {
    this.emitChange();
    this.setState({isEditable: false});
    if (this._editor) {
      this._editor.destroy();
    }
  }

  startEditing() {
    console.log('setting state to editable from', this.state.isEditable);
    this.setState({isEditable: true}, function () {
      const node = this.getContentNode();
      this._editor = AlloyEditor.editable(node, {
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
      });
    });
  }

  getEditorClassName() {
    let className = 'content';
    if (this.state.collapsed) {
      className += ' collapsed';
    }
    if (this.state.isEditable) {
      className += ' editor';
    }
    return className;
  }

  toggleEditing() {
    if (this.state.isEditable) {
      this.stopEditing();
    } else {
      this.startEditing();
    }
  }

  //  + this.state.isEditable? ' editor' : '')

  render() {
    return (
      <div className="note">
        <NoteHeader
          title={this.props.title}
          timeCreated={this.props.timeCreated}
          onClick={() => this.toggleCollapse()}
          >
        </NoteHeader>
        <div className="note-toolbar">
          <button onClick={() => this.toggleEditing()}>{this.state.isEditable? 'Lock' : 'Edit'}</button>
        </div>
        <div
          contentEditable={ this.state.isEditable? 'true' : 'false' }
          className={ this.getEditorClassName() }
          onDoubleClick={ () => this.startEditing() }
          onInput={() => this.inputSubject.onNext()}
          onBlur={() => this.emitChange()}
          dangerouslySetInnerHTML={{__html: this.props.html}}>
        </div>
      </div>
    );
  }
}