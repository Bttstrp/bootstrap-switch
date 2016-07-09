import React from 'react';

import { Switch } from '../../src/js/index';

export class State extends React.Component {

  _clickToggle(){
    const val = this.switch.value();
    this.switch.value(!val);
  }
  _clickOn(){ 
    this.switch.value(true);
  }
  _clickOff(){
    this.switch.value(false);
  }
  _clickGet(){
    alert(this.switch.value());
  }

  render(){
    return (
      <div>
        <h3>State</h3>
        <Switch ref={e => this.switch = e} />

        <p>
          <button onClick={this._clickToggle.bind(this)} >Toggle</button>
          <button onClick={this._clickOn.bind(this)} >On</button>
          <button onClick={this._clickOff.bind(this)} >Off</button>
          <button onClick={this._clickGet.bind(this)} >Get</button>
        </p>
      </div>
    );
  }
}