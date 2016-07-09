import React from 'react';
import { Col, Button, ButtonGroup, FormGroup } from 'react-bootstrap';

import { Switch } from '../../src/js/index';

export class Size extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      size: "mini"
    };
  }

  _clickMini(){
    this.setState({
      size: "mini"
    });
  }

  _clickSmall(){
    this.setState({
      size: "small"
    });
  }

  _clickNormal(){
    this.setState({
      size: "normal"
    });
  }

  _clickLarge(){
    this.setState({
      size: "large"
    });
  }

  render(){
    return (
      <Col xs={6} md={4}>
        <h3>Size</h3>

        <form>
          <FormGroup>
            <Switch bsSize={this.state.size} />
          </FormGroup>

          <FormGroup>
            <ButtonGroup>
              <Button onClick={this._clickMini.bind(this)} >Mini</Button>
              <Button onClick={this._clickSmall.bind(this)} >Small</Button>
              <Button onClick={this._clickNormal.bind(this)} >Normal</Button>
              <Button onClick={this._clickLarge.bind(this)} >Large</Button>
            </ButtonGroup>
          </FormGroup>
        </form>
      </Col>
    );
  }
}