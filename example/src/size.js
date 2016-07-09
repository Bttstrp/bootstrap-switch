import React from 'react';

import { Switch } from '../../src/js/index';

export class Size extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      size: "mini"
    };
  }

  _clickMini(){
    this.setState({
      size: "mini"
    });
  }

  _clickSmall(){
    this.setState({
      size: "small"
    });
  }

  _clickNormal(){
    this.setState({
      size: "normal"
    });
  }

  _clickLarge(){
    this.setState({
      size: "large"
    });
  }

  render(){
    return (
      <div>
        <h3>Size</h3>
        <Switch bsSize={this.state.size} />

        <p>
          <button onClick={this._clickMini.bind(this)} >Mini</button>
          <button onClick={this._clickSmall.bind(this)} >Small</button>
          <button onClick={this._clickNormal.bind(this)} >Normal</button>
          <button onClick={this._clickLarge.bind(this)} >Large</button>
        </p>
      </div>
    );
  }
}