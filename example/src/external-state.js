import React from 'react';
import { Col, Button, ButtonGroup, FormGroup } from 'react-bootstrap';

import Switch from '../../src/js/index';

export class ExternalState extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      value: true
    };
  }

  _clickToggle(){
    this.setState({
      value: !this.state.value
    });
  }
  _clickOn(){ 
    this.setState({
      value: true
    });
  }
  _clickOff(){
    this.setState({
      value: false
    });
  }

  _onChange(elm, v){
    this.setState({
      value: v
    });
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>External State</h3>

        <form>
          <FormGroup>
            <Switch ref={e => this.switch = e} value={this.state.value} onChange={this._onChange.bind(this)} />
          </FormGroup>

          <FormGroup>
            <ButtonGroup>
              <Button onClick={this._clickToggle.bind(this)} >Toggle</Button>
              <Button onClick={this._clickOn.bind(this)} >On</Button>
              <Button onClick={this._clickOff.bind(this)} >Off</Button>
            </ButtonGroup>
          </FormGroup>
        </form>
      </Col>
    );
  }
}