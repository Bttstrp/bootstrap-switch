Bootstrap Switch
================

Turn checkboxes and radio buttons in toggle switches.

**Version 3 is almost ready and features a entire API redesign and source rewriting. Knowing that, your help would be decisive to ship it within days. Give the branch `3.0` a try and post any bugs you might encounter or improvements you would like to integrate in the final release.
With heart, many thanks.**

Demo and Documentation
----------------------
http://www.bootstrap-switch.org

Usage
-----

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

LESS
----
If you want to use your custom Bootstrap variables, choose the appropriate `bootstrap-switch.less` source file among versions 2 and 3 and include it in your LESS stack.

Supported browsers
------------------
IE9+ and all the other modern browsers (until proven otherwise: submit a issue and let's see what we can do).

License
-------
Licensed under the Apache License, Version 2.0
http://www.apache.org/licenses/LICENSE-2.0
