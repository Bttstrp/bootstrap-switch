import React from 'react';
import ReactDOM from 'react-dom';

export default class Switch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      skipAnimation: true,
      dragStart: false,
      focus: false,
      value: props.value != undefined ? props.value : props.defaultValue,
      labelWidth: props.labelWidth,
      handleWidth: props.handleWidth
    };
  }

  componentDidMount() {
    this._recalculateWidth();
  }

  componentWillReceiveProps(nextProps){
    const newValue = nextProps.value !== undefined ? nextProps.value : this.state.value;

    // ensure width is updated
    this.setState({
      labelWidth: nextProps.labelWidth,
      handleWidth: nextProps.handleWidth,
      value: newValue
    }, () => {
      this._recalculateWidth(nextProps.value !== undefined);
    });
  }

  _getValue(){
    if(this.props.value !== undefined)
      return this.props.value;

    return this.state.value;
  }

  value(val){
    if(val === undefined)
      return this.state.value;

    this._setValue(val === null ? null : !!val);
  }

  _wrapperClasses(){
    const {
      baseClass,
      wrapperClass,
      bsSize,
      disabled,
      readonly,
      inverse,
      tristate,
      animate,
      id
    } = this.props;

    const {
      skipAnimation,
      focus,
      dragStart,
    } = this.state;

    const value = this._getValue();

    const classes = [ baseClass, wrapperClass ];
    classes.push(baseClass + (value ? "-on" : "-off"));

    if (bsSize)
      classes.push(baseClass + "-" + bsSize);

    if (disabled)
      classes.push(baseClass + "-disabled");

    if (readonly)
      classes.push(baseClass + "-readonly");

    if (value === null)
      classes.push(baseClass + "-indeterminate");

    if (inverse)
        classes.push(baseClass + "-inverse");

    if (tristate)
        classes.push(baseClass + "-tristate");

    if (id)
      classes.push(baseClass + "-" + id);

    if (animate && !dragStart & !skipAnimation)
      classes.push(baseClass + "-animate");

    if (focus)
      classes.push(baseClass + "-focused");

    return classes.join(" ");
  }

  _recalculateWidth(animate){
    const onHandle = ReactDOM.findDOMNode(this.elmOnHandle);
    const offHandle = ReactDOM.findDOMNode(this.elmOffHandle);
    const label = ReactDOM.findDOMNode(this.elmLabel);

    // assuming that if the elms need to be resized, the size will be cleared elsewhere first
    const { handleWidth, labelWidth } = this.props;
    const newHandleWidth = handleWidth == "auto"
      ? Math.max(onHandle.offsetWidth, offHandle.offsetWidth)
      : handleWidth;

    const newLabelWidth = labelWidth == "auto"
      ? Math.max(newHandleWidth, label.offsetWidth)
      : labelWidth;

    return this.setState({
      handleWidth: newHandleWidth,
      labelWidth: newLabelWidth
    }, () => {
      this._updateContainerPosition(!animate);
    });
  }

  _updateContainerPosition(noAnimate){
    const { handleWidth, offset } = this.state;
    const { inverse } = this.props;
    const value = this._getValue();

    // skip animating if no offset yet
    const skipAnimation = noAnimate || (offset == null)

    let newOffset = offset;

    if(handleWidth === 'auto') {
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

  _disableUserInput(){
    const { disabled, readonly } = this.props;

    return disabled || readonly;
  }

  _handleOnClick(){
    if(this._disableUserInput())
      return;

    this._setValue(this.props.tristate?(this._getValue()==null):false);
    this._setFocus();
  }

  _handleOffClick(){
    if(this._disableUserInput())
      return;

    this._setValue(this.props.tristate?(this._getValue()!=null):true);
    this._setFocus();
  }

  _handleKeyPress(e){
    if(!e.which || this._disableUserInput())
      return;

    const { inverse } = this.props;

    switch(e.which){
      case 37:
        return this._setValue(inverse);

      case 39:
        return this._setValue(!inverse);
    }
  }

  _handleLabelMouseDown(e){
    if(this.state.dragStart || this._disableUserInput())
      return;

    this.setState({
      dragStart: (e.pageX || e.touches[0].pageX) - this.state.offset
    });
    this._setFocus();
  }

  _handleLabelMouseMove(e){
    const { dragStart, handleWidth } = this.state;
    
    if(dragStart === undefined || dragStart === null || dragStart === false)
      return;

    const difference = (e.pageX || e.touches[0].pageX) - dragStart;
    if(difference < -handleWidth || difference > 0)
      return;

    this.setState({
      skipAnimation: false,
      offset: difference,
      dragged: true
    }); 
  }

  _handleLabelMouseUp(){
    const { dragStart, dragged, offset, handleWidth } = this.state;
    const value = this._getValue();
    
    if(dragStart === undefined || dragStart === null || dragStart === false)
      return;

    const { inverse, tristate } = this.props;

    let val;
    
    if(dragged){
      val = offset > -(handleWidth / 2);
      val = inverse ? !val : val;
    } else if (tristate) {
      val = value===null?true:null;
    } else {
      val = !value;
    }

    this.setState({
      dragStart: false,
      dragged: false,
      value: val
    }, () => {
      this._updateContainerPosition();
      this._fireStateChange(val);
    });
  }

  _setFocus(){
    this.setState({
      focus: true
    });
  }

  _setBlur(){
    this.setState({
      focus: false
    });
  }

  _setValue(val){
    const value = this._getValue();
    if(val === value)
      return;

    const newValue = (val === undefined ? !value : val);

    this.setState({
      value: newValue
    }, () => {
      this._updateContainerPosition();
      this._fireStateChange(newValue);
    });
  }

  _fireStateChange(newValue){
    const { onChange } = this.props;
    if (typeof onChange != "function")
      return;

    setTimeout(() => onChange(this, newValue), 0);
  }

  render() {
    const { baseClass, inverse } = this.props;
    const { handleWidth, labelWidth, offset } = this.state;
  
    const onHandle = this._renderOnHandle();
    const offHandle = this._renderOffHandle();

    let containerWidth = labelWidth + (handleWidth * 2);
    let wrapperWidth = labelWidth + handleWidth;
    if(containerWidth == wrapperWidth || handleWidth == "auto" || labelWidth == "auto")
      containerWidth = wrapperWidth = "auto";

    const wrapperParams = {
      className:  this._wrapperClasses(),
      style:      { width: wrapperWidth },
      tabIndex:   "0",
      onKeyDown:  this._handleKeyPress.bind(this),
      onFocus:    this._setFocus.bind(this),
      onBlur:     this._setBlur.bind(this)
    };

    const containerParams = {
      className:  `${baseClass}-container`,
      style:      { width: containerWidth, marginLeft: offset }
    };

    return (
      <div {...wrapperParams}>
        <div {...containerParams}>
          { inverse ? offHandle : onHandle}
          { this._renderLabel() }
          { inverse ? onHandle : offHandle}
        </div>
      </div>
    );
  }

  _renderOnHandle(){
    const { baseClass, onColor, onText } = this.props;
    const { handleWidth } = this.state;

    const params = {
      ref:        e => this.elmOnHandle = e,
      style:      { width: handleWidth },
      className:  `${baseClass}-handle-on ${baseClass}-${onColor}`,
      onClick:    this._handleOnClick.bind(this)
    };

    return <span {...params}>{ onText }</span>;
  }

  _renderOffHandle(){
    const { baseClass, offColor, offText } = this.props;
    const { handleWidth } = this.state;

    const params = {
      ref:        e => this.elmOffHandle = e,
      style:      { width: handleWidth },
      className:  `${baseClass}-handle-on ${baseClass}-${offColor}`,
      onClick:    this._handleOffClick.bind(this)
    };

    return <span {...params}>{ offText }</span>;
  }

  _renderLabel(){
    const { baseClass, labelText } = this.props;
    const { labelWidth } = this.state;

    const params = {
      ref:          e => this.elmLabel = e,
      style:        { width: labelWidth },
      className:    `${baseClass}-label`,

      onTouchStart: this._handleLabelMouseDown.bind(this),
      onTouchMove:  this._handleLabelMouseMove.bind(this),
      onTouchEnd:   this._handleLabelMouseUp.bind(this),

      onMouseDown:  this._handleLabelMouseDown.bind(this),
      onMouseMove:  this._handleLabelMouseMove.bind(this),
      onMouseUp:    this._handleLabelMouseUp.bind(this),
      onMouseLeave: this._handleLabelMouseUp.bind(this)
    };

    return <span {...params}>{labelText}</span>;
  }
}

Switch.defaultProps = {
  baseClass:      'bootstrap-switch',
  wrapperClass:   'wrapper',
  bsSize:         null,

  handleWidth:    'auto',
  labelWidth:     'auto',

  onColor:        'primary',
  offColor:       'default',

  onText:         'ON',
  offText:        'OFF',
  labelText:      ' ',

  inverse:        false,
  animate:        true,

  disabled:       false,
  readonly:       false,

  tristate:       false,
  defaultValue:   true,
  value:          undefined
};

Switch.propTypes = {
  baseClass:      React.PropTypes.string,
  wrapperClass:   React.PropTypes.string,
  bsSize:         React.PropTypes.string,

  handleWidth:    React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number
                  ]),
  labelWidth:     React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number
                  ]),

  onColor:        React.PropTypes.string,
  offColor:       React.PropTypes.string,

  onText:         React.PropTypes.string,
  offText:        React.PropTypes.string,
  labelText:      React.PropTypes.string,

  inverse:        React.PropTypes.bool,
  animate:        React.PropTypes.bool,

  disabled:       React.PropTypes.bool,
  readonly:       React.PropTypes.bool,

  tristate:       React.PropTypes.bool,
  defaultValue:   React.PropTypes.bool,
  value:          React.PropTypes.bool,
  onChange:       React.PropTypes.func,
};
