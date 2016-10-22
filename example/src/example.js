import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row } from 'react-bootstrap';

import { InternalState } from './internal-state';
import { ExternalState } from './external-state';
import { Disabled } from './disabled';
import { Inverse } from './inverse';
import { Tristate } from './tristate';
import { OnText } from './on-text';
import { OffText } from './off-text';
import { HandleWidth } from './handle-width';
import { Size } from './size';
import { Readonly } from './readonly';
import { OnColor } from './on-color';
import { LabelWidth } from './label-width';
import { Animate } from './animate';
import { Indeterminate } from './indeterminate';
import { OffColor } from './off-color';
import { LabelText } from './label-text';


class Examples extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <h1>Examples</h1>
        </Row>
        <Row>
          <InternalState />
          <Size />
          <Animate />

          <ExternalState />
          <Disabled />
          <Readonly />

          <Inverse />
          <OnColor />
          <OffColor />

          <LabelText />
          <OnText />
          <OffText />

          <Indeterminate />
          <HandleWidth />
          <LabelWidth />
          
          <Tristate />
        </Row>
      </Grid>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('container'));