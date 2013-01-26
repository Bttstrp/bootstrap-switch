Bootstrap-switch
========================

Demo
----
http://www.larentis.eu/switch/

Usage
-----

Just include Twitter Bootstrap, jQuery, Bootstrap Switch CSS and Javascript
``` html
<link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
<link href="bootstrap-switch.css" rel="stylesheet">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="jquery.switch.js"></script>
```

Basic Example
-------------

``` html
<div class="switch">
    <input type="checkbox">
</div>
```

Large, small or mini
--------------------

``` html
<div class="switch switch-large">  <!-- switch-large, switch-small or switch-mini -->
    <input type="checkbox">
</div>
```

Data attributes
---------------

``` html
<div class="switch" data-on="danger" data-off="warning"  data-animated="false">  <!-- primary, info, success, warning and danger -->
    <input type="checkbox">
</div>
```

Initial values
--------------

``` html
<div class="switch">
    <input type="checkbox" checked="checked" disabled="disabled">
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
$('#mySwitch').switch('toggleActivation');
$('#mySwitch').switch('toggleState');
$('#mySwitch').switch('setState', true);
$('#mySwitch').switch('status');  // returns true or false
$('#mySwitch').switch('destroy');
```
