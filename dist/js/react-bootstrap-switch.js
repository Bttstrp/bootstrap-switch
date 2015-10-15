/* ========================================================================
 * react-bootstrap-switch - v3.3.3
 * https://github.com/Julusian/react-bootstrap-switch
 * ========================================================================
 * Copyright 2012-2015 Julian Waller
 *
 * Released under the MIT license
 * ========================================================================
 */

(function() {
  var $, React;

  React = require('react');

  $ = require('jquery');

  module.exports = React.createClass({
    defaults: {
      state: true,
      size: null,
      animate: true,
      disabled: false,
      readonly: false,
      indeterminate: false,
      inverse: false,
      onColor: "primary",
      offColor: "default",
      onText: "ON",
      offText: "OFF",
      labelText: " ",
      handleWidth: "auto",
      labelWidth: "auto",
      baseClass: "bootstrap-switch",
      wrapperClass: "wrapper"
    },
    getInitialState: function() {
      return {
        state: this._prop('state'),
        handleWidth: this._prop('handleWidth'),
        labelWidth: this._prop('labelWidth'),
        offset: null,
        dragStart: false,
        focus: false,
        disabled: this._prop('disabled'),
        readonly: this._prop('readonly'),
        indeterminate: this._prop('indeterminate')
      };
    },
    _prop: function(key) {
      if (typeof this.props[key] === 'undefined') {
        return this.defaults[key];
      } else {
        return this.props[key];
      }
    },
    value: function(val) {
      if (typeof val === "undefined") {
        return this.state.state;
      }
      if (this.state.disabled || this.state.readonly) {
        return this;
      }
      if (this.state.state === val) {
        return this;
      }
      this._changeState(!!val);
      return this;
    },
    valueState: function(val) {
      return this.value(val);
    },
    toggleState: function() {
      return this.toggleValue();
    },
    toggleValue: function() {
      if (this.state.disabled || this.state.readonly) {
        return this;
      }
      if (this.state.indeterminate) {
        return this._changeState(true);
      } else {
        return this._changeState(!this.state.state);
      }
    },
    disabled: function(value) {
      if (typeof value === "undefined") {
        return this.state.disabled;
      }
      value = !!value;
      if (value === this.state.disabled) {
        return this;
      }
      return this.toggleDisabled();
    },
    toggleDisabled: function() {
      this.setState({
        disabled: !this.state.disabled
      });
      return this;
    },
    readonly: function(value) {
      if (typeof value === "undefined") {
        return this.state.readonly;
      }
      value = !!value;
      if (value === this.state.readonly) {
        return this;
      }
      return this.toggleReadonly();
    },
    toggleReadonly: function() {
      this.setState({
        readonly: !this.state.readonly
      });
      return this;
    },
    handleWidth: function(value) {
      if (typeof value === "undefined") {
        return this.state.handleWidth;
      }
      this.setState({
        handleWidth: value
      }, (function(_this) {
        return function() {
          _this._width();
          return _this._containerPosition();
        };
      })(this));
      return this;
    },
    labelWidth: function(value) {
      if (typeof value === "undefined") {
        return this.state.labelWidth;
      }
      this.setState({
        labelWidth: value
      }, (function(_this) {
        return function() {
          _this._width();
          return _this._containerPosition();
        };
      })(this));
      return this;
    },
    _fireStateChange: function() {
      if (typeof this.props.onChange === "undefined") {
        return;
      }
      if (this.props.onChange.length >= 2) {
        return this.props.onChange(this, this.state.state);
      }
      return this.props.onChange(this.state.state);
    },
    _changeState: function(state) {
      return this.setState({
        indeterminate: false,
        state: state
      }, (function(_this) {
        return function() {
          _this._containerPosition();
          return _this._fireStateChange();
        };
      })(this));
    },
    _elmTrigger: function(e) {
      var elm;
      elm = $(this.refs.element.getDOMNode());
      return elm.trigger(e);
    },
    _handleHandlers: function() {
      $(this.refs.on.getDOMNode()).on("click.bootstrapSwitch", (function(_this) {
        return function(event) {
          event.preventDefault();
          event.stopPropagation();
          if (_this.state.disabled || _this.state.readonly) {
            return;
          }
          _this._changeState(false);
          return _this._elmTrigger("focus.bootstrapSwitch");
        };
      })(this));
      return $(this.refs.off.getDOMNode()).on("click.bootstrapSwitch", (function(_this) {
        return function(event) {
          event.preventDefault();
          event.stopPropagation();
          if (_this.state.disabled || _this.state.readonly) {
            return;
          }
          _this._changeState(true);
          return _this._elmTrigger("focus.bootstrapSwitch");
        };
      })(this));
    },
    componentDidMount: function() {
      var init, initInterval;
      init = (function(_this) {
        return function() {
          return _this._width(function() {
            return _this._containerPosition(null);
          });
        };
      })(this);
      if ($(this.refs.wrapper.getDOMNode()).is(":visible")) {
        init();
      } else {
        initInterval = window.setInterval((function(_this) {
          return function() {
            if ($(_this.refs.wrapper.getDOMNode()).is(":visible")) {
              init();
              return window.clearInterval(initInterval);
            }
          };
        })(this), 50);
      }
      this._handleHandlers();
      this._labelHandlers();
      return this._elementHandlers();
    },
    _width: function(callback) {
      var $handles, $label, $off, $on, handleWidth;
      $on = $(this.refs.on.getDOMNode());
      $off = $(this.refs.off.getDOMNode());
      $label = $(this.refs.label.getDOMNode());
      $handles = $on.add($off);
      $handles.add($label).css("width", "");
      handleWidth = this.state.handleWidth === "auto" ? Math.max($on.width(), $off.width()) : this.state.handleWidth;
      $handles.width(handleWidth);
      $label.width((function(_this) {
        return function(index, width) {
          if (_this.state.labelWidth !== "auto") {
            return _this.state.labelWidth;
          }
          return Math.max(handleWidth, width);
        };
      })(this));
      return this.setState({
        handleWidth: $on.outerWidth(),
        labelWidth: $label.outerWidth()
      }, callback);
    },
    _containerPosition: function(state) {
      var values;
      if (state == null) {
        state = this.state.state;
      }
      values = [0, "-" + this.state.handleWidth + "px"];
      if (this.state.indeterminate) {
        return this.setState({
          offset: "-" + (this.state.handleWidth / 2) + "px"
        });
      } else if (state) {
        return this.setState({
          offset: this._prop('inverse') ? values[1] : values[0]
        });
      } else {
        return this.setState({
          offset: this._prop('inverse') ? values[0] : values[1]
        });
      }
    },
    _elementHandlers: function() {
      var $element;
      $element = $(this.refs.element.getDOMNode());
      return $element.on({
        "change.bootstrapSwitch": (function(_this) {
          return function(e, skip) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return _this._changeState(!_this.state.state);
          };
        })(this),
        "focus.bootstrapSwitch": (function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.setState({
              focus: true
            });
          };
        })(this),
        "blur.bootstrapSwitch": (function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.setState({
              focus: false
            });
          };
        })(this),
        "keydown.bootstrapSwitch": (function(_this) {
          return function(e) {
            if (!e.which || _this.state.disabled || _this.state.readonly) {
              return;
            }
            switch (e.which) {
              case 37:
                e.preventDefault();
                e.stopImmediatePropagation();
                return _this._changeState(false);
              case 39:
                e.preventDefault();
                e.stopImmediatePropagation();
                return _this._changeState(true);
            }
          };
        })(this)
      });
    },
    _labelHandlers: function() {
      var $label;
      $label = $(this.refs.label.getDOMNode());
      return $label.on({
        "click": function(e) {
          return e.stopPropagation();
        },
        "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": (function(_this) {
          return function(e) {
            if (_this.state.dragStart || _this.state.disabled || _this.state.readonly) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            _this.setState({
              indeterminate: false,
              dragStart: (e.pageX || e.originalEvent.touches[0].pageX) - parseInt(_this.state.offset, 10)
            });
            return _this._elmTrigger("focus.bootstrapSwitch");
          };
        })(this),
        "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": (function(_this) {
          return function(e) {
            var difference;
            if (_this.state.dragStart == null) {
              return;
            }
            e.preventDefault();
            difference = (e.pageX || e.originalEvent.touches[0].pageX) - _this.state.dragStart;
            if (difference < -_this.state.handleWidth || difference > 0) {
              return;
            }
            return _this.setState({
              offset: difference + "px"
            });
          };
        })(this),
        "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (function(_this) {
          return function(e) {
            var difference, state;
            if (!_this.state.dragStart) {
              return;
            }
            e.preventDefault();
            state = !_this.state.state;
            difference = parseInt(_this.state.offset);
            if (difference) {
              state = difference > -(_this.state.handleWidth / 2);
              state = _this._prop('inverse') ? !state : state;
            }
            return _this.setState({
              dragStart: false,
              state: state
            }, function() {
              _this._containerPosition();
              return _this._fireStateChange();
            });
          };
        })(this),
        "mouseleave.bootstrapSwitch": function(e) {
          return $label.trigger("mouseup.bootstrapSwitch");
        }
      });
    },
    render: function() {
      var containerWidth, offElm, onElm, wrapperClass, wrapperWidth;
      wrapperClass = (function(_this) {
        return function() {
          var classes;
          classes = ["" + (_this._prop('baseClass'))].concat(_this._prop('wrapperClass'));
          classes.push(_this.state.state ? (_this._prop('baseClass')) + "-on" : (_this._prop('baseClass')) + "-off");
          if (_this._prop('size') != null) {
            classes.push((_this._prop('baseClass')) + "-" + (_this._prop('size')));
          }
          if (_this.state.disabled) {
            classes.push((_this._prop('baseClass')) + "-disabled");
          }
          if (_this.state.readonly) {
            classes.push((_this._prop('baseClass')) + "-readonly");
          }
          if (_this.state.indeterminate) {
            classes.push((_this._prop('baseClass')) + "-indeterminate");
          }
          if (_this._prop('inverse')) {
            classes.push((_this._prop('baseClass')) + "-inverse");
          }
          if (_this._prop('id')) {
            classes.push((_this._prop('baseClass')) + "-id-" + (_this._prop('id')));
          }
          if (_this._prop('animate') && !_this.state.dragStart) {
            classes.push((_this._prop('baseClass')) + "-animate");
          }
          if (_this.state.focus) {
            classes.push((_this._prop('baseClass')) + "-focused");
          }
          return classes.join(" ");
        };
      })(this)();
      onElm = React.createElement("span", {
        "ref": "on",
        "style": {
          width: this.state.handleWidth
        },
        "className": (this._prop('baseClass')) + "-handle-on " + (this._prop('baseClass')) + "-" + (this._prop('onColor'))
      }, this._prop('onText'));
      offElm = React.createElement("span", {
        "ref": "off",
        "style": {
          width: this.state.handleWidth
        },
        "className": (this._prop('baseClass')) + "-handle-off " + (this._prop('baseClass')) + "-" + (this._prop('offColor'))
      }, this._prop('offText'));
      containerWidth = this.state.labelWidth + this.state.handleWidth * 2;
      wrapperWidth = this.state.labelWidth + this.state.handleWidth;
      if (containerWidth === wrapperWidth) {
        containerWidth = wrapperWidth = "auto";
      }
      return React.createElement("div", {
        "className": wrapperClass,
        "ref": "wrapper",
        "style": {
          width: wrapperWidth
        }
      }, React.createElement("div", {
        "className": (this._prop('baseClass')) + "-container",
        "ref": "container",
        "style": {
          width: containerWidth,
          marginLeft: this.state.offset
        }
      }, (this._prop('inverse') ? offElm : onElm), React.createElement("span", {
        "className": (this._prop('baseClass')) + "-label",
        "style": {
          width: this.state.labelWidth
        },
        "ref": "label"
      }, this._prop('labelText')), (this._prop('inverse') ? onElm : offElm), React.createElement("input", {
        "type": "checkbox",
        "ref": "element"
      })));
    }
  });

}).call(this);
