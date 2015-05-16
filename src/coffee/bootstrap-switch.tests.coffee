describe "Bootstrap Switch:", ->

  beforeEach ->
    $.support.transition = false
    $.fx.off = true

  afterEach ->
    $(".#{$.fn.bootstrapSwitch.defaults.baseClass}").bootstrapSwitch "destroy"

  createCheckbox = ->
    $("<input>",
      type: "checkbox"
      class: "switch"
    ).appendTo "body"

  createRadio = ->
    $("<input>",
      type: "radio"
      name: "name"
      class: "switch"
    ).appendTo "body"

  getOptions = ($element) ->
    $element.data("bootstrap-switch").options

  it "should set the default options as element options, except state", ->
    $switch = createCheckbox().prop("checked", true).bootstrapSwitch()
    expect(getOptions($switch)).toEqual $.fn.bootstrapSwitch.defaults

  it "should override default options with initialization ones", ->
    $switch = createCheckbox().prop("checked", false).bootstrapSwitch()
    $switch2 = createCheckbox().bootstrapSwitch state: false
    expect(getOptions($switch).state).toBe false
    expect(getOptions($switch2).state).toBe false

  it "should something", ->
    eventDoc = eventElement = 0
    $switch = createCheckbox().bootstrapSwitch()

    $(document).on "switchChange.bootstrapSwitch", ":checkbox", (event, state) ->
      eventDoc++

    $(":checkbox").on "switchChange.bootstrapSwitch", (event, state) ->
      eventElement++

    $switch.click()

    expect(eventElement).toEqual eventDoc
    expect(eventElement).toEqual 1

  describe "The Checkbox Bootstrap Switch", ->
    it "should conserve its state if onSwitchChange returns false", ->
      $switch = createCheckbox().bootstrapSwitch
        onSwitchChange:(e, s) ->
          expect(s).toEqual true
          false
      $indeterminateSwitch = createCheckbox().data("indeterminate", true).bootstrapSwitch
        onSwitchChange:(e, s) ->
          expect(s).toEqual true
          false

      $switch.click()
      $indeterminateSwitch.click()

      expect($switch.bootstrapSwitch('state')).toEqual false
      expect($indeterminateSwitch.bootstrapSwitch('state')).toEqual false

    it "should change its state if onSwitchChange not returns false", ->
      $switch = createCheckbox().bootstrapSwitch
        onSwitchChange:(e, s) -> expect(s).toEqual true

      $switch.click()

      expect($switch.bootstrapSwitch('state')).toEqual true

  describe "The Radio Bootstrap Switch", ->
    it "should conserve its state if onSwitchChange returns false", ->
      $radio1 = createRadio().prop("checked", true)
      $radio2 = createRadio().prop("checked", false)
      $radio3 = createRadio().prop("checked", false)

      $('[name="name"]').bootstrapSwitch
        onSwitchChange:(e, s) ->
          expect(s).toEqual true
          false

      $radio2.click()

      expect($radio1.bootstrapSwitch('state')).toEqual true
      expect($radio2.bootstrapSwitch('state')).toEqual false
      expect($radio3.bootstrapSwitch('state')).toEqual false

    it "should change its state if onSwitchChange not returns false", ->
      $radio1 = createRadio().prop("checked", true)
      $radio2 = createRadio().prop("checked", false)
      $radio3 = createRadio().prop("checked", false)

      $('[name="name"]').bootstrapSwitch
        onSwitchChange:(e, s) -> expect(s).toEqual true

      $radio2.click()

      expect($radio1.bootstrapSwitch('state')).toEqual false
      expect($radio2.bootstrapSwitch('state')).toEqual true
      expect($radio3.bootstrapSwitch('state')).toEqual false
