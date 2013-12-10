Bootstrap Switch
================

Turn radio and checkbox form input in switches. 

**Bootstrap 3 ready** thanks to [nabil1337](https://github.com/nabil1337)

Demo
----
Hurray! http://www.larentis.eu/switch/ moves to github pages and we are happy to tell you that we have bought a new domain: http://www.bootstrap-switch.org . Some troubles can occur so please, don't hate us :')


Usage
-----
Just include jQuery, Bootstrap and Bootstrap Switch CSS + Javascript

``` html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="stylesheet" href="bootstrap.css">
<link rel="stylesheet" href="bootstrap-switch.css">
<script src="jquery.js"></script>
<script src="bootstrap-switch.js"></script>
```

Less
----
If you want to use your bootstrap variables, edit bootstrap-switch.less and compile it:

``` bash
lessc src/less/bootstrap3/bootstrap-switch.less bootstrap-switch.css
```

Or if you are using Bootstrap 2.3.2:

``` bash
lessc src/less/bootstrap2/bootstrap-switch.less bootstrap-switch.css
```

Supported browsers
------------------
IE8+ and all the other modern browsers.

Basic Example
-------------
checkboxes:

``` html
<div class="make-switch">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch">
    <input type="radio">
</div>
```


Large, small or mini
--------------------
checkboxes:

``` html
<div class="make-switch switch-large">  <!-- switch-large, switch-small or switch-mini -->
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch switch-large">  <!-- switch-large, switch-small or switch-mini -->
    <input type="radio">
</div>
```


Colors
------
checkboxes:

``` html
<div class="make-switch" data-on="danger" data-off="warning">  <!-- primary, info, success, warning, danger and default -->
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch" data-on="danger" data-off="warning">  <!-- primary, info, success, warning, danger and default -->
    <input type="radio">
</div>
```


Animation
---------
checkboxes:

``` html
<div class="make-switch" data-animated="false">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch" data-animated="false">
    <input type="radio">
</div>
```


Text
-----
checkboxes:

``` html
<div class="make-switch" data-on-label="SI" data-off-label="NO">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch" data-on-label="SI" data-off-label="NO">
    <input type="radio">
</div>
```


Text Label
----------
checkboxes:

``` html
<div class="make-switch" data-text-label="My Slider Text">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch" data-text-label="My Slider Text">
    <input type="radio">
</div>
```


HTML Text
----------
checkboxes:

``` html
<div class="make-switch" data-on-label="<i class='icon-ok icon-white'></i>" data-off-label="<i class='icon-remove'></i>">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="make-switch" data-on-label="<i class='icon-ok icon-white'></i>" data-off-label="<i class='icon-remove'></i>">
    <input type="radio">
</div>
```


Initial values
--------------
checkboxes:

``` html
<div class="make-switch">
    <input type="checkbox" checked="checked" disabled="disabled">
</div>
```
radioboxes:


``` html
<div class="make-switch">
    <input type="radio" checked="checked" disabled="disabled">
</div>
```


Event handler
-------------
``` javascript
$('#mySwitch').on('switch-change', function (e, data) {
    var $el = $(data.el)
      , value = data.value;
    console.log(e, $el, value);
});
```

Methods
-------
``` javascript
$('#mySwitch').bootstrapSwitch('toggleActivation');
$('#mySwitch').bootstrapSwitch('isActive');
$('#mySwitch').bootstrapSwitch('setActive', false);
$('#mySwitch').bootstrapSwitch('setActive', true);
$('#mySwitch').bootstrapSwitch('toggleState');
$('.mySwitch').bootstrapSwitch('toggleRadioState'); // the radiobuttons need a class not a ID, don't allow uncheck radio switch
$('.mySwitch').bootstrapSwitch('toggleRadioStateAllowUncheck'); // don't allow uncheck radio switch
$('.mySwitch').bootstrapSwitch('toggleRadioStateAllowUncheck', false); // don't allow uncheck radio switch
$('.mySwitch').bootstrapSwitch('toggleRadioStateAllowUncheck', true); // allow uncheck radio switch
$('#mySwitch').bootstrapSwitch('setState', true);
$('#mySwitch').bootstrapSwitch('setState', true || false, true); // sets the state without getting the switch-change event
$('#mySwitch').bootstrapSwitch('setOnLabel', onValue); // sets the text of the "on" label
$('#mySwitch').bootstrapSwitch('setOffLabel', offValue); // sets the text of the "off" label
$('#mySwitch').bootstrapSwitch('setOnClass', onClass); // sets the left color class
$('#mySwitch').bootstrapSwitch('setOffClass', offClass); // sets the right color class
$('#mySwitch').bootstrapSwitch('setAnimated', animated); // sets true or false for animation
$('#mySwitch').bootstrapSwitch('setSizeClass', size); // sets 'switch-mini', 'switch-small' or 'switch-large'
$('#mySwitch').bootstrapSwitch('status');  // returns true or false
$('#mySwitch').bootstrapSwitch('destroy');
```

License
-------
Licensed under the Apache License, Version 2.0
http://www.apache.org/licenses/LICENSE-2.0
