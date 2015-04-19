# Bootstrap Switch
[![Dependency Status](https://david-dm.org/nostalgiaz/bootstrap-switch.svg?style=flat)](https://david-dm.org/nostalgiaz/bootstrap-switch)
[![devDependency Status](https://david-dm.org/nostalgiaz/bootstrap-switch/dev-status.svg?style=flat)](https://david-dm.org/nostalgiaz/bootstrap-switch#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/bootstrap-switch.svg?style=flat)](https://www.npmjs.org/)

Turn checkboxes and radio buttons in toggle switches.

## Demo and Documentation

- [Examples](http://www.bootstrap-switch.org/examples.html)
- [Options](http://www.bootstrap-switch.org/options.html)
- [Methods](http://www.bootstrap-switch.org/methods.html)
- [Events](http://www.bootstrap-switch.org/events.html)

## Getting started

Include the dependencies: jQuery, Bootstrap and Bootstrap Switch CSS + Javascript:

``` html
[...]
<link href="bootstrap.css" rel="stylesheet">
<link href="bootstrap-switch.css" rel="stylesheet">
<script src="jquery.js"></script>
<script src="bootstrap-switch.js"></script>
[...]
```

Add your checkbox:

```html
<input type="checkbox" name="my-checkbox" checked>
```

Initialize Bootstrap Switch on it:

```javascript
$("[name='my-checkbox']").bootstrapSwitch();
```

Enjoy.

## LESS + SASS

Import `src/less/bootstrap2/bootstrap-switch.less` for version <= 2.3.2 or `src/less/bootstrap3/bootstrap-switch.less` for version <= 3.3.4 in your compilation stack.

## Integrations

### AngularJs

Two custom directives are available:
- [angular-bootstrap-switch](https://github.com/frapontillo/angular-bootstrap-switch)
- [angular-toggle-switch](https://github.com/JumpLink/angular-toggle-switch)

### KnockoutJs

A Knockout binding handler is available [here](https://github.com/pauloortins/knockout-bootstrap-switch)

### NuGet

A NuGet package is available [here](https://github.com/blachniet/bootstrap-switch-nuget)

## Supported browsers

IE9+ and all the other modern browsers.

## Known issues

- Make sure `.form-control` is not applied to the input. Bootstrap does not support that, refer to [Checkboxes and radios](http://getbootstrap.com/css/#checkboxes-and-radios)

## License

Licensed under the Apache License, Version 2.0
http://www.apache.org/licenses/LICENSE-2.0
