import React from 'react';
import { Col, FormGroup, FormControl } from 'react-bootstrap';

import Switch from '../../src/js/index';

export class LabelWidth extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      width: 100
    };
  }

  _onChange(e){
    const width = parseInt(e.target.value, 10);

    if(isNaN(width))
      return;

    this.setState({
      width
    });
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Label Width</h3>

        <form>
          <FormGroup>
            <Switch labelWidth={this.state.width} />
          </FormGroup>

          <FormGroup>
            <FormControl type="text" onChange={this._onChange.bind(this)} value={this.state.width} />
          </FormGroup>
        </form>
      </Col>
    );
  }
}