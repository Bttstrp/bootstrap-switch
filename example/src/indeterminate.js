import React from 'react';

import { Switch } from '../../src/js/index';

export class Indeterminate extends React.Component {

  _clickToggle(){
    const val = this.switch.value();
    this.switch.value(val === null);
  }

  render(){
    return (
      <div>
        <h3>Indeterminate</h3>
        <Switch ref={e => this.switch = e} />

        <p>
          <button onClick={this._clickToggle.bind(this)} >Toggle</button>
        </p>
      </div>
    );
  }
}