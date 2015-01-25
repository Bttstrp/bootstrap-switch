$confirm = null

$ ->
  $window = $(window)
  sectionTop = $(".top").outerHeight() + 20
  $createDestroy = $("#switch-create-destroy")

  # initialize highlight.js
  hljs.initHighlightingOnLoad()

  # navigation
  $("a[href*=\"#\"]").on "click", (event) ->
    event.preventDefault()
    $target = $($(this).attr("href").slice("#"))
    $window.scrollTop $target.offset().top - sectionTop  if $target.length


  # initialize all the inputs
  $("input[type=\"checkbox\"], input[type=\"radio\"]").not("[data-switch-no-init]").bootstrapSwitch()
  $("[data-switch-get]").on "click", ->
    type = $(this).data("switch-get")
    alert $("#switch-" + type).bootstrapSwitch(type)

  $("[data-switch-set]").on "click", ->
    type = $(this).data("switch-set")
    $("#switch-" + type).bootstrapSwitch type, $(this).data("switch-value")

  $("[data-switch-toggle]").on "click", ->
    type = $(this).data("switch-toggle")
    $("#switch-" + type).bootstrapSwitch "toggle" + type.charAt(0).toUpperCase() + type.slice(1)

  $("[data-switch-set-value]").on "input", (event) ->
    event.preventDefault()
    type = $(this).data("switch-set-value")
    value = $.trim($(this).val())

    return  if $(this).data("value") is value
    $("#switch-" + type).bootstrapSwitch type, value

  $("[data-switch-create-destroy]").on "click", ->
    isSwitch = $createDestroy.data("bootstrap-switch")

    $createDestroy.bootstrapSwitch (if isSwitch then "destroy" else null)
    $(this).button (if isSwitch then "reset" else "destroy")

  $confirm = $("#confirm").bootstrapSwitch
    size: "large"
    onSwitchChange: (event, state) ->
      event.preventDefault()
      console.log state, event.isDefaultPrevented()
