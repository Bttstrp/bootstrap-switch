describe "Bootstrap Switch", ->

  beforeEach ->
    $.support.transition = false
    $.fx.off = true

  afterEach ->
    $(".#{$.fn.bootstrapSwitch.defaults.baseClass}").bootstrapSwitch "destroy"

  createElement = ->
    $("<input>",
      type: "checkbox"
      class: "switch"
    ).appendTo "body"

  getOptions = ($element) ->
    $element.data("bootstrap-switch").options

  it "should set the default options as element options, except state", ->
    $switch = createElement().prop("checked", true).bootstrapSwitch()
    expect(getOptions($switch)).toEqual $.fn.bootstrapSwitch.defaults

  it "should override default options with initialization ones", ->
    $switch = createElement().prop("checked", false).bootstrapSwitch()
    $switch2 = createElement().bootstrapSwitch state: false
    expect(getOptions($switch).state).toBe false
    expect(getOptions($switch2).state).toBe false
