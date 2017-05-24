const { $, describe, beforeEach, afterEach, it, expect } = window;

describe('Bootstrap Switch:', () => {
  beforeEach(() => {
    $.support.transition = false;
    $.fx.off = true;
  });
  afterEach(() => {
    $(`.${$.fn.bootstrapSwitch.defaults.baseClass}`).bootstrapSwitch('destroy');
  });

  function createCheckbox() {
    return $('<input>', {
      type: 'checkbox',
      class: 'switch',
    }).appendTo('body');
  }

  function createRadio() {
    return $('<input>', {
      type: 'radio',
      name: 'name',
      class: 'switch',
    }).appendTo('body');
  }

  function getOptions($element) {
    return $element.data('bootstrap-switch').options;
  }

  it('should set the default options as element options, except state', () => {
    const $switch = createCheckbox().prop('checked', true).bootstrapSwitch();
    expect(getOptions($switch)).toEqual($.fn.bootstrapSwitch.defaults);
  });

  it('should override default options with initialization ones', () => {
    const $switch = createCheckbox().prop('checked', false).bootstrapSwitch();
    const $switch2 = createCheckbox().bootstrapSwitch({ state: false });
    expect(getOptions($switch).state).toBe(false);
    expect(getOptions($switch2).state).toBe(false);
  });

  it('should something', () => {
    const $switch = createCheckbox().bootstrapSwitch();
    let eventDoc = 0;
    let eventElement = 0;
    $(document).on('switchChange.bootstrapSwitch', ':checkbox', () => { eventDoc += 1; });
    $(':checkbox').on('switchChange.bootstrapSwitch', () => { eventElement += 1; });
    $switch.click();
    expect(eventElement).toEqual(eventDoc);
    expect(eventElement).toEqual(1);
  });

  describe('The Checkbox Bootstrap Switch', () => {
    it('should conserve its state if onSwitchChange returns false', () => {
      const $switch = createCheckbox().bootstrapSwitch({
        onSwitchChange(event, state) {
          expect(state).toEqual(true);
          return false;
        },
      });
      const $indeterminateSwitch = createCheckbox().data('indeterminate', true).bootstrapSwitch({
        onSwitchChange(event, state) {
          expect(state).toEqual(true);
          return false;
        },
      });
      $switch.click();
      $indeterminateSwitch.click();
      expect($switch.bootstrapSwitch('state')).toEqual(false);
      expect($indeterminateSwitch.bootstrapSwitch('state')).toEqual(false);
    });

    it('should change its state if onSwitchChange does not return false', () => {
      const $switch = createCheckbox().bootstrapSwitch({
        onSwitchChange(event, state) {
          expect(state).toEqual(true);
        },
      });
      $switch.click();
      expect($switch.bootstrapSwitch('state')).toEqual(true);
    });
  });

  describe('The Radio Bootstrap Switch', () => {
    it('should conserve its state if onSwitchChange returns false', () => {
      const $radio1 = createRadio().prop('checked', true);
      const $radio2 = createRadio().prop('checked', false);
      const $radio3 = createRadio().prop('checked', false);
      $('[name="name"]').bootstrapSwitch({
        onSwitchChange(e, s) {
          expect(s).toEqual(true);
          return false;
        },
      });
      $radio2.click();
      expect($radio1.bootstrapSwitch('state')).toEqual(true);
      expect($radio2.bootstrapSwitch('state')).toEqual(false);
      expect($radio3.bootstrapSwitch('state')).toEqual(false);
    });

    it('should change its state if onSwitchChange not returns false', () => {
      const $radio1 = createRadio().prop('checked', true);
      const $radio2 = createRadio().prop('checked', false);
      const $radio3 = createRadio().prop('checked', false);
      $('[name="name"]').bootstrapSwitch({
        onSwitchChange(e, s) {
          expect(s).toEqual(true);
        },
      });
      $radio2.click();
      expect($radio1.bootstrapSwitch('state')).toEqual(false);
      expect($radio2.bootstrapSwitch('state')).toEqual(true);
      expect($radio3.bootstrapSwitch('state')).toEqual(false);
    });
  });
});
