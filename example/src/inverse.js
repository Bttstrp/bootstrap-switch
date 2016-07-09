import React from 'react';
import { Col, Button, ButtonGroup, FormGroup } from 'react-bootstrap';

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

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Inverse</h3>
        
        <form>
          <FormGroup>
            <Switch inverse={this.state.inverse} />
          </FormGroup>

          <FormGroup>
            <Button onClick={this._clickToggle.bind(this)} >Toggle</Button>
          </FormGroup>
        </form>
      </Col>
    );
  }
}