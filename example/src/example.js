import React from 'react';
import ReactDOM from 'react-dom';

import { State } from './state';
import { Disabled } from './disabled';
import { Inverse } from './inverse';
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

function tetsChange(elm ,v){
  console.log("CHANGE", elm, v);
}

class Examples extends React.Component {
  render(){
    return (
      <div>
        <State />
        <Disabled />
        <Inverse />
        <OnText />
        <HandleWidth />
        <Size />
        <Readonly />
        <OnColor />
        <OffText />
        <LabelWidth />
        <Animate />
        <Indeterminate />
        <OffColor />
        <LabelText />
      </div>
    );
  }
}

ReactDOM.render(<Examples onChange={tetsChange} />, document.getElementById('container'));