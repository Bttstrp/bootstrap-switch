import React from 'react';

import { Switch } from '../../src/js/index';

export class OnColor extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      color: "info"
    };
  }

  _clickPrimary(){
    this.setState({
      color: "primary"
    });
  }

  _clickInfo(){
    this.setState({
      color: "info"
    });
  }

  _clickSuccess(){
    this.setState({
      color: "success"
    });
  }

  _clickWarning(){
    this.setState({
      color: "warning"
    });
  }

  _clickDefault(){
    this.setState({
      color: "default"
    });
  }

  render(){
    return (
      <div>
        <h3>On Color</h3>
        <Switch onColor={this.state.color} />

        <p>
          <button onClick={this._clickPrimary.bind(this)} >Primary</button>
          <button onClick={this._clickInfo.bind(this)} >Info</button>
          <button onClick={this._clickSuccess.bind(this)} >Success</button>
          <button onClick={this._clickWarning.bind(this)} >Warning</button>
          <button onClick={this._clickDefault.bind(this)} >Default</button>
        </p>
      </div>
    );
  }
}