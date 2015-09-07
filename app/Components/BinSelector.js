import { Component } from 'react';
import React from 'react';

class BinButton extends Component {
  render() {
    return (
      <button className={'collection collection' + '-alpha'}>
       {this.props.name}
      </button>
    );
  }
}

export class BinSelector extends Component {
  render() {
    return (
      <div className="collections">
        <BinButton name="Alpha"/>
        <BinButton name="Beta: Lorem ipsum"/>
        <BinButton name="Gamma: Foo bar"/>
      </div>
    );
  }
}

