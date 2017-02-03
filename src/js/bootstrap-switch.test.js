const $ = window.jQuery
const { describe, beforeEach, afterEach, it, expect } = window

describe('Bootstrap Switch:', function () {
  beforeEach(function () {
    $.support.transition = false
    $.fx.off = true
  })
  afterEach(function () {
    return $('.' + $.fn.bootstrapSwitch.defaults.baseClass).bootstrapSwitch('destroy')
  })

  function createCheckbox () {
    return $('<input>', {
      type: 'checkbox',
      'class': 'switch'
    }).appendTo('body')
  }

  function createRadio () {
    return $('<input>', {
      type: 'radio',
      name: 'name',
      'class': 'switch'
    }).appendTo('body')
  }

  function getOptions ($element) {
    return $element.data('bootstrap-switch').options
  }

  it('should set the default options as element options, except state', function () {
    var $switch
    $switch = createCheckbox().prop('checked', true).bootstrapSwitch()
    expect(getOptions($switch)).toEqual($.fn.bootstrapSwitch.defaults)
  })

  it('should override default options with initialization ones', function () {
    var $switch, $switch2
    $switch = createCheckbox().prop('checked', false).bootstrapSwitch()
    $switch2 = createCheckbox().bootstrapSwitch({
      state: false
    })
    expect(getOptions($switch).state).toBe(false)
    expect(getOptions($switch2).state).toBe(false)
  })

  it('should something', function () {
    var $switch, eventDoc, eventElement
    eventDoc = eventElement = 0
    $switch = createCheckbox().bootstrapSwitch()
    $(document).on('switchChange.bootstrapSwitch', ':checkbox', function (event, state) {
      return eventDoc++
    })
    $(':checkbox').on('switchChange.bootstrapSwitch', function (event, state) {
      return eventElement++
    })
    $switch.click()
    expect(eventElement).toEqual(eventDoc)
    expect(eventElement).toEqual(1)
  })

  describe('The Checkbox Bootstrap Switch', function () {
    it('should conserve its state if onSwitchChange returns false', function () {
      var $indeterminateSwitch, $switch
      $switch = createCheckbox().bootstrapSwitch({
        onSwitchChange: function (e, s) {
          expect(s).toEqual(true)
          return false
        }
      })
      $indeterminateSwitch = createCheckbox().data('indeterminate', true).bootstrapSwitch({
        onSwitchChange: function (e, s) {
          expect(s).toEqual(true)
          return false
        }
      })
      $switch.click()
      $indeterminateSwitch.click()
      expect($switch.bootstrapSwitch('state')).toEqual(false)
      expect($indeterminateSwitch.bootstrapSwitch('state')).toEqual(false)
    })

    it('should change its state if onSwitchChange not returns false', function () {
      var $switch
      $switch = createCheckbox().bootstrapSwitch({
        onSwitchChange: function (e, s) {
          expect(s).toEqual(true)
        }
      })
      $switch.click()
      expect($switch.bootstrapSwitch('state')).toEqual(true)
    })
  })

  describe('The Radio Bootstrap Switch', function () {
    it('should conserve its state if onSwitchChange returns false', function () {
      var $radio1, $radio2, $radio3
      $radio1 = createRadio().prop('checked', true)
      $radio2 = createRadio().prop('checked', false)
      $radio3 = createRadio().prop('checked', false)
      $('[name="name"]').bootstrapSwitch({
        onSwitchChange: function (e, s) {
          expect(s).toEqual(true)
          return false
        }
      })
      $radio2.click()
      expect($radio1.bootstrapSwitch('state')).toEqual(true)
      expect($radio2.bootstrapSwitch('state')).toEqual(false)
      expect($radio3.bootstrapSwitch('state')).toEqual(false)
    })

    it('should change its state if onSwitchChange not returns false', function () {
      var $radio1, $radio2, $radio3
      $radio1 = createRadio().prop('checked', true)
      $radio2 = createRadio().prop('checked', false)
      $radio3 = createRadio().prop('checked', false)
      $('[name="name"]').bootstrapSwitch({
        onSwitchChange: function (e, s) {
          expect(s).toEqual(true)
        }
      })
      $radio2.click()
      expect($radio1.bootstrapSwitch('state')).toEqual(false)
      expect($radio2.bootstrapSwitch('state')).toEqual(true)
      expect($radio3.bootstrapSwitch('state')).toEqual(false)
    })
  })
})
