import { Component } from 'react';
import moment from 'moment';

var React=require('react');

class NoteHeader extends Component {
  constructor() {
    super();
    this.dateFormats = [
      'ddd, MMMM Do YYYY, h:mm a ([W]W)',
      'YYYY:[W]W:ddd (MMM D), h:mm a'
    ];
    this.state = {dateFormatPosition: 0};
  }
  switchDateFormat() {
    const getNext = (value) => (value + 1) % this.dateFormats.length;
    this.setState({
      dateFormatPosition: getNext(this.state.dateFormatPosition) 
    });
  }
  getFormattedTime() {
    var format = this.dateFormats[this.state.dateFormatPosition];
    return this.props.timeCreated && moment(this.props.timeCreated).format(format);
  }
  render() {
    return (
      <div>
        <div onClick={() => this.switchDateFormat()}>
          {this.getFormattedTime()}
        </div>
        <div className="note-title" onClick={this.props.onClick}> {this.props.title} </div>
      </div>
    );
  }
}

export class Note extends Component {

  constructor() {
    super();
    this.state = {collapsed: false};
  }

  getDOMNode() {
    return React.findDOMNode(this);
  }

  emitChange() {
    var html = this.getDOMNode().getElementsByClassName('content')[0].innerHTML;
    if (this.props.onContentChange && html !== this.lastHtml) {
      this.props.onContentChange(html);
    }
    this.lastHtml = html;
  }

  shouldComponentUpdate(nextProps) {
    return this.getDOMNode && nextProps.html !== this.getDOMNode().innerHTML;
  }

  componentDidUpdate() {
    // if (this.props.html !== this.getDOMNode().innerHTML) {
    //    this.getDOMNode().innerHTML = this.props.html;
    // }
  }

  toggleCollapse() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    return (
      <div className="note">
        <NoteHeader
          title={this.props.title}
          timeCreated={this.props.timeCreated}
          onClick={() => this.toggleCollapse()}
          >
        </NoteHeader>
        <div
          contentEditable="true"
          className={this.state.collapsed? 'content collapsed': 'content'}
          onInput={() => this.emitChange()}
          onBlur={() => this.emitChange()}
          dangerouslySetInnerHTML={{__html: this.props.html}}>
        </div>
      </div>
    );
  }
}