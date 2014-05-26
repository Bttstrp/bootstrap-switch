do ($ = window.jQuery, window) ->
  "use strict"

  class BootstrapSwitch
    constructor: (element, options = {}) ->
      @$element = $ element
      @options = $.extend {}, $.fn.bootstrapSwitch.defaults, options,
        state: @$element.is ":checked"
        size: @$element.data "size"
        animate: @$element.data "animate"
        disabled: @$element.is ":disabled"
        readonly: @$element.is "[readonly]"
        indeterminate: @$element.data "indeterminate"
        onColor: @$element.data "on-color"
        offColor: @$element.data "off-color"
        onText: @$element.data "on-text"
        offText: @$element.data "off-text"
        labelText: @$element.data "label-text"
        baseClass: @$element.data "base-class"
        wrapperClass: @$element.data "wrapper-class"
      @$wrapper = $ "<div>",
        class: do =>
          classes = ["#{@options.baseClass}"].concat @_getClasses @options.wrapperClass

          classes.push if @options.state then "#{@options.baseClass}-on" else "#{@options.baseClass}-off"
          classes.push "#{@options.baseClass}-#{@options.size}" if @options.size?
          classes.push "#{@options.baseClass}-animate" if @options.animate
          classes.push "#{@options.baseClass}-disabled" if @options.disabled
          classes.push "#{@options.baseClass}-readonly" if @options.readonly
          classes.push "#{@options.baseClass}-indeterminate" if @options.indeterminate
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
      @$label = $ "<label>",
        for: @$element.attr "id"
        html: @options.labelText
        class: "#{@options.baseClass}-label"

      # indeterminate state
      @$element.prop "indeterminate", true if @options.indeterminate

      # set up events
      @$element.on "init.bootstrapSwitch", => @options.onInit.apply element, arguments
      @$element.on "switchChange.bootstrapSwitch", => @options.onSwitchChange.apply element, arguments

      # reassign elements after dom modification
      @$container = @$element.wrap(@$container).parent()
      @$wrapper = @$container.wrap(@$wrapper).parent()

      # insert handles and label and trigger event
      @$element
      .before(@$on)
      .before(@$label)
      .before(@$off)
      .trigger "init.bootstrapSwitch"

      @_elementHandlers()
      @_handleHandlers()
      @_labelHandlers()
      @_formHandler()

      # TODO: @$label.hasClass "label-change-switch" in toggleState

    _constructor: BootstrapSwitch

    state: (value, skip) ->
      return @options.state if typeof value is "undefined"
      return @$element if @options.disabled or @options.readonly or @options.indeterminate

      value = not not value

      @$element.prop("checked", value).trigger "change.bootstrapSwitch", skip
      @$element

    toggleState: (skip) ->
      return @$element if @options.disabled or @options.readonly or @options.indeterminate

      @$element.prop("checked", not @options.state).trigger "change.bootstrapSwitch", skip

    size: (value) ->
      return @options.size if typeof value is "undefined"

      @$wrapper.removeClass "#{@options.baseClass}-#{@options.size}" if @options.size?
      @$wrapper.addClass "#{@options.baseClass}-#{value}" if value
      @options.size = value
      @$element

    animate: (value) ->
      return @options.animate if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@options.baseClass}-animate")
      @options.animate = value
      @$element

    disabled: (value) ->
      return @options.disabled if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@options.baseClass}-disabled")
      @$element.prop "disabled", value
      @options.disabled = value
      @$element

    toggleDisabled: ->
      @$element.prop "disabled", not @options.disabled
      @$wrapper.toggleClass "#{@options.baseClass}-disabled"
      @options.disabled = not @options.disabled
      @$element

    readonly: (value) ->
      return @options.readonly if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@options.baseClass}-readonly")
      @$element.prop "readonly", value
      @options.readonly = value
      @$element

    toggleReadonly: ->
      @$element.prop "readonly", not @options.readonly
      @$wrapper.toggleClass "#{@options.baseClass}-readonly"
      @options.readonly = not @options.readonly
      @$element

    indeterminate: (value) ->
      return @options.indeterminate if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@options.baseClass}-indeterminate")
      @$element.prop "indeterminate", value
      @options.indeterminate = value
      @$element

    toggleIndeterminate: ->
      @$element.prop "indeterminate", not @options.indeterminate
      @$wrapper.toggleClass "#{@options.baseClass}-indeterminate"
      @options.indeterminate = not @options.indeterminate
      @$element

    onColor: (value) ->
      color = @options.onColor

      return color if typeof value is "undefined"

      @$on.removeClass "#{@options.baseClass}-#{color}" if color?
      @$on.addClass "#{@options.baseClass}-#{value}"
      @options.onColor = value
      @$element

    offColor: (value) ->
      color = @options.offColor

      return color if typeof value is "undefined"

      @$off.removeClass "#{@options.baseClass}-#{color}" if color?
      @$off.addClass "#{@options.baseClass}-#{value}"
      @options.offColor = value
      @$element

    onText: (value) ->
      return @options.onText if typeof value is "undefined"

      @$on.html value
      @options.onText = value
      @$element

    offText: (value) ->
      return @options.offText if typeof value is "undefined"

      @$off.html value
      @options.offText = value
      @$element

    labelText: (value) ->
      return @options.labelText if typeof value is "undefined"

      @$label.html value
      @options.labelText = value
      @$element

    baseClass: (value) ->
      @options.baseClass

    wrapperClass: (value) ->
      return @options.wrapperClass if typeof value is "undefined"

      value = $.fn.bootstrapSwitch.defaults.wrapperClass unless value

      @$wrapper.removeClass @_getClasses(@options.wrapperClass).join " "
      @$wrapper.addClass @_getClasses(value).join " "
      @options.wrapperClass = value
      @$element

    onInit: (value) ->
      return @options.onInit if typeof value is "undefined"

      value = $.fn.bootstrapSwitch.defaults.onInit unless value

      @options.onInit = value
      @$element

    onSwitchChange: (value) ->
      return @options.onSwitchChange if typeof value is "undefined"

      value = $.fn.bootstrapSwitch.defaults.onSwitchChange unless value

      @options.onSwitchChange = value
      @$element

    destroy: ->
      $form = @$element.closest "form"

      $form.off("reset.bootstrapSwitch").removeData "bootstrap-switch" if $form.length
      @$container.children().not(@$element).remove()
      @$element.unwrap().unwrap().off(".bootstrapSwitch").removeData "bootstrap-switch"
      @$element

    _elementHandlers: ->
      @$element.on
        "change.bootstrapSwitch": (e, skip) =>
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          checked = @$element.is ":checked"

          return if checked is @options.state

          @options.state = checked
          @$wrapper
          .removeClass(if checked then "#{@options.baseClass}-off" else "#{@options.baseClass}-on")
          .addClass if checked then "#{@options.baseClass}-on" else "#{@options.baseClass}-off"

          unless skip
            if @$element.is ":radio"
              $("[name='#{@$element.attr('name')}']")
              .not(@$element)
              .prop("checked", false)
              .trigger "change.bootstrapSwitch", true
            @$element.trigger "switchChange.bootstrapSwitch", [checked]

        "focus.bootstrapSwitch": (e) =>
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          @$wrapper.addClass "#{@options.baseClass}-focused"

        "blur.bootstrapSwitch": (e) =>
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          @$wrapper.removeClass "#{@options.baseClass}-focused"

        "keydown.bootstrapSwitch": (e) =>
          return if not e.which or @options.disabled or @options.readonly or @options.indeterminate

          switch e.which
            when 32
              e.preventDefault()
              e.stopPropagation()
              e.stopImmediatePropagation()

              @toggleState()
            when 37
              e.preventDefault()
              e.stopPropagation()
              e.stopImmediatePropagation()

              @state false
            when 39
              e.preventDefault()
              e.stopPropagation()
              e.stopImmediatePropagation()

              @state true

    _handleHandlers: ->
      @$on.on "click.bootstrapSwitch", (e) =>
        @state false
        @$element.trigger "focus.bootstrapSwitch"

      @$off.on "click.bootstrapSwitch", (e) =>
        @state true
        @$element.trigger "focus.bootstrapSwitch"

    _labelHandlers: ->
      @$label.on
        "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": (e) =>
          return unless @drag

          e.preventDefault()

          pageX = e.pageX or e.originalEvent.touches[0].pageX
          percent = ((pageX - @$wrapper.offset().left) / @$wrapper.width()) * 100
          left = 25
          right = 75

          if percent < left
            percent = left
          else if percent > right
            percent = right

          @$container.css "margin-left", "#{percent - right}%"
          @$element.trigger "focus.bootstrapSwitch"

        "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": (e) =>
          return if @drag or @options.disabled or @options.readonly or @options.indeterminate

          e.preventDefault()

          @drag = true
          @$wrapper.removeClass "#{@options.baseClass}-animate" if @options.animate
          @$element.trigger "focus.bootstrapSwitch"

        "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (e) =>
          return unless @drag

          e.preventDefault()

          @drag = false
          @$element
          .prop("checked", parseInt(@$container.css("margin-left"), 10) > -(@$container.width() / 6))
          .trigger "change.bootstrapSwitch"
          @$container.css "margin-left", ""
          @$wrapper.addClass "#{@options.baseClass}-animate" if @options.animate

        "mouseleave.bootstrapSwitch": (e) =>
          @$label.trigger "mouseup.bootstrapSwitch"

        "click.bootstrapSwitch": (e) =>
          @toggleState()
          @$element.trigger "focus.bootstrapSwitch"

    _formHandler: ->
      $form = @$element.closest "form"

      return if $form.data "bootstrap-switch"

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
      return ["#{@options.baseClass}-#{classes}"] unless $.isArray classes

      cls = []
      for c in classes
        cls.push "#{@options.baseClass}-#{c}"
      cls

  $.fn.bootstrapSwitch = (option, args...) ->
    ret = @
    @each ->
      $this = $ @
      data = $this.data "bootstrap-switch"

      $this.data "bootstrap-switch", data = new BootstrapSwitch @, option unless data
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
    onColor: "primary"
    offColor: "default"
    onText: "ON"
    offText: "OFF"
    labelText: "&nbsp;"
    baseClass: "bootstrap-switch"
    wrapperClass: "wrapper"
    onInit: ->
    onSwitchChange: ->

