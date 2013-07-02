Bootstrap-switch
========================

You can now also use radio buttons as switches.


Demo
----
http://www.larentis.eu/switch/

Usage
-----
Just include Twitter Bootstrap, jQuery, Bootstrap Switch CSS and Javascript
``` html
<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8;" />
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css">
<link rel="stylesheet" href="bootstrapSwitch.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="bootstrapSwitch.js"></script>  // master
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.3/bootstrapSwitch.min.js">  // from cdnjs.com
```

Less
----
If you want to use your bootstrap vars edit bootstrapSwitch.less and then compile the less file
``` bash
lessc static/less/bootstrapSwitch.less static/stylesheets/bootstrapSwitch.css
```

Basic Example
-------------
checkboxes:

``` html
<div class="switch">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="switch">
    <input type="radio">
</div>
```


Large, small or mini
--------------------
checkboxes:

``` html
<div class="switch switch-large">  <!-- switch-large, switch-small or switch-mini -->
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="switch switch-large">  <!-- switch-large, switch-small or switch-mini -->
    <input type="radio">
</div>
```


Colors
------
checkboxes:

``` html
<div class="switch" data-on="danger" data-off="warning">  <!-- primary, info, success, warning and danger -->
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="switch" data-on="danger" data-off="warning">  <!-- primary, info, success, warning and danger -->
    <input type="radio">
</div>
```


Animation
---------
checkboxes:

``` html
<div class="switch" data-animated="false">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="switch" data-animated="false">
    <input type="radio">
</div>
```


Text
-----
checkboxes:

``` html
<div class="switch" data-on-label="SI" data-off-label="NO">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="switch" data-on-label="SI" data-off-label="NO">
    <input type="radio">
</div>
```


HTML Text
----------
checkboxes:

``` html
<div class="switch" data-on-label="<i class='icon-ok icon-white'></i>" data-off-label="<i class='icon-remove'></i>">
    <input type="checkbox">
</div>
```

radioboxes:

``` html
<div class="switch" data-on-label="<i class='icon-ok icon-white'></i>" data-off-label="<i class='icon-remove'></i>">
    <input type="radio">
</div>
```


Initial values
--------------
checkboxes:

``` html
<div class="switch">
    <input type="checkbox" checked="checked" disabled="disabled">
</div>
```
radioboxes:


``` html
<div class="switch">
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
$('#mySwitch').bootstrapSwitch('setState', true);
$('#mySwitch').bootstrapSwitch('status');  // returns true or false
$('#mySwitch').bootstrapSwitch('destroy');
```

License
-------
Licensed under the Apache License, Version 2.0
http://www.apache.org/licenses/LICENSE-2.0
