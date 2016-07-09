import React from 'react';

import { Switch } from '../../src/js/index';

export class OffText extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      text: "No"
    };
  }

  _onChange(){
    const text = this.input.value;

    this.setState({
      text: text
    });
  }

  render(){
    return (
      <div>
        <h3>Off Text</h3>
        <Switch offText={this.state.text} />

        <p>
          <input type="text" ref={e => this.input = e} onChange={this._onChange.bind(this)} value={this.state.text} />
        </p>
      </div>
    );
  }
}