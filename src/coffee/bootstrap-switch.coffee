(($) ->
  $.fn.bootstrapSwitch = (method) ->
    methods =
      init: ->
        @each ->
          $element = $(@)
          $switchLeft = $("<span>",
            class: "switch-left"
            html: ->
              html = "ON"
              label = $element.data("on-label")
              html = label if label?
              html
          )
          $switchRight = $("<span>",
            class: "switch-right"
            html: ->
              html = "OFF"
              label = $element.data("off-label")
              html = label if label?
              html
          )
          $label = $("<label>",
            for: $element.attr("id")
            html: ->
              html = "&nbsp;"
              icon = $element.data("label-icon")
              label = $element.data("text-label")

              html = "<i class=\"icon " + icon + "\"></i>" if icon?
              html = label if label?

              html
          )
          $div = $("<div>")
          $wrapper = $("<div>",
            class: "has-switch"
            tabindex: 0
          )
          $form = $element.closest("form")
          changeState = ->
            return if $label.hasClass "label-change-switch"

            $label
            .trigger("mousedown")
            .trigger("mouseup")
            .trigger "click"


          # set bootstrap-switch flag
          $element.data "bootstrap-switch", true

          # override default
          $switchLeft.addClass "switch-" + $element.data("on") if $element.data("on")?
          $switchRight.addClass "switch-" + $element.data("off") if $element.data("off")?

          # set animated for div
          $wrapper.data "animated", false
          $wrapper.addClass("switch-animate").data("animated", true) if $element.data("animated") isnt false

          # reassign elements after dom modification
          $div = $element.wrap($div).parent()
          $wrapper = $div.wrap($wrapper).parent()

          # apply size class
          if $element.attr "class"
            $.each ["switch-mini", "switch-small", "switch-large"], (i, cls) ->
              $wrapper.addClass cls if $element.attr("class").indexOf(cls) >= 0

          # insert label and switch parts
          $element.before($switchLeft).before($label).before($switchRight)
          $wrapper.addClass(if $element.is(":checked") then "switch-on" else "switch-off")
          $wrapper.addClass("disabled") if $element.is(":disabled") or $element.is("[readonly]")

          # element handlers
          $element
          .on("keydown", (e) ->
            return unless e.keyCode is 32

            e.stopImmediatePropagation()
            e.preventDefault()

            changeState()
          )
          .on "change", (e, skip) ->
            isChecked = $element.is ":checked"
            state = $wrapper.hasClass "switch-off"

            e.preventDefault()

            $div.css "left", ""
            return unless state is isChecked

            if isChecked
              $wrapper.removeClass("switch-off").addClass "switch-on"
            else
              $wrapper.removeClass("switch-on").addClass "switch-off"

            $wrapper.addClass("switch-animate") if $wrapper.data("animated") isnt false
            return if typeof skip is "boolean" and skip

            $element.trigger "switch-change",
              el: $element
              value: isChecked

          # wrapper handlers
          $wrapper.on "keydown", (e) ->
            return if not e.which or $element.is(":disabled") or $element.is("[readonly]")

            switch e.which
              when 32
                e.preventDefault()
                changeState()
              when 37
                e.preventDefault()
                changeState() if $element.is ":checked"
              when 39
                e.preventDefault()
                changeState() unless $element.is ":checked"

          # switch handlers
          $switchLeft.on "click", -> changeState()
          $switchRight.on "click", -> changeState()

          # label handlers
          $label.on "mousedown touchstart", (e) ->
            moving = false

            e.preventDefault()
            e.stopImmediatePropagation()

            $wrapper.removeClass "switch-animate"
            return $label.unbind "click" if $element.is(":disabled") or $element.is("[readonly]") or $element.hasClass("radio-no-uncheck")

            # other label event handlers
            $label
            .on("mousemove touchmove", (e) ->
              relativeX = (e.pageX or e.originalEvent.targetTouches[0].pageX) - $wrapper.offset().left
              percent = (relativeX / $wrapper.width()) * 100
              left = 25
              right = 75
              moving = true

              if percent < left
                percent = left
              else if percent > right
                percent = right

              $div.css "left", (percent - right) + "%"
            )
            .on("click touchend", (e) ->
              e.stopImmediatePropagation()
              e.preventDefault()

              $label.unbind "mouseleave"

              if moving
                $element.prop "checked", (parseInt($label.parent().css("left"), 10) > -25)
              else
                $element.prop "checked", not $element.is(":checked")

              moving = false
              $element.trigger "change"
            )
            .on("mouseleave", (e) ->
              e.preventDefault()
              e.stopImmediatePropagation()

              $label.unbind("mouseleave mousemove").trigger "mouseup"
              $element.prop("checked", (parseInt($label.parent().css("left"), 10) > -25)).trigger "change"
            )
            .on "mouseup", (e) ->
              e.stopImmediatePropagation()
              e.preventDefault()

              $label.trigger "mouseleave"


          unless $form.data("bootstrap-switch")
            $form.bind("reset", ->
              window.setTimeout(->
                $form.find(".has-switch").each ->
                  $input = $(@).find("input")
                  $input.prop("checked", $input.is(":checked")).trigger "change"

              , 1)
            ).data "bootstrap-switch", true

      setDisabled: (disabled) ->
        $element = $(@)
        $wrapper = $element.parents(".has-switch")

        if disabled
          $wrapper.addClass "disabled"
          $element.prop "disabled", true
        else
          $wrapper.removeClass "disabled"
          $element.prop "disabled", false
        $element

      toggleDisabled: ->
        $element = $(@)

        $element.prop("disabled", not $element.is(":disabled")).parents(".has-switch").toggleClass "disabled"
        $element

      isDisabled: ->
        $(@).is(":disabled")

      setReadOnly: (readonly) ->
        $element = $(@)
        $wrapper = $element.parents(".has-switch")

        if readonly
          $wrapper.addClass "disabled"
          $element.prop "readonly", true
        else
          $wrapper.removeClass "disabled"
          $element.prop "readonly", false
        $element

      toggleReadOnly: ->
        $element = $(@)

        $element.prop("readonly", not $element.is("[readonly]")).parents(".has-switch").toggleClass "disabled"
        $element

      isReadOnly: ->
        $(@).is("[readonly]")

      toggleState: (skip) ->
        $element = $(@)

        $element.prop("checked", not $element.is(":checked")).trigger "change", skip
        $element

      toggleRadioState: (skip) ->
        $element = $(@)

        $element.not(":checked").prop("checked", not $element.is(":checked")).trigger "change", skip
        $element

      toggleRadioStateAllowUncheck: (uncheck, skip) ->
        $element = $(@)

        if uncheck
          $element.not(":checked").trigger "change", skip
        else
          $element.not(":checked").prop("checked", not $element.is(":checked")).trigger "change", skip
        $element

      setState: (value, skip) ->
        $element = $(@)

        $element.prop("checked", value).trigger "change", skip
        $element

      setOnLabel: (value) ->
        $element = $(@)

        $element.siblings(".switch-left").html value
        $element

      setOffLabel: (value) ->
        $element = $(@)

        $element.siblings(".switch-right").html value
        $element

      setOnClass: (value) ->
        $element = $(@)
        $switchLeft = $element.siblings(".switch-left")
        cls = $element.attr("data-on")

        return unless value?

        $switchLeft.removeClass "switch-#{cls}" if cls?
        $switchLeft.addClass "switch-#{value}"
        $element

      setOffClass: (value) ->
        $element = $(@)
        $switchRight = $element.siblings(".switch-right")
        cls = $element.attr("data-off")

        return unless value?

        $switchRight.removeClass "switch-#{cls}" if cls?
        $switchRight.addClass "switch-#{value}"
        $element

      setAnimated: (value) ->
        $element = $(@)
        $wrapper = $element.parents(".has-switch")
        value ?= false

        $wrapper
        .data("animated", value)
        .attr("data-animated", value)[if $wrapper.data("animated") isnt false then "addClass" else "removeClass"]("switch-animate")
        $element

      setSizeClass: (value) ->
        $element = $(@)
        $wrapper = $element.parents(".has-switch")

        $.each ["switch-mini", "switch-small", "switch-large"], (i, cls) ->
          $wrapper[if cls isnt value then "removeClass" else "addClass"](cls)
        $element

      setTextLabel: (value) ->
        $element = $(@)

        $element.siblings("label").html value or "&nbsp"
        $element

      setTextIcon: (value) ->
        $element = $(@)

        $element.siblings("label").html(if value then "<i class=\"icon #{value}\"></i>" else "&nbsp;")
        $element

      state: ->
        $(@).is ":checked"

      destroy: ->
        $element = $(@)
        $div = $element.parent()
        $form = $div.closest("form")

        $div.children().not($element).remove()
        $element.unwrap().unwrap().off "change"
        $form.off("reset").removeData "bootstrap-switch" if $form.length
        $element

    return methods[method].apply(@, Array::slice.call(arguments, 1)) if methods[method]
    return methods.init.apply(@, arguments) if typeof method is "object" or not method
    $.error "Method " + method + " does not exist!"

  @
) jQuery
