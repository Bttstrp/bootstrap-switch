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
    dragStart: false
    focus: false
    disabled: @_prop('disabled')
    readonly: @_prop('readonly')
    indeterminate: @_prop('indeterminate')

  _prop: (key) ->
    if typeof @props[key] == 'undefined'
      @defaults[key]
    else
      @props[key]

  state: (value) ->
    return @state.state  if typeof value is "undefined"
    return @  if @state.disabled or @state.readonly

    # remove indeterminate
    @_changeState not not value
    @

  toggleState: ->
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
    @state.disabled = not @state.disabled

    $(@refs.element).prop "disabled", @state.disabled
    @

  readonly: (value) ->
    return @state.readonly  if typeof value is "undefined"

    value = not not value
    return @  if value is @state.readonly

    @toggleReadonly()

  toggleReadonly: ->
    @state.readonly = not @state.readonly

    $(@refs.element).prop "readonly", @state.readonly
    @

  handleWidth: (value) ->
    return @state.handleWidth  if typeof value is "undefined"

    @state.handleWidth = value
    @_width()
    @_containerPosition()
    @

  labelWidth: (value) ->
    return @state.labelWidth  if typeof value is "undefined"

    @state.labelWidth = value
    @_width()
    @_containerPosition()
    @

  _fireStateChange: ->
    @props.onChange(@state.state) if typeof @props.onChange != "undefined"

  _changeState: (state) ->
    @setState
      indeterminate: false
      state:state, =>
        @_containerPosition()
        @_fireStateChange()

  _elmTrigger: (e) ->
    elm = $ @refs.element.getDOMNode()
    elm.trigger e

  _handleHandlers: ->
    $(@refs.on.getDOMNode()).on "click.bootstrapSwitch", (event) =>
      event.preventDefault()
      event.stopPropagation()

      @_changeState false
      @_elmTrigger "focus.bootstrapSwitch"

    $(@refs.off.getDOMNode()).on "click.bootstrapSwitch", (event) =>
      event.preventDefault()
      event.stopPropagation()

      @_changeState true
      @_elmTrigger "focus.bootstrapSwitch"

  componentDidMount: ->
    init = =>
      @_width => @_containerPosition null

    if $(@refs.wrapper.getDOMNode()).is ":visible"
      init()
    else
      initInterval = window.setInterval =>
        if $(@refs.wrapper.getDOMNode()).is ":visible"
          init()
          window.clearInterval initInterval
      , 50

    @_handleHandlers()
    @_labelHandlers()
    @_elementHandlers()

  _width: (callback) ->
    $on = $(@refs.on.getDOMNode())
    $off = $(@refs.off.getDOMNode())
    $label = $(@refs.label.getDOMNode())
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

    if @state.indeterminate
      return @setState
        offset: "-#{@state.handleWidth / 2}px"
    else if state
      @setState
        offset: if @_prop('inverse') then values[1] else values[0]
    else
      @setState
        offset: if @_prop('inverse') then values[0] else values[1]

  _elementHandlers: ->
    $element = $ @refs.element.getDOMNode()
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
    $label = $(@refs.label.getDOMNode())
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
          offset: "#{difference}px"

      "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (e) =>
        return  unless @state.dragStart

        e.preventDefault()

        state = not @state.state
        difference = parseInt @state.offset

        if difference
          state = difference > -(@state.handleWidth / 2)
          state = if @_prop('inverse') then not state else state

        @setState
          dragStart: false
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
      classes.push "#{@_prop('baseClass')}-animate" if @_prop('animate') and !@state.dragStart
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
          <span className={"#{@_prop('baseClass')}-label"} ref="label">{ @_prop('labelText') }</span>
          {if @_prop('inverse') then onElm else offElm}
          <input type="checkbox" ref="element" />
        </div>
      </div>
    )
