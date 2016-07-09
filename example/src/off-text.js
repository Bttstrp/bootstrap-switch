import React from 'react';
import { Col, FormGroup, FormControl } from 'react-bootstrap';

import { Switch } from '../../src/js/index';

export class OffText extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      text: "No"
    };
  }

  _onChange(e){
    const text = e.target.value;

    this.setState({
      text: text
    });
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Off Text</h3>

        <form>
          <FormGroup>
            <Switch offText={this.state.text} value={false}  />
          </FormGroup>

          <FormGroup>
            <FormControl type="text" onChange={this._onChange.bind(this)} value={this.state.text} />
          </FormGroup>
        </form>
      </Col>
    );
  }
}