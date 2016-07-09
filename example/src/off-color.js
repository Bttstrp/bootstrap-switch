import React from 'react';

import { Switch } from '../../src/js/index';

export class OffColor extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      color: "warning"
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
        <h3>Off Color</h3>
        <Switch offColor={this.state.color} value={false} />

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