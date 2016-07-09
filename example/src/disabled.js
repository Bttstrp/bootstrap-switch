import React from 'react';
import { Col, Button, FormGroup } from 'react-bootstrap';

import { Switch } from '../../src/js/index';

export class Disabled extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      disabled: true
    };
  }

  _clickToggle(){
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Disabled</h3>
        
        <form>
          <FormGroup>
            <Switch disabled={this.state.disabled} />
          </FormGroup>

          <FormGroup>
            <Button onClick={this._clickToggle.bind(this)} >Toggle</Button>
          </FormGroup>
        </form>
      </Col>
    );
  }
}