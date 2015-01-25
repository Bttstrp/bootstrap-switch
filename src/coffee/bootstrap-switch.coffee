do ($ = window.jQuery, window) ->
  "use strict"

  class BootstrapSwitch
    constructor: (element, options = {}) ->
      @$element = $ element
      @options = $.extend {}, $.fn.bootstrapSwitch.defaults,
        state: @$element.is ":checked"
        size: @$element.data "size"
        animate: @$element.data "animate"
        disabled: @$element.is ":disabled"
        readonly: @$element.is "[readonly]"
        indeterminate: @$element.data "indeterminate"
        inverse: @$element.data "inverse"
        radioAllOff: @$element.data "radio-all-off"
        onColor: @$element.data "on-color"
        offColor: @$element.data "off-color"
        onText: @$element.data "on-text"
        offText: @$element.data "off-text"
        labelText: @$element.data "label-text"
        handleWidth: @$element.data "handle-width"
        labelWidth: @$element.data "label-width"
        baseClass: @$element.data "base-class"
        wrapperClass: @$element.data "wrapper-class"
      , options
      @$wrapper = $ "<div>",
        class: do =>
          classes = ["#{@options.baseClass}"].concat @_getClasses @options.wrapperClass

          classes.push if @options.state then "#{@options.baseClass}-on" else "#{@options.baseClass}-off"
          classes.push "#{@options.baseClass}-#{@options.size}" if @options.size?
          classes.push "#{@options.baseClass}-disabled" if @options.disabled
          classes.push "#{@options.baseClass}-readonly" if @options.readonly
          classes.push "#{@options.baseClass}-indeterminate" if @options.indeterminate
          classes.push "#{@options.baseClass}-inverse" if @options.inverse
          classes.push "#{@options.baseClass}-id-#{@$element.attr("id")}" if @$element.attr "id"
          classes.join " "
      @$container = $ "<div>",
        class: "#{@options.baseClass}-container"
      @$on = $ "<span>",
        html: @options.onText,
        class: "#{@options.baseClass}-handle-on #{@options.baseClass}-#{@options.onColor}"
      @$off = $ "<span>",
        html: @options.offText,
        class: "#{@options.baseClass}-handle-off #{@options.baseClass}-#{@options.offColor}"
      @$label = $ "<span>",
        html: @options.labelText
        class: "#{@options.baseClass}-label"

      # set up events
      @$element.on "init.bootstrapSwitch", => @options.onInit.apply element, arguments
      @$element.on "switchChange.bootstrapSwitch", => @options.onSwitchChange.apply element, arguments

      # reassign elements after dom modification
      @$container = @$element.wrap(@$container).parent()
      @$wrapper = @$container.wrap(@$wrapper).parent()

      # insert handles and label and trigger event
      @$element
      .before(if @options.inverse then @$off else @$on)
      .before(@$label)
      .before(if @options.inverse then @$on else @$off)

      # indeterminate state
      @$element.prop "indeterminate", true  if @options.indeterminate

      # normalize handles width and set container position
      @_init()

      # initialise handlers
      @_elementHandlers()
      @_handleHandlers()
      @_labelHandlers()
      @_formHandler()
      @_externalLabelHandler()

      @$element.trigger "init.bootstrapSwitch"

    _constructor: BootstrapSwitch

    state: (value, skip) ->
      return @options.state  if typeof value is "undefined"
      return @$element  if @options.disabled or @options.readonly
      return @$element  if @options.state and not @options.radioAllOff and @$element.is ":radio"

      # remove indeterminate
      @indeterminate false  if @options.indeterminate
      value = not not value

      @$element.prop("checked", value).trigger "change.bootstrapSwitch", skip
      @$element

    toggleState: (skip) ->
      return @$element  if @options.disabled or @options.readonly

      if @options.indeterminate
        @indeterminate false
        @state true
      else
        @$element.prop("checked", not @options.state).trigger "change.bootstrapSwitch", skip

    size: (value) ->
      return @options.size  if typeof value is "undefined"

      @$wrapper.removeClass "#{@options.baseClass}-#{@options.size}" if @options.size?
      @$wrapper.addClass "#{@options.baseClass}-#{value}" if value
      @_width()
      @_containerPosition()
      @options.size = value
      @$element

    animate: (value) ->
      return @options.animate  if typeof value is "undefined"

      value = not not value
      return @$element  if value is @options.animate

      @toggleAnimate()

    toggleAnimate: ->
      @options.animate = not @options.animate

      @$wrapper.toggleClass "#{@options.baseClass}-animate"
      @$element

    disabled: (value) ->
      return @options.disabled  if typeof value is "undefined"

      value = not not value
      return @$element  if value is @options.disabled

      @toggleDisabled()

    toggleDisabled: ->
      @options.disabled = not @options.disabled

      @$element.prop "disabled", @options.disabled
      @$wrapper.toggleClass "#{@options.baseClass}-disabled"
      @$element

    readonly: (value) ->
      return @options.readonly  if typeof value is "undefined"

      value = not not value
      return @$element  if value is @options.readonly

      @toggleReadonly()

    toggleReadonly: ->
      @options.readonly = not @options.readonly

      @$element.prop "readonly", @options.readonly
      @$wrapper.toggleClass "#{@options.baseClass}-readonly"
      @$element

    indeterminate: (value) ->
      return @options.indeterminate  if typeof value is "undefined"

      value = not not value
      return @$element  if value is @options.indeterminate

      @toggleIndeterminate()

    toggleIndeterminate: ->
      @options.indeterminate = not @options.indeterminate

      @$element.prop "indeterminate", @options.indeterminate
      @$wrapper.toggleClass "#{@options.baseClass}-indeterminate"
      @_containerPosition()
      @$element

    inverse: (value) ->
      return @options.inverse  if typeof value is "undefined"

      value = not not value
      return @$element  if value is @options.inverse

      @toggleInverse()

    toggleInverse: ->
      @$wrapper.toggleClass "#{@options.baseClass}-inverse"
      $on = @$on.clone true
      $off = @$off.clone true
      @$on.replaceWith $off
      @$off.replaceWith $on
      @$on = $off
      @$off = $on
      @options.inverse = not @options.inverse
      @$element

    onColor: (value) ->
      color = @options.onColor

      return color  if typeof value is "undefined"

      @$on.removeClass "#{@options.baseClass}-#{color}" if color?
      @$on.addClass "#{@options.baseClass}-#{value}"
      @options.onColor = value
      @$element

    offColor: (value) ->
      color = @options.offColor

      return color  if typeof value is "undefined"

      @$off.removeClass "#{@options.baseClass}-#{color}" if color?
      @$off.addClass "#{@options.baseClass}-#{value}"
      @options.offColor = value
      @$element

    onText: (value) ->
      return @options.onText  if typeof value is "undefined"

      @$on.html value
      @_width()
      @_containerPosition()
      @options.onText = value
      @$element

    offText: (value) ->
      return @options.offText  if typeof value is "undefined"

      @$off.html value
      @_width()
      @_containerPosition()
      @options.offText = value
      @$element

    labelText: (value) ->
      return @options.labelText  if typeof value is "undefined"

      @$label.html value
      @_width()
      @options.labelText = value
      @$element

    handleWidth: (value) ->
      return @options.handleWidth  if typeof value is "undefined"

      @options.handleWidth = value
      @_width()
      @_containerPosition()
      @$element

    labelWidth: (value) ->
      return @options.labelWidth  if typeof value is "undefined"

      @options.labelWidth = value
      @_width()
      @_containerPosition()
      @$element

    baseClass: (value) ->
      @options.baseClass

    wrapperClass: (value) ->
      return @options.wrapperClass  if typeof value is "undefined"

      value = $.fn.bootstrapSwitch.defaults.wrapperClass unless value

      @$wrapper.removeClass @_getClasses(@options.wrapperClass).join " "
      @$wrapper.addClass @_getClasses(value).join " "
      @options.wrapperClass = value
      @$element

    radioAllOff: (value) ->
      return @options.radioAllOff  if typeof value is "undefined"

      value = not not value
      return @$element  if value is @options.radioAllOff

      @options.radioAllOff = value
      @$element

    onInit: (value) ->
      return @options.onInit  if typeof value is "undefined"

      value = $.fn.bootstrapSwitch.defaults.onInit unless value

      @options.onInit = value
      @$element

    onSwitchChange: (value) ->
      return @options.onSwitchChange  if typeof value is "undefined"

      value = $.fn.bootstrapSwitch.defaults.onSwitchChange unless value

      @options.onSwitchChange = value
      @$element

    destroy: ->
      $form = @$element.closest "form"

      $form.off("reset.bootstrapSwitch").removeData "bootstrap-switch" if $form.length
      @$container.children().not(@$element).remove()
      @$element.unwrap().unwrap().off(".bootstrapSwitch").removeData "bootstrap-switch"
      @$element

    _width: ->
      $handles = @$on.add(@$off)

      # remove width from inline style
      $handles.add(@$label).css("width", "")

      # save handleWidth for further label width calculation check
      handleWidth = if @options.handleWidth is "auto"
      then Math.max @$on.width(), @$off.width()
      else @options.handleWidth

      # set handles width
      $handles.width handleWidth

      # set label width
      @$label.width (index, width) =>
        return @options.labelWidth  if @options.labelWidth isnt "auto"

        if width < handleWidth then handleWidth else width

      # get handle and label widths
      @_handleWidth = @$on.outerWidth()
      @_labelWidth = @$label.outerWidth()

      # set container and wrapper widths
      @$container.width (@_handleWidth * 2) + @_labelWidth
      @$wrapper.width @_handleWidth + @_labelWidth

    _containerPosition: (state = @options.state, callback) ->
      @$container
      .css "margin-left", =>
        values = [0, "-#{@_handleWidth}px"]

        return "-#{@_handleWidth / 2}px"  if @options.indeterminate

        if state
          return  if @options.inverse then values[1] else values[0]
        else
          return  if @options.inverse then values[0] else values[1]

      return  unless callback

      setTimeout ->
        callback()
      , 50

    _init: ->
      init = =>
        @_width()
        @_containerPosition null, =>
          @$wrapper.addClass "#{@options.baseClass}-animate"  if @options.animate

      return init()  if @$wrapper.is ":visible"

      initInterval = window.setInterval =>
        if @$wrapper.is ":visible"
          init()
          window.clearInterval initInterval
      , 50

    _elementHandlers: ->
      @$element.on
        "change.bootstrapSwitch": (e, skip) =>
          e.preventDefault()
          e.stopImmediatePropagation()

          state = @$element.is ":checked"

          @_containerPosition state
          return  if state is @options.state

          @options.state = state
          @$wrapper.toggleClass("#{@options.baseClass}-off").toggleClass "#{@options.baseClass}-on"

          unless skip
            if @$element.is ":radio"
              $("[name='#{@$element.attr('name')}']")
              .not(@$element)
              .prop("checked", false)
              .trigger "change.bootstrapSwitch", true

            @$element.trigger "switchChange.bootstrapSwitch", [state]

        "focus.bootstrapSwitch": (e) =>
          e.preventDefault()
          @$wrapper.addClass "#{@options.baseClass}-focused"

        "blur.bootstrapSwitch": (e) =>
          e.preventDefault()
          @$wrapper.removeClass "#{@options.baseClass}-focused"

        "keydown.bootstrapSwitch": (e) =>
          return  if not e.which or @options.disabled or @options.readonly

          switch e.which
            when 37
              e.preventDefault()
              e.stopImmediatePropagation()

              @state false
            when 39
              e.preventDefault()
              e.stopImmediatePropagation()

              @state true

    _handleHandlers: ->
      @$on.on "click.bootstrapSwitch", (event) =>
        event.preventDefault()
        event.stopPropagation()

        @state false
        @$element.trigger "focus.bootstrapSwitch"

      @$off.on "click.bootstrapSwitch", (event) =>
        event.preventDefault()
        event.stopPropagation()

        @state true
        @$element.trigger "focus.bootstrapSwitch"

    _labelHandlers: ->
      @$label.on
        "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": (e) =>
          return  if @_dragStart or @options.disabled or @options.readonly

          e.preventDefault()
          e.stopPropagation()

          @_dragStart = (e.pageX or e.originalEvent.touches[0].pageX) - parseInt @$container.css("margin-left"), 10
          @$wrapper.removeClass "#{@options.baseClass}-animate"  if @options.animate
          @$element.trigger "focus.bootstrapSwitch"

        "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": (e) =>
          return  unless @_dragStart?

          e.preventDefault()

          difference = (e.pageX or e.originalEvent.touches[0].pageX) - @_dragStart
          return  if difference < -@_handleWidth or difference > 0

          @_dragEnd = difference
          @$container.css "margin-left", "#{@_dragEnd}px"

        "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (e) =>
          return  unless @_dragStart

          e.preventDefault()

          @$wrapper.addClass "#{@options.baseClass}-animate"  if @options.animate
          if @_dragEnd
            state = @_dragEnd > -(@_handleWidth / 2)

            @_dragEnd = false
            @state if @options.inverse then not state else state
          else
            @state not @options.state

          @_dragStart = false

        "mouseleave.bootstrapSwitch": (e) =>
          @$label.trigger "mouseup.bootstrapSwitch"

    _externalLabelHandler: ->
      $externalLabel = @$element.closest("label")

      $externalLabel.on "click", (event) =>
        event.preventDefault()
        event.stopImmediatePropagation()

        # reimplement toggle state on external label only if it is not the target
        @toggleState()  if event.target is $externalLabel[0]

    _formHandler: ->
      $form = @$element.closest "form"

      return  if $form.data "bootstrap-switch"

      $form
      .on "reset.bootstrapSwitch", ->
        window.setTimeout ->
          $form
          .find("input")
          .filter( -> $(@).data "bootstrap-switch")
          .each -> $(@).bootstrapSwitch "state", @checked
        , 1
      .data "bootstrap-switch", true

    _getClasses: (classes) ->
      return ["#{@options.baseClass}-#{classes}"]  unless $.isArray classes

      cls = []
      for c in classes
        cls.push "#{@options.baseClass}-#{c}"
      cls

  $.fn.bootstrapSwitch = (option, args...) ->
    ret = @
    @each ->
      $this = $ @
      data = $this.data "bootstrap-switch"

      $this.data "bootstrap-switch", data = new BootstrapSwitch @, option  unless data
      ret = data[option].apply data, args if typeof option is "string"
    ret

  $.fn.bootstrapSwitch.Constructor = BootstrapSwitch
  $.fn.bootstrapSwitch.defaults =
    state: true
    size: null
    animate: true
    disabled: false
    readonly: false
    indeterminate: false
    inverse: false
    radioAllOff: false
    onColor: "primary"
    offColor: "default"
    onText: "ON"
    offText: "OFF"
    labelText: "&nbsp;"
    handleWidth: "auto"
    labelWidth: "auto"
    baseClass: "bootstrap-switch"
    wrapperClass: "wrapper"
    onInit: ->
    onSwitchChange: ->
