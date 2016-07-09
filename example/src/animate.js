import React from 'react';

import { Switch } from '../../src/js/index';

export class Animate extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      animate: true
    };
  }

  _clickToggle(){
    this.setState({
      animate: !this.state.animate
    });
  }

  render(){
    return (
      <div>
        <h3>Animate</h3>
        <Switch animate={this.state.animate} />

        <p>
          <button onClick={this._clickToggle.bind(this)} >Toggle</button>
        </p>
      </div>
    );
  }
}