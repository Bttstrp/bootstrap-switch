# Bootstrap Switch
[![Dependency Status](https://david-dm.org/nostalgiaz/bootstrap-switch.svg?theme=shields.io)](https://david-dm.org/nostalgiaz/bootstrap-switch)
[![devDependency Status](https://david-dm.org/nostalgiaz/bootstrap-switch/dev-status.svg?theme=shields.io)](https://david-dm.org/nostalgiaz/bootstrap-switch#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/bootstrap-switch.svg)](https://www.npmjs.org/)
[![Gittip nostalgiaz](http://img.shields.io/gittip/nostalgiaz.svg)](https://www.gittip.com/nostalgiaz)
[![Gittip LostCrew](http://img.shields.io/gittip/LostCrew.svg)](https://www.gittip.com/LostCrew)

Turn checkboxes and radio buttons in toggle switches.

## Demo and Documentation
http://www.bootstrap-switch.org

## Usage

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

## Less

If you want to use your bootstrap variables, include `bootstrap-switch.less` in your compilation stack. You can even choose among Bootstrap versions 2.3.2 or 3.*.* compatible source.

## AngularJs
Two custom directives are available:
- [angular-bootstrap-switch](https://github.com/frapontillo/angular-bootstrap-switch)
- [angular-toggle-switch](https://github.com/JumpLink/angular-toggle-switch)

## KnockoutJs
A Knockout binding handler is available [here](https://github.com/pauloortins/knockout-bootstrap-switch)

## NuGet
A NuGet package is available [here](https://github.com/blachniet/bootstrap-switch-nuget)

## Supported browsers

IE8+ and all the other modern browsers (until proven otherwise: submit a issue and let's see what we can do).

## License

Licensed under the Apache License, Version 2.0
http://www.apache.org/licenses/LICENSE-2.0
