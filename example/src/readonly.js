import React from 'react';
import { Col, Button, FormGroup } from 'react-bootstrap';

import Switch from '../../src/js/index';

export class Readonly extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      readonly: true
    };
  }

  _clickToggle(){
    this.setState({
      readonly: !this.state.readonly
    });
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Readonly</h3>
        
        <form>
          <FormGroup>
            <Switch readonly={this.state.readonly} />
          </FormGroup>

          <FormGroup>
            <Button onClick={this._clickToggle.bind(this)} >Toggle</Button>
          </FormGroup>
        </form>
      </Col>
    );
  }
}