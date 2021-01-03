# Bootstrap Switch

[![Dependency Status](https://david-dm.org/Bttstrp/bootstrap-switch.svg?style=flat)](https://david-dm.org/Bttstrp/bootstrap-switch)
[![devDependency Status](https://david-dm.org/Bttstrp/bootstrap-switch/dev-status.svg?style=flat)](https://david-dm.org/Bttstrp/bootstrap-switch#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/bootstrap-switch.svg?style=flat)](https://www.npmjs.org/)

- Turn checkboxes and radio buttons into toggle switches.
- Compatible with Bootstrap versions 4, 3 and 2 (legacy).
- Use with or without bundlers/build tools
- Supports IE9+ and all the other modern browsers.
- [Quick Demo](https://jsfiddle.net/djibe89/vL87w0j8/).

## Getting started

### Installation

The library is available on various package managers:

- npm: `npm install bootstrap-switch`
- yarn: `yarn add bootstrap-switch`
- Composer: `composer require components/bootstrap-switch`
- Bower: `bower install bootstrap-switch`
- NuGet: `PM> Install-Package Bootstrap.Switch` ([NuGet package](https://github.com/blachniet/bootstrap-switch-nuget))

You can also install it manually by downloading the [latest release](https://github.com/Bttstrp/bootstrap-switch/releases/latest) or clone the repo: `git clone https://github.com/Bttstrp/bootstrap-switch.git`.

### Inclusion

#### With build tools

If you use a bundler (Webpack, Rollup, Parcel…) or a task runner (Gulp, Grunt…) that supports SASS (or LESS, for Boostrap 3 or 2) and the JS module syntax, include the appropriate entry point file:

```scss
// boostrap 4
@import "bootstrap-switch/src/sass/bootstrap4/bootstrap-switch.scss"
// or 3
@import "bootstrap-switch/src/less/bootstrap3/bootstrap-switch.less"
// or 2
@import "bootstrap-switch/src/less/bootstrap2/bootstrap-switch.less"
```

Then import the library in your JavaScript as well:

```js
import 'bootstrap-switch';
```

#### Without build tools

Include the dependences (jQuery, Bootstrap) and the already compiled JavaScript and CSS files in your HTML:

```html
<!-- somewhere in <head> tag -->
<link href="bootstrap.css" rel="stylesheet">
<link href="bootstrap-switch.css" rel="stylesheet">
<script src="jquery.js"></script>
<script src="bootstrap-switch.js"></script>
```

### Your first switch

Add a checkbox:

```html
<input type="checkbox" name="my-checkbox" checked>
```

Finally, initialize Bootstrap Switch on it:

```javascript
$("[name='my-checkbox']").bootstrapSwitch();
```

Profit!

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Bttstrp/bootstrap-switch/issues/new).

The new issue should contain both a summary of the issue and the browser/OS environment in which it occurs and a link to the playground you prefer with the reduced test case.
If suitable, include the steps required to reproduce the bug.

Please do not use the issue tracker for personal support requests: [Stack Overflow](https://stackoverflow.com/questions/tagged/bootstrap-switch) is a better place to get help.

### Known issues

- Make sure `.form-control` is not applied to the input. Bootstrap does not support that, refer to [Checkboxes and radios](https://getbootstrap.com/css/#checkboxes-and-radios)

## Integrations

- Angular: [angular-bootstrap-switch](https://github.com/frapontillo/angular-bootstrap-switch)
- Angular: [angular-toggle-switch](https://github.com/JumpLink/angular-toggle-switch)
- Knockout: [knockout-bootstrap-switch](https://github.com/pauloortins/knockout-bootstrap-switch)

## License

Licensed under the [MIT License](https://github.com/Bttstrp/bootstrap-switch/blob/master/LICENSE).

## Credits

Created by [Mattia Larentis](http://github.com/nostalgiaz). Maintained by [Emanuele Marchi](http://github.com/lostcrew), [Martin Hradil](https://github.com/himdel). Formerly maintained by [Thomas Grainger](https://github.com/graingert) and [Peter Stein](http://www.bdmdesign.org). Forever supported by the generosity of this community.
