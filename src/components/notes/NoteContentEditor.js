import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

export default class extends Component {
  /* eslint react/prop-types: 0 */
  constructor() {
    super();
    // Create an Rx subject for debouncing edits.
    this.inputSubject = new Rx.Subject();
    this.inputSubject.debounce(500).subscribe(() => this.emitChange());
    this.state = {
      startOfSelection: 0,
      endOfSelection: 0,
    };
  }

  // Initialize the editor after mounting the component.
  componentDidMount() {
    this._editor = new MediumEditor(ReactDOM.findDOMNode(this), {
      // buttonLabels: 'fontawesome',
      toolbar: {
        buttons: [
          'h1',
          'h2',
          'bold',
          'italic',
          'unorderedlist',
          'orderedlist',
        ],
      },
    });

    // this._editor.pasteHTML('<b>FOOBAR</b>');
  }

  // Never update this component.
  shouldComponentUpdate() {
    return false;
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
        onInput={() => this.inputSubject.onNext()}
        onBlur={() => this.emitChange('blur')}
        className="content editor"
        dangerouslySetInnerHTML={{__html: this.props.html}} >
      </div>
    );
  }

  // Emits a content change to the parent.
  emitChange() {
    const html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  }
}
