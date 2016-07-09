import React from 'react';

import { Switch } from '../../src/js/index';

export class Readonly extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      readonly: true
    };
  }

  _clickToggle(){
    this.setState({
      readonly: !this.state.readonly
    });
  }

  render(){
    return (
      <div>
        <h3>Readonly</h3>
        <Switch readonly={this.state.readonly} />

        <p>
          <button onClick={this._clickToggle.bind(this)} >Toggle</button>
        </p>
      </div>
    );
  }
}