'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = exports.Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, props));

    _this.state = {
      offset: null,
      skipAnimation: true,
      dragStart: false,
      focus: false,
      indeterminate: props.indeterminate,
      value: props.value,
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

      // ensure width is updated
      this.setState({
        labelWidth: nextProps.labelWidth,
        handleWidth: nextProps.handleWidth
      }, function () {
        _this2._recalculateWidth();
      });
    }
  }, {
    key: 'value',
    value: function value(val) {
      if (val === undefined) return this.state.value;

      this._setValue(!!val);
    }
  }, {
    key: '_wrapperClasses',
    value: function _wrapperClasses() {
      var _props = this.props;
      var baseClass = _props.baseClass;
      var bsSize = _props.bsSize;
      var disabled = _props.disabled;
      var readonly = _props.readonly;
      var inverse = _props.inverse;
      var animate = _props.animate;
      var _state = this.state;
      var value = _state.value;
      var skipAnimation = _state.skipAnimation;
      var focus = _state.focus;
      var dragStart = _state.dragStart;
      var indeterminate = _state.indeterminate;


      var classes = [baseClass];
      // classes = ["#{@_prop('baseClass')}"].concat @_prop('wrapperClass')
      classes.push(baseClass + (value ? "-on" : "-off"));

      if (bsSize) classes.push(baseClass + "-" + bsSize);

      if (disabled) classes.push(baseClass + "-disabled");

      if (readonly) classes.push(baseClass + "-readonly");

      if (indeterminate) classes.push(baseClass + "-indeterminate");

      if (inverse) classes.push(baseClass + "-inverse");

      // classes.push "#{@_prop('baseClass')}-id-#{@_prop('id')}" if @_prop('id')

      if (animate && !dragStart & !skipAnimation) classes.push(baseClass + "-animate");

      if (focus) classes.push(baseClass + "-focused");

      // console.log(classes);

      return classes.join(" ");
    }
  }, {
    key: '_recalculateWidth',
    value: function _recalculateWidth() {
      var onHandle = _reactDom2.default.findDOMNode(this.elmOnHandle);
      var offHandle = _reactDom2.default.findDOMNode(this.elmOffHandle);
      var label = _reactDom2.default.findDOMNode(this.elmLabel);

      // TODO - check this
      // assuming that if the elms need to be resized, the size will be cleared elsewhere first
      var handleWidth = this.props.handleWidth;

      var newHandleWidth = handleWidth == "auto" ? Math.max(onHandle.offsetWidth, offHandle.offsetWidth) : handleWidth;

      return this.setState({
        handleWidth: newHandleWidth,
        labelWidth: label.offsetWidth
      });
    }
  }, {
    key: '_updateContainerPosition',
    value: function _updateContainerPosition(state) {
      var _ref = state ? state : this.state;

      var handleWidth = _ref.handleWidth;
      var offset = _ref.offset;
      var value = _ref.value;
      var indeterminate = _ref.indeterminate;
      var inverse = this.props.inverse;

      // skip animating if no offset yet

      var skipAnimation = offset == null;

      var newOffset = offset;

      if (indeterminate) {
        newOffset = -handleWidth;
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
      var _props2 = this.props;
      var disabled = _props2.disabled;
      var readonly = _props2.readonly;


      return disabled || readonly;
    }
  }, {
    key: '_handleOnClick',
    value: function _handleOnClick(e) {
      if (this._disableUserInput()) return;

      this._setValue(false);
      this._setFocus();
    }
  }, {
    key: '_handleOffClick',
    value: function _handleOffClick() {
      if (this._disableUserInput()) return;

      this._setValue(true);
      this._setFocus();
    }
  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress(e) {
      console.log(e); // TODO - not working...
      if (!e.which || this._disableUserInput()) return;

      switch (e.which) {
        case 37:
          return this._setValue(false);

        case 39:
          return this._setValue(true);
      }
    }
  }, {
    key: '_handleLabelMouseDown',
    value: function _handleLabelMouseDown(e) {
      if (this.state.dragStart || this._disableUserInput()) return;

      console.log("START");

      this.setState({
        indeterminate: false,
        dragStart: (e.pageX || e.originalEvent.touches[0].pageX) - this.state.offset
      });
      this._setFocus();
    }
  }, {
    key: '_handleLabelMouseMove',
    value: function _handleLabelMouseMove(e) {
      var _state2 = this.state;
      var dragStart = _state2.dragStart;
      var handleWidth = _state2.handleWidth;


      if (dragStart === undefined || dragStart === null || dragStart === false) return;

      var difference = (e.pageX || e.originalEvent.touches[0].pageX) - dragStart;
      console.log("DIFF", difference);
      if (difference < -handleWidth || difference > 0) return;

      this.setState({
        skipAnimation: false,
        offset: difference,
        dragged: true
      });
    }
  }, {
    key: '_handleLabelMouseUp',
    value: function _handleLabelMouseUp(e) {
      var _this3 = this;

      var _state3 = this.state;
      var dragStart = _state3.dragStart;
      var value = _state3.value;
      var dragged = _state3.dragged;
      var offset = _state3.offset;
      var handleWidth = _state3.handleWidth;


      if (dragStart === undefined || dragStart === null || dragStart === false) return;

      var inverse = this.props.inverse;


      var val = !value;

      if (dragged) {
        val = offset > -(handleWidth / 2);
        val = inverse ? !val : val;
      }

      this.setState({
        dragStart: false,
        dragged: false,
        value: val
      }, function () {
        _this3._updateContainerPosition();
        _this3._fireStateChange();
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
      var _this4 = this;

      if (val === this.state.value) return;

      this.setState({
        indeterminate: false, // TODO - not used
        value: val === undefined ? !this.state.value : val
      }, function () {
        _this4._updateContainerPosition();
        _this4._fireStateChange();
      });
    }
  }, {
    key: '_fireStateChange',
    value: function _fireStateChange() {
      var _this5 = this;

      var onChange = this.props.onChange;

      if (typeof onChange != "function") return;

      setTimeout(function () {
        return onChange(_this5, _this5.state.value);
      }, 0);
    }

    // TODO remove text refs?

  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props3 = this.props;
      var baseClass = _props3.baseClass;
      var labelText = _props3.labelText;
      var onColor = _props3.onColor;
      var onText = _props3.onText;
      var offColor = _props3.offColor;
      var offText = _props3.offText;
      var inverse = _props3.inverse;
      var bsSize = _props3.bsSize;
      var _state4 = this.state;
      var handleWidth = _state4.handleWidth;
      var labelWidth = _state4.labelWidth;
      var offset = _state4.offset;
      var value = _state4.value;


      var onHandle = _react2.default.createElement(
        'span',
        { ref: function ref(e) {
            return _this6.elmOnHandle = e;
          }, style: { width: handleWidth },
          className: baseClass + '-handle-on ' + baseClass + '-' + onColor,
          onClick: this._handleOnClick.bind(this) },
        onText
      );
      var offHandle = _react2.default.createElement(
        'span',
        { ref: function ref(e) {
            return _this6.elmOffHandle = e;
          }, style: { width: handleWidth },
          className: baseClass + '-handle-off ' + baseClass + '-' + offColor,
          onClick: this._handleOffClick.bind(this) },
        offText
      );

      var label = _react2.default.createElement(
        'span',
        { className: baseClass + '-label', style: { width: labelWidth }, ref: function ref(e) {
            return _this6.elmLabel = e;
          },
          onMouseDown: this._handleLabelMouseDown.bind(this), onMouseMove: this._handleLabelMouseMove.bind(this),
          onMouseUp: this._handleLabelMouseUp.bind(this), onMouseLeave: this._handleLabelMouseUp.bind(this) },
        labelText
      );

      var containerWidth = labelWidth + handleWidth * 2;
      var wrapperWidth = labelWidth + handleWidth;
      if (containerWidth == wrapperWidth) containerWidth = wrapperWidth = "auto";

      var wrapperClass = this._wrapperClasses();

      return _react2.default.createElement(
        'div',
        { className: wrapperClass, ref: 'wrapper', style: { width: wrapperWidth }, onBlur: this._setBlur.bind(this), onFocus: this._setFocus.bind(this) },
        _react2.default.createElement(
          'div',
          { className: baseClass + '-container', ref: 'container', style: { width: containerWidth, marginLeft: offset } },
          inverse ? offHandle : onHandle,
          label,
          inverse ? onHandle : offHandle,
          _react2.default.createElement('input', { type: 'checkbox', ref: 'element', onKeyDown: this._handleKeyPress.bind(this) })
        )
      );
    }
  }]);

  return Switch;
}(_react2.default.Component);

// TODO - add defaultValue prop.
// then if the value prop is defined, always render to that regardless of other state changes?

Switch.defaultProps = {
  value: true,
  wrapperClass: "wrapper",
  handleWidth: "auto",
  labelWidth: "auto",
  onColor: "primary",
  offColor: "default",
  baseClass: "bootstrap-switch",
  onText: "ON",
  offText: "OFF",
  labelText: " ",
  inverse: false,
  bsSize: null,
  disabled: false,
  readonly: false,
  indeterminate: false,
  animate: true
};

Switch.propTypes = {
  value: _react2.default.PropTypes.bool,
  inverse: _react2.default.PropTypes.bool,
  wrapperClass: _react2.default.PropTypes.string,
  handleWidth: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  labelWidth: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  onColor: _react2.default.PropTypes.string,
  offColor: _react2.default.PropTypes.string,
  baseClass: _react2.default.PropTypes.string,
  onText: _react2.default.PropTypes.string,
  offText: _react2.default.PropTypes.string,
  labelText: _react2.default.PropTypes.string,
  bsSize: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  readonly: _react2.default.PropTypes.bool,
  indeterminate: _react2.default.PropTypes.bool,
  animate: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func
};