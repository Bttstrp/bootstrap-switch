'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.state = {
      offset: 0,
      skipAnimation: true,
      dragStart: false,
      focus: false,
      value: props.value != undefined ? props.value : props.defaultValue,
      labelWidth: props.labelWidth,
      handleWidth: props.handleWidth
    };
    return _this;
  }

  _createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._recalculateWidth();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var newValue = nextProps.value !== undefined ? nextProps.value : this.state.value;

      // ensure width is updated
      this.setState({
        labelWidth: nextProps.labelWidth,
        handleWidth: nextProps.handleWidth,
        value: newValue
      }, function () {
        _this2._recalculateWidth(nextProps.value !== undefined);
      });
    }
  }, {
    key: '_getValue',
    value: function _getValue() {
      if (this.props.value !== undefined) return this.props.value;

      return this.state.value;
    }
  }, {
    key: 'value',
    value: function value(val) {
      if (val === undefined) return this.state.value;

      this._setValue(val === null ? null : !!val);
    }
  }, {
    key: '_wrapperClasses',
    value: function _wrapperClasses() {
      var _props = this.props,
          baseClass = _props.baseClass,
          wrapperClass = _props.wrapperClass,
          bsSize = _props.bsSize,
          disabled = _props.disabled,
          readonly = _props.readonly,
          inverse = _props.inverse,
          tristate = _props.tristate,
          animate = _props.animate,
          id = _props.id;
      var _state = this.state,
          skipAnimation = _state.skipAnimation,
          focus = _state.focus,
          dragStart = _state.dragStart;


      var value = this._getValue();

      var classes = [baseClass, wrapperClass];
      classes.push(baseClass + (value ? "-on" : "-off"));

      if (bsSize) classes.push(baseClass + "-" + bsSize);

      if (disabled) classes.push(baseClass + "-disabled");

      if (readonly) classes.push(baseClass + "-readonly");

      if (value === null) classes.push(baseClass + "-indeterminate");

      if (inverse) classes.push(baseClass + "-inverse");

      if (tristate) classes.push(baseClass + "-tristate");

      if (id) classes.push(baseClass + "-" + id);

      if (animate && !dragStart & !skipAnimation) classes.push(baseClass + "-animate");

      if (focus) classes.push(baseClass + "-focused");

      return classes.join(" ");
    }
  }, {
    key: '_recalculateWidth',
    value: function _recalculateWidth(animate) {
      var _this3 = this;

      var onHandle = _reactDom2.default.findDOMNode(this.elmOnHandle);
      var offHandle = _reactDom2.default.findDOMNode(this.elmOffHandle);
      var label = _reactDom2.default.findDOMNode(this.elmLabel);

      // assuming that if the elms need to be resized, the size will be cleared elsewhere first
      var _props2 = this.props,
          handleWidth = _props2.handleWidth,
          labelWidth = _props2.labelWidth;

      var newHandleWidth = handleWidth == "auto" ? Math.max(onHandle.offsetWidth, offHandle.offsetWidth) : handleWidth;

      var newLabelWidth = labelWidth == "auto" ? Math.max(newHandleWidth, label.offsetWidth) : labelWidth;

      return this.setState({
        handleWidth: newHandleWidth,
        labelWidth: newLabelWidth
      }, function () {
        _this3._updateContainerPosition(!animate);
      });
    }
  }, {
    key: '_updateContainerPosition',
    value: function _updateContainerPosition(noAnimate) {
      var _state2 = this.state,
          handleWidth = _state2.handleWidth,
          offset = _state2.offset;
      var inverse = this.props.inverse;

      var value = this._getValue();

      // skip animating if no offset yet
      var skipAnimation = noAnimate || offset == null;

      var newOffset = offset;

      if (handleWidth === 'auto') {
        newOffset = 0;
      } else if (value === null) {
        newOffset = -(handleWidth / 2);
      } else if (value) {
        newOffset = inverse ? -handleWidth : 0;
      } else {
        newOffset = inverse ? 0 : -handleWidth;
      }

      return this.setState({
        skipAnimation: skipAnimation,
        offset: newOffset
      });
    }
  }, {
    key: '_disableUserInput',
    value: function _disableUserInput() {
      var _props3 = this.props,
          disabled = _props3.disabled,
          readonly = _props3.readonly;


      return disabled || readonly;
    }
  }, {
    key: '_handleOnClick',
    value: function _handleOnClick() {
      if (this._disableUserInput()) return;

      this._setValue(this.props.tristate ? this._getValue() == null : false);
      this._setFocus();
    }
  }, {
    key: '_handleOffClick',
    value: function _handleOffClick() {
      if (this._disableUserInput()) return;

      this._setValue(this.props.tristate ? this._getValue() != null : true);
      this._setFocus();
    }
  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress(e) {
      if (!e.which || this._disableUserInput()) return;

      var inverse = this.props.inverse;


      switch (e.which) {
        case 37:
          return this._setValue(inverse);

        case 39:
          return this._setValue(!inverse);
      }
    }
  }, {
    key: '_handleLabelMouseDown',
    value: function _handleLabelMouseDown(e) {
      if (this.state.dragStart || this._disableUserInput()) return;

      this.setState({
        dragStart: (e.pageX || e.touches[0].pageX) - this.state.offset
      });
      this._setFocus();
    }
  }, {
    key: '_handleLabelMouseMove',
    value: function _handleLabelMouseMove(e) {
      var _state3 = this.state,
          dragStart = _state3.dragStart,
          handleWidth = _state3.handleWidth;


      if (dragStart === undefined || dragStart === null || dragStart === false) return;

      var difference = (e.pageX || e.touches[0].pageX) - dragStart;
      if (difference < -handleWidth || difference > 0) return;

      this.setState({
        skipAnimation: false,
        offset: difference,
        dragged: true
      });
    }
  }, {
    key: '_handleLabelMouseUp',
    value: function _handleLabelMouseUp() {
      var _this4 = this;

      var _state4 = this.state,
          dragStart = _state4.dragStart,
          dragged = _state4.dragged,
          offset = _state4.offset,
          handleWidth = _state4.handleWidth;

      var value = this._getValue();

      if (dragStart === undefined || dragStart === null || dragStart === false) return;

      var _props4 = this.props,
          inverse = _props4.inverse,
          tristate = _props4.tristate;


      var val = void 0;

      if (dragged) {
        val = offset > -(handleWidth / 2);
        val = inverse ? !val : val;
      } else if (tristate) {
        val = value === null ? true : null;
      } else {
        val = !value;
      }

      this.setState({
        dragStart: false,
        dragged: false,
        value: val
      }, function () {
        _this4._updateContainerPosition();
        _this4._fireStateChange(val);
      });
    }
  }, {
    key: '_setFocus',
    value: function _setFocus() {
      this.setState({
        focus: true
      });
    }
  }, {
    key: '_setBlur',
    value: function _setBlur() {
      this.setState({
        focus: false
      });
    }
  }, {
    key: '_setValue',
    value: function _setValue(val) {
      var _this5 = this;

      var value = this._getValue();
      if (val === value) return;

      var newValue = val === undefined ? !value : val;

      this.setState({
        value: newValue
      }, function () {
        _this5._updateContainerPosition();
        _this5._fireStateChange(newValue);
      });
    }
  }, {
    key: '_fireStateChange',
    value: function _fireStateChange(newValue) {
      var _this6 = this;

      var onChange = this.props.onChange;

      if (typeof onChange != "function") return;

      setTimeout(function () {
        return onChange(_this6, newValue);
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          baseClass = _props5.baseClass,
          inverse = _props5.inverse;
      var _state5 = this.state,
          handleWidth = _state5.handleWidth,
          labelWidth = _state5.labelWidth,
          offset = _state5.offset;


      var onHandle = this._renderOnHandle();
      var offHandle = this._renderOffHandle();

      var containerWidth = labelWidth + handleWidth * 2;
      var wrapperWidth = labelWidth + handleWidth;
      if (containerWidth == wrapperWidth || handleWidth == "auto" || labelWidth == "auto") containerWidth = wrapperWidth = "auto";

      var wrapperParams = {
        className: this._wrapperClasses(),
        style: { width: wrapperWidth },
        tabIndex: "0",
        onKeyDown: this._handleKeyPress.bind(this),
        onFocus: this._setFocus.bind(this),
        onBlur: this._setBlur.bind(this)
      };

      var containerParams = {
        className: baseClass + '-container',
        style: { width: containerWidth, marginLeft: offset }
      };

      return _react2.default.createElement(
        'div',
        wrapperParams,
        _react2.default.createElement(
          'div',
          containerParams,
          inverse ? offHandle : onHandle,
          this._renderLabel(),
          inverse ? onHandle : offHandle
        )
      );
    }
  }, {
    key: '_renderOnHandle',
    value: function _renderOnHandle() {
      var _this7 = this;

      var _props6 = this.props,
          baseClass = _props6.baseClass,
          onColor = _props6.onColor,
          onText = _props6.onText;
      var handleWidth = this.state.handleWidth;


      var params = {
        ref: function ref(e) {
          return _this7.elmOnHandle = e;
        },
        style: { width: handleWidth },
        className: baseClass + '-handle-on ' + baseClass + '-' + onColor,
        onClick: this._handleOnClick.bind(this)
      };

      return _react2.default.createElement(
        'span',
        params,
        onText
      );
    }
  }, {
    key: '_renderOffHandle',
    value: function _renderOffHandle() {
      var _this8 = this;

      var _props7 = this.props,
          baseClass = _props7.baseClass,
          offColor = _props7.offColor,
          offText = _props7.offText;
      var handleWidth = this.state.handleWidth;


      var params = {
        ref: function ref(e) {
          return _this8.elmOffHandle = e;
        },
        style: { width: handleWidth },
        className: baseClass + '-handle-off ' + baseClass + '-' + offColor,
        onClick: this._handleOffClick.bind(this)
      };

      return _react2.default.createElement(
        'span',
        params,
        offText
      );
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel() {
      var _this9 = this;

      var _props8 = this.props,
          baseClass = _props8.baseClass,
          labelText = _props8.labelText;
      var labelWidth = this.state.labelWidth;


      var params = {
        ref: function ref(e) {
          return _this9.elmLabel = e;
        },
        style: { width: labelWidth },
        className: baseClass + '-label',

        onTouchStart: this._handleLabelMouseDown.bind(this),
        onTouchMove: this._handleLabelMouseMove.bind(this),
        onTouchEnd: this._handleLabelMouseUp.bind(this),

        onMouseDown: this._handleLabelMouseDown.bind(this),
        onMouseMove: this._handleLabelMouseMove.bind(this),
        onMouseUp: this._handleLabelMouseUp.bind(this),
        onMouseLeave: this._handleLabelMouseUp.bind(this)
      };

      return _react2.default.createElement(
        'span',
        params,
        labelText
      );
    }
  }]);

  return Switch;
}(_react2.default.Component);

exports.default = Switch;


Switch.defaultProps = {
  baseClass: 'bootstrap-switch',
  wrapperClass: 'wrapper',
  bsSize: null,

  handleWidth: 'auto',
  labelWidth: 'auto',

  onColor: 'primary',
  offColor: 'default',

  onText: 'ON',
  offText: 'OFF',
  labelText: ' ',

  inverse: false,
  animate: true,

  disabled: false,
  readonly: false,

  tristate: false,
  defaultValue: true,
  value: undefined
};

Switch.propTypes = {
  baseClass: _propTypes2.default.string,
  wrapperClass: _propTypes2.default.string,
  bsSize: _propTypes2.default.string,

  handleWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  labelWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  onColor: _propTypes2.default.string,
  offColor: _propTypes2.default.string,

  onText: _propTypes2.default.node,
  offText: _propTypes2.default.node,
  labelText: _propTypes2.default.string,

  inverse: _propTypes2.default.bool,
  animate: _propTypes2.default.bool,

  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,

  tristate: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.bool,
  value: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};