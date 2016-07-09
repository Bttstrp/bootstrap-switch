import React from 'react';

import { Switch } from '../../src/js/index';

export class Inverse extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inverse: true
    };
  }

  _clickToggle(){
    this.setState({
      inverse: !this.state.inverse
    });
  }
  _clickGet(){
    alert(this.state.inverse);
  }

  render(){
    return (
      <div>
        <h3>Inverse</h3>
        <Switch inverse={this.state.inverse} />

        <p>
          <button onClick={this._clickToggle.bind(this)} >Toggle</button>
          <button onClick={this._clickGet.bind(this)} >Get</button>
        </p>
      </div>
    );
  }
}