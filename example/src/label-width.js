import React from 'react';

import { Switch } from '../../src/js/index';

export class LabelWidth extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      width: 100
    };
  }

  _onChange(){
    const width = parseInt(this.input.value, 10);

    this.setState({
      width
    });
  }

  render(){
    return (
      <div>
        <h3>Label Width</h3>
        <Switch labelWidth={this.state.width} />

        <p>
          <input type="text" ref={e => this.input = e} onChange={this._onChange.bind(this)} value={this.state.width} />
        </p>
      </div>
    );
  }
}