import React from 'react';

import { Switch } from '../../src/js/index';

export class Disabled extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      disabled: true
    };
  }

  _clickToggle(){
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render(){
    return (
      <div>
        <h3>Disabled</h3>
        <Switch disabled={this.state.disabled} />

        <p>
          <button onClick={this._clickToggle.bind(this)} >Toggle</button>
        </p>
      </div>
    );
  }
}