do ($ = window.jQuery, window) ->
  "use strict"

  class BootstrapSwitch
    name: "bootstrap-switch"

    constructor: (element, options = {}) ->
      @$element = $ element
      @options = $.extend {}, $.fn.bootstrapSwitch.defaults, options,
        state: @$element.is ":checked"
        size: @$element.data "size"
        animate: @$element.data "animate"
        disabled: @$element.is ":disabled"
        readonly: @$element.is "[readonly]"
        onColor: @$element.data "on-color"
        offColor: @$element.data "off-color"
        onText: @$element.data "on-text"
        offText: @$element.data "off-text"
        labelText: @$element.data "label-text"
      @$on = $ "<span>",
        class: "#{@name}-handle-on #{@name}-#{@options.onColor}"
        html: @options.onText
      @$off = $ "<span>",
        class: "#{@name}-handle-off #{@name}-#{@options.offColor}"
        html: @options.offText
      @$label = $ "<label>",
        for: @$element.attr "id"
        html: @options.labelText
      @$wrapper = $ "<div>"

      # add wrapper classes
      @$wrapper.addClass  =>
        classes = ["#{@name}"]

        classes.push if @options.state then "#{@name}-on" else "#{@name}-off"
        classes.push "#{@name}-#{@options.size}" if @options.size?
        classes.push "#{@name}-animate" if @options.animate
        classes.push "#{@name}-disabled" if @options.disabled
        classes.push "#{@name}-readonly" if @options.readonly
        classes.push "#{@name}-id-#{@$element.attr("id")}" if @$element.attr "id"
        classes.join " "

      # set up events
      @$element.on "init", => @options.on.init.call()
      @$element.on "switchChange", => @options.on.switchChange.call()

      # reassign elements after dom modification
      @$div = @$element.wrap($("<div>")).parent()
      @$wrapper = @$div.wrap(@$wrapper).parent()

      # insert handles and label and trigger event
      @$element
      .before(@$on)
      .before(@$label)
      .before(@$off)
      .trigger "init"

      @_elementHandlers()
      @_handleHandlers()
      @_labelHandlers()
      @_formHandler()

      # TODO: @$label.hasClass "label-change-switch" in toggleState

    _constructor: BootstrapSwitch

    state: (value, skip) ->
      return @options.state if typeof value is "undefined"
      return @$element if @options.disabled or @options.readonly

      value = not not value

      @$element.prop("checked", value).trigger "change.bootstrapSwitch", skip
      @$element

    toggleState: (skip) ->
      return @$element if @options.disabled or @options.readonly

      @$element.prop("checked", not @options.state).trigger "change.bootstrapSwitch", skip

    size: (value) ->
      return @options.size if typeof value is "undefined"

      @$wrapper.removeClass "#{@name}-#{@options.size}" if @options.size?
      @$wrapper.addClass "#{@name}-#{value}"
      @options.size = value
      @$element

    animate: (value) ->
      return @options.animate if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@name}-animate")
      @options.animate = value
      @$element

    disabled: (value) ->
      return @options.disabled if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@name}-disabled")
      @$element.prop "disabled", value
      @options.disabled = value
      @$element

    toggleDisabled: ->
      @$element.prop "disabled", not @options.disabled
      @$wrapper.toggleClass "#{@name}-disabled"
      @options.disabled = not @options.disabled
      @$element

    readonly: (value) ->
      return @options.readonly if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("#{@name}-readonly")
      @$element.prop "readonly", value
      @options.readonly = value
      @$element

    toggleReadonly: ->
      @$element.prop "readonly", not @options.readonly
      @$wrapper.toggleClass "#{@name}-readonly"
      @options.readonly = not @options.readonly
      @$element

    onColor: (value) ->
      color = @options.onColor

      return color if typeof value is "undefined"

      @$on.removeClass "#{@name}-#{color}" if color?
      @$on.addClass "#{@name}-#{value}"
      @options.onColor = value
      @$element

    offColor: (value) ->
      color = @options.offColor

      return color if typeof value is "undefined"

      @$off.removeClass "#{@name}-#{color}" if color?
      @$off.addClass "#{@name}-#{value}"
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

    destroy: ->
      $form = @$element.closest "form"

      $form.off("reset.bootstrapSwitch").removeData "bootstrap-switch" if $form.length
      @$div.children().not(@$element).remove()
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
          .removeClass(if checked then "#{@name}-off" else "#{@name}-on")
          .addClass if checked then "#{@name}-on" else "#{@name}-off"

          unless skip
            $("[name='#{@$element.attr('name')}']").not(@$element).prop("checked", false).trigger "change.bootstrapSwitch", true if @$element.is ":radio"
            @$element.trigger "switchChange", el: @$element, value: checked

        "focus.bootstrapSwitch": (e) =>
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          @$wrapper.addClass "#{@name}-focused"

        "blur.bootstrapSwitch": (e) =>
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          @$wrapper.removeClass "#{@name}-focused"

        "keydown.bootstrapSwitch": (e) =>
          return if not e.which or @options.disabled or @options.readonly

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
        "mousemove.bootstrapSwitch": (e) =>
          return unless @drag

          percent = ((e.pageX - @$wrapper.offset().left) / @$wrapper.width()) * 100
          left = 25
          right = 75

          if percent < left
            percent = left
          else if percent > right
            percent = right

          @$div.css "margin-left", "#{percent - right}%"
          @$element.trigger "focus.bootstrapSwitch"

        "mousedown.bootstrapSwitch": (e) =>
          return if @drag or @options.disabled or @options.readonly

          @drag = true
          @$wrapper.removeClass "#{@name}-animate" if @options.animate
          @$element.trigger "focus.bootstrapSwitch"

        "mouseup.bootstrapSwitch": (e) =>
          return unless @drag

          @drag = false
          @$element.prop("checked", (parseInt(@$div.css("margin-left"), 10) > -25)).trigger "change.bootstrapSwitch"
          @$div.css "margin-left", ""
          @$wrapper.addClass "#{@name}-animate" if @options.animate

        "mouseleave.bootstrapSwitch": (e) =>
          @$label.trigger "mouseup.bootstrapSwitch"

        "click.bootstrapSwitch": (e) =>
          e.preventDefault()
          e.stopImmediatePropagation()

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
          .each -> $(@).bootstrapSwitch "state", false
        , 1
      .data "bootstrap-switch", true

  $.fn.bootstrapSwitch = (option, args...) ->
    ret = @
    @each ->
      $this = $ @
      data = $this.data "bootstrap-switch"

      $this.data "bootstrap-switch", data = new BootstrapSwitch @, option if not data
      ret = data[option].apply data, args if typeof option is "string"
    ret

  $.fn.bootstrapSwitch.Constructor = BootstrapSwitch
  $.fn.bootstrapSwitch.defaults =
    state: true
    size: null
    animate: true
    disabled: false
    readonly: false
    onColor: "primary"
    offColor: "default"
    onText: "ON"
    offText: "OFF"
    labelText: "&nbsp;"
    on:
      init: ->
      switchChange: ->

