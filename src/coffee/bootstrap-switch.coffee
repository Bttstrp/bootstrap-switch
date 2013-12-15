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
              html = label if typeof label isnt "undefined"
              html
          )
          $switchRight = $("<span>",
            class: "switch-right"
            html: ->
              html = "OFF"
              label = $element.data("off-label")
              html = label if typeof label isnt "undefined"
              html
          )
          $label = $("<label>",
            for: $element.attr("id")
            html: ->
              html = "&nbsp;"
              icon = $element.data("label-icon")
              label = $element.data("text-label")

              html = "<i class=\"icon " + icon + "\"></i>" if typeof icon isnt "undefined"
              html = label if typeof label isnt "undefined"

              html
          )
          $div = $("<div>")
          $wrapper = $("<div>", class: "has-switch")
          $form = $element.closest("form")
          changeStatus = ->
            $label.trigger("mousedown").trigger("mouseup").trigger "click"  unless $label.hasClass("label-change-switch")

          # set bootstrap-switch flag
          $element.data "bootstrap-switch", true

          # apply class
          if $element.attr("class")
            $.each ["switch-mini", "switch-small", "switch-large"], (i, cls) ->
              if $element.attr("class").indexOf(cls) >= 0
                $switchLeft.addClass cls
                $label.addClass cls
                $switchRight.addClass cls

          # override default
          $switchLeft.addClass "switch-" + $element.data("on") if $element.data("on") isnt `undefined`
          $switchRight.addClass "switch-" + $element.data("off") if $element.data("off") isnt `undefined`

          # set animated for div
          $div.data("animated", false)
          $div.addClass("switch-animate").data("animated", true) if $element.data("animated") isnt false

          # reassign elements after dom modification
          $div = $element.wrap($div).parent()
          $wrapper = $div.wrap($wrapper).parent()

          # insert label and switch parts
          $element.before($switchLeft).before($label).before($switchRight)
          $div.addClass(if $element.is(":checked") then "switch-on" else "switch-off")
          $wrapper.addClass("deactivate") if $element.is(":disabled")

          # element handlers
          $element
          .on("keydown", (e) ->
            return unless e.keyCode is 32

            e.stopImmediatePropagation()
            e.preventDefault()
            changeStatus $(e.target).find("span:first")
          ).on "change", (e, skip) ->
            isChecked = $element.is(":checked")
            state = $div.is(".switch-off")

            e.preventDefault()

            $div.css("left", "")
            return unless state is isChecked

            if isChecked
              $div.removeClass("switch-off").addClass "switch-on"
            else
              $div.removeClass("switch-on").addClass "switch-off"

            $div.addClass "switch-animate"  if $div.data("animated") isnt false
            return if typeof skip is "boolean" and skip

            $element.trigger "switch-change",
              el: $element
              value: isChecked

          # switch handlers
          $switchLeft.on "click", -> changeStatus()
          $switchRight.on "click", -> changeStatus()

          # label handlers
          $label.on "mousedown touchstart", (e) ->
            moving = false

            e.preventDefault()
            e.stopImmediatePropagation()

            $div.removeClass "switch-animate"
            return $label.unbind "click" if $element.is(":disabled") or $element.hasClass("radio-no-uncheck")

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

      toggleActivation: ->
        $element = $(@)

        $element.prop("disabled", not $element.is(":disabled")).parents(".has-switch").toggleClass "deactivate"
        $element

      isActive: ->
        not $(@).is(":disabled")

      setActive: (active) ->
        $element = $(@)
        $wrapper = $element.parents(".has-switch")

        if active
          $wrapper.removeClass "deactivate"
          $element.prop "disabled", false
        else
          $wrapper.addClass "deactivate"
          $element.prop "disabled", true
        $element

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

        return if typeof value is "undefined"

        $switchLeft.removeClass "switch-#{cls}" if typeof cls isnt "undefined"
        $switchLeft.addClass "switch-#{value}"
        $element

      setOffClass: (value) ->
        $element = $(@)
        $switchRight = $element.siblings(".switch-right")
        cls = $element.attr("data-off")

        return if typeof value is "undefined"

        $switchRight.removeClass "switch-#{cls}" if typeof cls isnt "undefined"
        $switchRight.addClass "switch-#{value}"
        $element

      setAnimated: (value) ->
        $element = $(@)
        $div = $element.parent()
        value ?= false

        $div
        .data("animated", value)
        .attr("data-animated", value)[if $div.data("animated") isnt false then "addClass" else "removeClass"]("switch-animate")
        $element

      setSizeClass: (value) ->
        $element = $(@)
        $switchLeft = $element.siblings(".switch-left")
        $label = $element.siblings("label")
        $switchRight = $element.siblings(".switch-right")

        $.each ["switch-mini", "switch-small", "switch-large"], (i, cls) ->
          if cls isnt value
            $switchLeft.removeClass cls
            $label.removeClass cls
            $switchRight.removeClass cls
          else
            $switchLeft.addClass cls
            $label.addClass cls
            $switchRight.addClass cls

        $element

      setTextLabel: (value) ->
        $element = $(@)

        $element.siblings("label").html value or "&nbsp"
        $element

      setTextIcon: (value) ->
        $element = $(@)

        $element.siblings("label").html(if value then "<i class=\"icon #{value}\"></i>" else "&nbsp;")
        $element

      status: ->
        $(@).is ":checked"

      destroy: ->
        $element = $(@)
        $div = $element.parent()
        $form = $div.closest("form")

        $div.children().not($element).remove()
        $element.unwrap().unwrap().unbind "change"
        $form.unbind("reset").removeData "bootstrapSwitch" if $form.length
        $element

    return methods[method].apply(@, Array::slice.call(arguments, 1)) if methods[method]
    return methods.init.apply(@, arguments) if typeof method is "object" or not method
    $.error "Method " + method + " does not exist!"

  @
) jQuery