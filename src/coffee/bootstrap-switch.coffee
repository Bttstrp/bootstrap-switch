(($, window) ->
  "use strict"

  class BootstrapSwitch
    constructor: (element, option) ->
      # @options = $.extend {}, @defaults, options
      @$element = $ element
      @$switchLeft = $ "<span>",
        class: =>
          cls = "switch-left"
          color = @$element.data "on-color"

          cls += " switch-#{color}" if color?
          cls
        html: =>
          html = "ON"
          text = @$element.data "on-text"

          html = text if text?
          html
      @$switchRight = $ "<span>",
        class: =>
          cls = "switch-right"
          color = @$element.data "off-color"

          cls += " switch-#{color}" if color?
          cls
        html: =>
          html = "OFF"
          text = @$element.data "off-text"

          html = text if text?
          html
      @$label = $ "<label>",
        for: @$element.attr("id")
        html: =>
          html = "&nbsp;"
          text = @$element.data "label-text"
          html = text if text?
          html
      @$wrapper = $ "<div>",
        class: =>
          classes = ["has-switch"]

          # apply size class
          if @$element.attr("class")
            for cls in ["mini", "small", "large"]
              classes.push "switch-#{cls}" if @$element.hasClass "switch-#{cls}"

          classes.push if @$element.is ":checked" then "switch-on" else "switch-off"
          classes.push "switch-animate" if @$element.data("animate") isnt false
          classes.push "disabled" if @$element.is(":disabled") or @$element.is "[readonly]"
          classes.join " "
        tabindex: 0

      # reassign elements after dom modification
      @$div = @$element.wrap($("<div>")).parent()
      @$wrapper = @$div.wrap(@$wrapper).parent()

      # insert label and switch parts
      @$element.before(@$switchLeft).before(@$label).before @$switchRight

      @_elementHandlers()
      @_wrapperHandlers()
      @_switchesHandlers()
      @_labelHandlers()
      @_form()

      # TODO: @$label.hasClass "label-change-switch" in toggleState

    _constructor: BootstrapSwitch

    state: (value, skip) ->
      return @$element.is ":checked" if typeof value is "undefined"

      @$element.prop("checked", not not value).trigger "change", skip
      @$element

    toggleState: (skip) ->
      @$element.prop("checked", not @$element.is ":checked").trigger "change", skip
      @$element

    ###
    TODO: refactor
    toggleRadioState: (uncheck, skip) ->
      $element = @$element.not ":checked"

      if uncheck
        $element.trigger "change", skip
      else
        $element.prop("checked", not @$element.is ":checked").trigger "change", skip
      @$element
    ###

    disabled: (value) ->
      return @$element.is ":disabled" if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("disabled")
      @$element.prop "disabled", value
      @$element

    toggleDisabled: ->
      @$element.prop("disabled", not @$element.is ":disabled")
      @$wrapper.toggleClass "disabled"
      @$element

    readOnly: (value) ->
      return @$element.is "[readonly]" if typeof value is "undefined"

      if readonly
        @$wrapper.addClass "disabled"
        @$element.prop "readonly", true
      else
        @$wrapper.removeClass "disabled"
        @$element.prop "readonly", false
      @$element

    toggleReadOnly: ->
      @$element
      .prop("readonly", not @$element.is("[readonly]"))
      .parents(".has-switch")
      .toggleClass "disabled"
      @$element

    labelText: (value) ->
      @$element.siblings("label").html value or "&nbsp"
      @$element

    onText: (value) ->
      return @$switchLeft.html() if typeof value is "undefined"

      @$switchLeft.html value
      @$element

    offText: (value) ->
      return @$switchRight.html() if typeof value is "undefined"

      @$switchRight.html value
      @$element

    onColor: (value) ->
      # TODO: add data-on-color in init (defaults)
      color = @$element.data "on-color"

      return color if typeof value is "undefined"

      @$switchLeft.removeClass "switch-#{color}" if color?
      @$switchLeft.addClass "switch-#{value}"
      @$element.data "on-color", value
      @$element

    offColor: (value) ->
      # TODO: add data-on-color in init (defaults)
      color = @$element.data "off-color"

      return color if typeof value is "undefined"

      @$switchRight.removeClass "switch-#{color}" if color?
      @$switchRight.addClass "switch-#{value}"
      @$element.data "off-color", value
      @$element

    animate: (value) ->
      return @$element.data "animate" if typeof value is "undefined"

      value = not not value

      @$wrapper[if value then "addClass" else "removeClass"]("switch-animate")
      @$element.data "animate", value
      @$element

    size: (value) ->
      return @$wrapper.hasClass "switch-#{value}" if typeof value is "undefined"

      for cls in ["mini", "small", "large"]
        @$wrapper[if cls isnt value then "removeClass" else "addClass"]("switch-#{cls}")
      @$element

    destroy: ->
      $form = @$element.closest "form"

      @$div.children().not(@$element).remove()
      @$element.unwrap().unwrap().off "change"

      $form.off("reset").removeData "bootstrap-switch" if $form.length
      @$element

    _elementHandlers: ->
      @$element.on "change", (e, skip) =>
        e.preventDefault()

        isChecked = @$element.is ":checked"
        state = @$wrapper.hasClass "switch-off"

        @$div.css "margin-left", ""
        return unless state is isChecked

        if isChecked
          @$wrapper.removeClass("switch-off").addClass "switch-on"
        else
          @$wrapper.removeClass("switch-on").addClass "switch-off"

        @$wrapper.addClass "switch-animate" if @$element.data("animate") isnt false
        return if typeof skip is "boolean" and skip

        @$element.trigger "switch-change",
          el: @$element
          value: isChecked

    _wrapperHandlers: ->
      @$wrapper.on "keydown", (e) =>
        return if not e.which or @$element.is(":disabled") or @$element.is "[readonly]"

        switch e.which
          when 32
            e.preventDefault()
            @toggleState()
          when 37
            e.preventDefault()
            @toggleState() if @$element.is ":checked"
          when 39
            e.preventDefault()
            @toggleState() unless @$element.is ":checked"

    _switchesHandlers: ->
      @$switchLeft.on "click", => @toggleState()
      @$switchRight.on "click", => @toggleState()

    _labelHandlers: ->
      ###
      @$label.on "click", =>
        e.preventDefault()
        e.stopImmediatePropagation()

        @toggleState()
      ###

      @$label.on "click", (e) =>
        e.preventDefault()
        e.stopImmediatePropagation()

        @$wrapper.removeClass "switch-animate"
        return if @moving # @$element.prop "checked", (parseInt(@$div.css("margin-left"), 10) > -25)

        @$label.on "mousemove", (e) =>
          relativeX = (e.pageX or e.originalEvent.targetTouches[0].pageX) - @$wrapper.offset().left
          percent = (relativeX / @$wrapper.width()) * 100
          left = 25
          right = 75

          @moving = true
          if percent < left
            percent = left
          else if percent > right
            percent = right

          @$div.css "margin-left", "#{percent - right}%"

        @$label.on "mouseup mouseleave", (e) =>
          e.preventDefault()
          e.stopImmediatePropagation()

          # @$label.off("mouseleave mousemove").trigger "mouseup"
          @$element.prop("checked", (parseInt(@$div.css("margin-left"), 10) > -25)).trigger "change"
          @$label.off("mousemove")

        @$label.trigger "mousemove"

      ###
      @$label.on
        "click touchstart": (e) =>
          @moving = false

          e.preventDefault()
          e.stopImmediatePropagation()

          @$wrapper.removeClass "switch-animate"

          if @moving
            @$element.prop "checked", (parseInt(@$div.css("margin-left"), 10) > -25)
          else
            @$element.prop "checked", not @$element.is(":checked")

          @$element.trigger "change"
          # @$label.off "click" if @$element.is(":disabled") or @$element.is("[readonly]") or @$element.hasClass "radio-no-uncheck"
        "mousemove touchmove": (e) =>
          relativeX = (e.pageX or e.originalEvent.targetTouches[0].pageX) - @$wrapper.offset().left
          percent = (relativeX / @$wrapper.width()) * 100
          left = 25
          right = 75

          @moving = true
          if percent < left
            percent = left
          else if percent > right
            percent = right

          @$div.css "margin-left", "#{percent - right}%"
        "click touchend": (e) =>
          e.stopImmediatePropagation()
          e.preventDefault()

          @$label.off "mouseleave"
        mouseleave: (e) =>
          e.preventDefault()
          e.stopImmediatePropagation()

          @$label.off("mouseleave mousemove").trigger "mouseup"
          @$element.prop("checked", (parseInt(@$div.css("margin-left"), 10) > -25)).trigger "change"
        mouseup: (e) =>
          e.stopImmediatePropagation()
          e.preventDefault()

          @$label.trigger "mouseleave"
      ###

    _form: ->
      $form = @$element.closest "form"

      return if $form.data "bootstrap-switch"

      $form
      .data("bootstrap-switch", true)
      .on "reset", ->
        window.setTimeout(->
          $form.find(".has-switch").each ->
            $input = $(@).find("input")
            $input.prop("checked", $input.is(":checked")).trigger "change"
        , 1)

  $.fn.extend bootstrapSwitch: (option, args...) ->
    ret = @
    @each ->
      $this = $(@)
      data = $this.data "bootstrap-switch"

      $this.data "bootstrap-switch", (data = new BootstrapSwitch @, option) if not data
      ret = data[option].apply data, args if typeof option is "string"
    ret
  # $.fn.bootstrapSwitch.Constructor = BootstrapSwitch
) window.jQuery, window
