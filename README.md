# Bootstrap Switch
[![Dependency Status](https://david-dm.org/julusian/react-bootstrap-switch.svg?style=flat)](https://david-dm.org/julusian/react-bootstrap-switch)
[![devDependency Status](https://david-dm.org/julusian/react-bootstrap-switch/dev-status.svg?style=flat)](https://david-dm.org/julusian/react-bootstrap-switch#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/react-bootstrap-switch.svg?style=flat)](https://www.npmjs.org/)

This project is a port of [bootstrap-switch](https://github.com/nostalgiaz/bootstrap-switch) for use in React.js

## Version Compatability
| React Version | Switch Version |
| ------------- | -------------- |
| v15.x         | v15.x          |
| v14.x         | v3.4.x         |
| v13.x         | v3.3.x         |

NOTE: The CSS from the original version is not fully compatible. There is CSS and LESS included in this repo, or any 3rd party themes can likely be made compatible with the changes shown [in this commit](https://github.com/Julusian/react-bootstrap-switch/commit/bbd9754b0cebb82aeb1724ca86c79529e4a7b9df).


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
| **value**         | boolean | true      | true, false, null | Initial starting state of the switch. Null indidcates indeterminate |
| **size**          | string  | null      | null, 'mini', 'small', 'normal', 'large' | The checkbox size |
| **animate**       | boolean | true      | true, false | Enable or disable animation for the switch |
| **disabled**      | boolean | false     | true, false | Disable state |
| **readonly**      | boolean | false     | true, false | Readonly state |
| **inverse**       | boolean | false     | true, false | Inverse switch direction|
| **onColor**       | string  | 'primary' | 'primary', 'info', 'success', 'warning', 'danger', 'default' | Color of the on side of the switch |
| **offColor**      | string  | 'default' | 'primary', 'info', 'success', 'warning', 'danger', 'default' | Color of the off side of the switch |
| **onText**        | string  | 'ON'      | | Text of the on side of the switch |
| **offText**       | string  | 'OFF'     | | Text of the off side of the switch |
| **labelText**     | string  | ''        | | Text of the center handle of the switch |
| **handleWidth**   | string or number | 'auto' | 'auto' or Number | Width of the left and right sides in pixels |
| **labelWidth**    | string or number | 'auto' | 'auto' or Number |  Width of the center handle in pixels |
| **baseClass**     | string  | 'bootstrap-switch' | | Global class prefix  |
| **wrapperClass**  | string  | 'wrapper' | | Container element class(es) |
| **onChange**      | function | undefined| | function(elm, state){} |

### Methods
| Name         | Parameters    | Description |
| ------------ | ------- | ----------- |
| **value** | boolean or null | Get or set the switch state |


## Supported browsers

IE9+ and all the other modern browsers.


## Examples and Contributing
The following will get a local copy of the code and launch the example page. 

Any changes to the source files will be automatically loaded into your browser upon saving the files.

```
git clone https://github.com/Julusian/react-bootstrap-switch.git
cd react-bootstrap-switch
npm install
npm run dev
```



## LESS / CSS

Import `src/less/bootstrap2/bootstrap-switch.less` for bootstrap 2 or `src/less/bootstrap3/bootstrap-switch.less` for bootstrap 3 in your compilation stack.

NOTE: The LESS and CSS files from the original switch are not fully compatible, updated versions are included in this repo.

## License

Licensed under the MIT License

