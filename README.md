# Bootstrap Switch
[![Dependency Status](https://david-dm.org/julusian/react-bootstrap-switch.svg?style=flat)](https://david-dm.org/julusian/react-bootstrap-switch)
[![devDependency Status](https://david-dm.org/julusian/react-bootstrap-switch/dev-status.svg?style=flat)](https://david-dm.org/julusian/react-bootstrap-switch#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/react-bootstrap-switch.svg?style=flat)](https://www.npmjs.org/)

This project is a port of [bootstrap-switch](https://github.com/nostalgiaz/bootstrap-switch) for use in React.js

Verion 3.4.x is built for React.js 0.14. It will not work with earlier versions of React.js.

## Usage

### Installation
```
npm install react-bootstrap-switch
```

### Then
```
var Switch = require('react-bootstrap-switch');

...

render: function() {
  return <Switch />;
}
```

## API
### Properties
These should be defined on the JSX node, many cannot be changed once they have been set without recreating the node.

| Name              | Type    | Default   | Values | Description |
| ----------------- | ------- | --------- | ------ | ----------- |
| **state**         | boolean | true      | true, false | Initial starting state of the switch |
| **size**          | string  | null      | null, 'mini', 'small', 'normal', 'large' | The checkbox size |
| **animate**       | boolean | true      | true, false | Animate the switch |
| **disabled**      | boolean | false     | true, false | Disable state |
| **readonly**      | boolean | false     | true, false | Readonly state |
| **indeterminate** | boolean | false     | true, false | Indeterminate state |
| **inverse**       | boolean | false     | true, false | Inverse switch direction|
| **onColor**       | string  | 'primary' | 'primary', 'info', 'success', 'warning', 'danger', 'default' | Color of the on state of the switch |
| **offColor**      | string  | 'default' | 'primary', 'info', 'success', 'warning', 'danger', 'default' | Color of the off state of the switch |
| **onText**        | string  | 'ON'      | | Text of the on state of the switch |
| **offText**       | string  | 'OFF'     | | Text of the off state of the switch |
| **labelText**     | string  | ''        | | Text of the center handle of the switch |
| **handleWidth**   | string or number | 'auto' | 'auto' or Number | Width of the left and right sides in pixels |
| **labelWidth**    | string or number | 'auto' | 'auto' or Number |  Width of the center handle in pixels |
| **baseClass**     | string  | 'bootstrap-switch' | | Global class prefix  |
| **wrapperClass**  | string  | 'wrapper' | | Container element class(es) |
| **onChange**      | function | undefined| | function(elm, state){} or function(state){} |

### Methods
| Name         | Parameters    | Description |
| ------------ | ------- | ----------- |
| **value** | boolean  | Get or set the switch state |
| **valueState** | boolean  | Get or set the switch state |
| **toggleValue**   |  | Toggle the switch state |
| **toggleState**   |  | Toggle the switch state |
| **disabled** | boolean | Get or set the disabled state |
| **toggleDisabled** |  | Toggle the disabled state |
| **readonly** | boolean | Get or set the readonly state |
| **toggleReadonly** |  | Toggle the readonly state |
| **handleWidth** | string or number | Set the width of the left and right sides in pixels |
| **labelWidth** | string or number | Set the width of the center handle in pixels |


## Supported browsers

IE9+ and all the other modern browsers.


## LESS 

Import `src/less/bootstrap2/bootstrap-switch.less` for bootstrap 2 or `src/less/bootstrap3/bootstrap-switch.less` for bootstrap 3 in your compilation stack.


## License

Licensed under the MIT License

