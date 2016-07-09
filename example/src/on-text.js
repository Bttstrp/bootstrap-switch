import React from 'react';

import { Switch } from '../../src/js/index';

export class OnText extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      text: "Yes"
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
        <h3>On Text</h3>
        <Switch onText={this.state.text} />

        <p>
          <input type="text" ref={e => this.input = e} onChange={this._onChange.bind(this)} value={this.state.text} />
        </p>
      </div>
    );
  }
}