import React from 'react';
import { Col, Button, ButtonGroup, FormGroup } from 'react-bootstrap';

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
      <Col xs={6} md={4}>
        <h3>State</h3>

        <form>
          <FormGroup>
            <Switch ref={e => this.switch = e} />
          </FormGroup>

          <FormGroup>
            <ButtonGroup>
              <Button onClick={this._clickToggle.bind(this)} >Toggle</Button>
              <Button onClick={this._clickOn.bind(this)} >On</Button>
              <Button onClick={this._clickOff.bind(this)} >Off</Button>
              <Button onClick={this._clickGet.bind(this)} >Get</Button>
            </ButtonGroup>
          </FormGroup>
        </form>
      </Col>
    );
  }
}