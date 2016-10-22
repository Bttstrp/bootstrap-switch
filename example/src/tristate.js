import React from 'react';
import { Col, Button, ButtonGroup, FormGroup } from 'react-bootstrap';

import Switch from '../../src/js/index';

export class Tristate extends React.Component {

  _clickCycle(){
    const val = this.switch.value();
    if (val === false)
      this.switch.value(null);
    else if (val === true)
      this.switch.value(false);
    else
      this.switch.value(true);
  }
  _clickOn(){ 
    this.switch.value(true);
  }
  _clickOff(){
    this.switch.value(false);
  }
  _clickIntdeterminate(){
    this.switch.value(null);
  }
  _clickGet(){
    alert(this.switch.value());
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Tristate</h3>

        <form>
          <FormGroup>
            <Switch ref={e => this.switch = e} tristate={true} defaultValue={null}/>
          </FormGroup>

          <FormGroup>
            <ButtonGroup>
              <Button onClick={this._clickCycle.bind(this)} >Cycle</Button>
              <Button onClick={this._clickOn.bind(this)} >On</Button>
              <Button onClick={this._clickOff.bind(this)} >Off</Button>
              <Button onClick={this._clickIntdeterminate.bind(this)} >Indeterminate</Button>
              <Button onClick={this._clickGet.bind(this)} >Get</Button>
            </ButtonGroup>
          </FormGroup>
        </form>
      </Col>
    );
  }
}