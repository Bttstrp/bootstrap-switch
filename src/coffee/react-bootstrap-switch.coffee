React = require('react')
$ = require('jquery')

module.exports = React.createClass
  defaults:
    state: true
    size: null
    animate: true
    disabled: false
    readonly: false
    indeterminate: false
    inverse: false
    onColor: "primary"
    offColor: "default"
    onText: "ON"
    offText: "OFF"
    labelText: " "
    handleWidth: "auto"
    labelWidth: "auto"
    baseClass: "bootstrap-switch"
    wrapperClass: "wrapper"

  # treating this as a constructor..
  getInitialState: ->
    state: @_prop('state')
    handleWidth: @_prop('handleWidth')
    labelWidth: @_prop('labelWidth')
    offset: null
    skipAnimation: true
    dragStart: false
    focus: false
    disabled: @_prop('disabled')
    readonly: @_prop('readonly')
    indeterminate: @_prop('indeterminate')

  componentWillReceiveProps: (nextProps) ->
    this.value(nextProps.state)

  _prop: (key) ->
    if typeof @props[key] == 'undefined'
      @defaults[key]
    else
      @props[key]

  value: (val) ->
    return @state.state  if typeof val is "undefined"
    return @  if @state.disabled or @state.readonly

    return @ if @state.state == val

    # remove indeterminate
    @_changeState not not val
    @

  valueState: (val) ->
    return @value(val)

  toggleState: ->
    return @toggleValue()

  toggleValue: ->
    return @  if @state.disabled or @state.readonly

    if @state.indeterminate
      @_changeState true
    else
      @_changeState not @state.state

  disabled: (value) ->
    return @state.disabled  if typeof value is "undefined"

    value = not not value
    return @  if value is @state.disabled

    @toggleDisabled()

  toggleDisabled: ->
    @setState
      disabled: not @state.disabled
    @

  readonly: (value) ->
    return @state.readonly  if typeof value is "undefined"

    value = not not value
    return @  if value is @state.readonly

    @toggleReadonly()

  toggleReadonly: ->
    @setState
      readonly: not @state.readonly
    @

  handleWidth: (value) ->
    return @state.handleWidth  if typeof value is "undefined"

    @setState
      handleWidth: value, =>
        @_width()
        @_containerPosition()
    @


  labelWidth: (value) ->
    return @state.labelWidth  if typeof value is "undefined"

    @setState
      labelWidth: value, =>
        @_width()
        @_containerPosition()
    @

  _fireStateChange: ->
    return if typeof @props.onChange == "undefined"
    return @props.onChange(this, @state.state) if(@props.onChange.length >= 2)
    @props.onChange(@state.state)

  _changeState: (state) ->
    @setState
      indeterminate: false
      state:state, =>
        @_containerPosition()
        @_fireStateChange()

  _elmTrigger: (e) ->
    elm = $ @refs.element
    elm.trigger e

  _handleHandlers: ->
    $(@refs.on).on "click.bootstrapSwitch", (event) =>
      event.preventDefault()
      event.stopPropagation()

      return  if @state.disabled or @state.readonly

      @_changeState false
      @_elmTrigger "focus.bootstrapSwitch"

    $(@refs.off).on "click.bootstrapSwitch", (event) =>
      event.preventDefault()
      event.stopPropagation()

      return  if @state.disabled or @state.readonly

      @_changeState true
      @_elmTrigger "focus.bootstrapSwitch"

  componentDidMount: ->
    init = =>
      @_width => @_containerPosition null

    if $(@refs.wrapper).is ":visible"
      init()
    else
      initInterval = window.setInterval =>
        if $(@refs.wrapper).is ":visible"
          init()
          window.clearInterval initInterval
      , 50

    @_handleHandlers()
    @_labelHandlers()
    @_elementHandlers()

  _width: (callback) ->
    $on = $(@refs.on)
    $off = $(@refs.off)
    $label = $(@refs.label)
    $handles = $on.add($off)

    # remove width from inline style
    $handles.add($label).css("width", "")

    # save handleWidth for further label width calculation check
    handleWidth = if @state.handleWidth is "auto"
    then Math.max $on.width(), $off.width()
    else @state.handleWidth

    # set handles width
    $handles.width handleWidth

    # set label width
    $label.width (index, width) =>
      return @state.labelWidth  if @state.labelWidth isnt "auto"
      Math.max handleWidth, width

    @setState
      handleWidth: $on.outerWidth()
      labelWidth: $label.outerWidth(), callback

  _containerPosition: (state = @state.state) ->
    values = [0, "-#{@state.handleWidth}px"]

    # skip animating if no offset yet
    skipAnimation = @state.offset == null

    if @state.indeterminate
      return @setState
        skipAnimation: skipAnimation
        offset: "-#{@state.handleWidth / 2}px"
    else if state
      @setState
        skipAnimation: skipAnimation
        offset: if @_prop('inverse') then values[1] else values[0]
    else
      @setState
        skipAnimation: skipAnimation
        offset: if @_prop('inverse') then values[0] else values[1]

  _elementHandlers: ->
    $element = $ @refs.element
    $element.on
      "change.bootstrapSwitch": (e, skip) =>
        e.preventDefault()
        e.stopImmediatePropagation()

        @_changeState not @state.state

      "focus.bootstrapSwitch": (e) =>
        e.preventDefault()
        @setState
          focus: true

      "blur.bootstrapSwitch": (e) =>
        e.preventDefault()
        @setState
          focus: false

      "keydown.bootstrapSwitch": (e) =>
        return  if not e.which or @state.disabled or @state.readonly

        switch e.which
          when 37
            e.preventDefault()
            e.stopImmediatePropagation()

            @_changeState false
          when 39
            e.preventDefault()
            e.stopImmediatePropagation()

            @_changeState true


  _labelHandlers: ->
    $label = $(@refs.label)
    $label.on
      "click": (e) ->
        e.stopPropagation()

      "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": (e) =>
        return  if @state.dragStart or @state.disabled or @state.readonly

        e.preventDefault()
        e.stopPropagation()

        @setState
          indeterminate: false
          dragStart: (e.pageX or e.originalEvent.touches[0].pageX) - parseInt @state.offset, 10
        @_elmTrigger "focus.bootstrapSwitch"

      "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": (e) =>
        return  unless @state.dragStart?

        e.preventDefault()

        difference = (e.pageX or e.originalEvent.touches[0].pageX) - @state.dragStart
        return  if difference < -@state.handleWidth or difference > 0

        @setState
          skipAnimation: false
          offset: "#{difference}px"
          dragged: true

      "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (e) =>
        return  unless @state.dragStart

        e.preventDefault()

        state = not @state.state

        if @state.dragged
          difference = parseInt @state.offset
          state = difference > -(@state.handleWidth / 2)
          state = if @_prop('inverse') then not state else state

        @setState
          dragStart: false
          dragged: false
          state: state, =>
            @_containerPosition()
            @_fireStateChange()

      "mouseleave.bootstrapSwitch": (e) ->
        $label.trigger "mouseup.bootstrapSwitch"

  render: ->
    wrapperClass = do =>
      classes = ["#{@_prop('baseClass')}"].concat @_prop('wrapperClass')

      classes.push if @state.state then "#{@_prop('baseClass')}-on" else "#{@_prop('baseClass')}-off"
      classes.push "#{@_prop('baseClass')}-#{@_prop('size')}" if @_prop('size')?
      classes.push "#{@_prop('baseClass')}-disabled" if @state.disabled
      classes.push "#{@_prop('baseClass')}-readonly" if @state.readonly
      classes.push "#{@_prop('baseClass')}-indeterminate" if @state.indeterminate
      classes.push "#{@_prop('baseClass')}-inverse" if @_prop('inverse')
      classes.push "#{@_prop('baseClass')}-id-#{@_prop('id')}" if @_prop('id')
      classes.push "#{@_prop('baseClass')}-animate" if @_prop('animate') and !@state.dragStart and !@state.skipAnimation
      classes.push "#{@_prop('baseClass')}-focused" if @state.focus
      classes.join " "

    onElm = <span ref="on" style={{ width: @state.handleWidth }}
      className={"#{@_prop('baseClass')}-handle-on #{@_prop('baseClass')}-#{@_prop('onColor')}"}>
        { @_prop('onText') }
      </span>
    offElm = <span ref="off" style={{ width: @state.handleWidth }}
      className={"#{@_prop('baseClass')}-handle-off #{@_prop('baseClass')}-#{@_prop('offColor')}"}>
        { @_prop('offText') }
      </span>

    containerWidth = @state.labelWidth+@state.handleWidth*2
    wrapperWidth = @state.labelWidth+@state.handleWidth
    if(containerWidth == wrapperWidth)
      containerWidth = wrapperWidth = "auto"

    return (
      <div className={ wrapperClass } ref="wrapper" style={{width:wrapperWidth}}>
        <div className={ "#{@_prop('baseClass')}-container" } ref="container" style={{width:containerWidth, marginLeft:@state.offset}}>
          {if @_prop('inverse') then offElm else onElm}
          <span className={"#{@_prop('baseClass')}-label"} style={{width:@state.labelWidth}} ref="label">{ @_prop('labelText') }</span>
          {if @_prop('inverse') then onElm else offElm}
          <input type="checkbox" ref="element" />
        </div>
      </div>
    )
