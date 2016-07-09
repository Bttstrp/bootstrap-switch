import React from 'react';
import { Col, Button, ButtonGroup, FormGroup } from 'react-bootstrap';

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
      <Col xs={6} md={4}>
        <h3>Off Color</h3>

        <form>
          <FormGroup>
            <Switch offColor={this.state.color} defaultValue={false} />
          </FormGroup>

          <FormGroup>
            <ButtonGroup>
              <Button onClick={this._clickPrimary.bind(this)} >Primary</Button>
              <Button onClick={this._clickInfo.bind(this)} >Info</Button>
              <Button onClick={this._clickSuccess.bind(this)} >Success</Button>
              <Button onClick={this._clickWarning.bind(this)} >Warning</Button>
              <Button onClick={this._clickDefault.bind(this)} >Default</Button>
            </ButtonGroup>
          </FormGroup>
        </form>
      </Col>
    );
  }
}