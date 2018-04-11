import './bootstrap-switch';

const { $ } = global;

describe('Bootstrap Switch:', () => {
  beforeEach(() => {
    $.support.transition = false;
    $.fx.off = true;
  });

  afterEach(() => {
    $(`.${$.fn.bootstrapSwitch.defaults.baseClass}`).bootstrapSwitch('destroy');
  });

  const createCheckbox = () =>
    $('<input>', {
      type: 'checkbox',
      class: 'switch',
    }).appendTo('body');

  const createRadio = () =>
    $('<input>', {
      type: 'radio',
      name: 'name',
      class: 'switch',
    }).appendTo('body');

  const getOptions = $element => $element.data('bootstrap-switch').options;

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

  it('should trigger the same events on element and document', () => {
    const $switch = createCheckbox().bootstrapSwitch();
    let doc = 0;
    let element = 0;
    $(document).on('switchChange.bootstrapSwitch', ':checkbox', () => { doc += 1; });
    $switch.on('switchChange.bootstrapSwitch', () => { element += 1; });
    $switch.bootstrapSwitch('state', true);
    expect(element).toBe(doc);
    expect(element).toBe(1);
  });

  describe('Checkbox', () => {
    it('should retain state if `onSwitchChange` returns false', () => {
      let shadowState = null;
      const $switch = createCheckbox().bootstrapSwitch({
        state: false,
        onSwitchChange(event, state) {
          shadowState = state;
          return false;
        },
      });
      $switch.bootstrapSwitch('state', true);
      expect(shadowState).toBe(true);
      expect($switch.bootstrapSwitch('state')).toBe(false);
    });

    it('should retain state if `onSwitchChange` returns false when intederminate is true', () => {
      let shadowState;
      const $indeterminate = createCheckbox().bootstrapSwitch({
        state: false,
        onSwitchChange(event, state) {
          shadowState = state;
          return false;
        },
      });
      $indeterminate.data('indeterminate', true);
      $indeterminate.bootstrapSwitch('state', true);
      expect(shadowState).toBe(true);
      expect($indeterminate.bootstrapSwitch('state')).toBe(false);
    });

    it('should change state if `onSwitchChange` does not return false', () => {
      let shadowState = null;
      const $switch = createCheckbox().bootstrapSwitch({
        onSwitchChange: (event, state) => {
          shadowState = state;
        },
      });
      $switch.bootstrapSwitch('state', true);
      expect(shadowState).toBe(true);
      expect($switch.bootstrapSwitch('state')).toBe(true);
    });
  });

  describe('Radio', () => {
    it('should retain state if `onSwitchChange` returns false', () => {
      const $radio1 = createRadio().prop('checked', true);
      const $radio2 = createRadio().prop('checked', false);
      const $radio3 = createRadio().prop('checked', false);
      let shadowState = null;
      $radio1.add($radio2).add($radio3).bootstrapSwitch({
        onSwitchChange(event, state) {
          shadowState = state;
          return false;
        },
      });
      $radio2.bootstrapSwitch('state', true);
      expect(shadowState).toBe(true);
      expect($radio1.bootstrapSwitch('state')).toBe(true);
      expect($radio2.bootstrapSwitch('state')).toBe(false);
      expect($radio3.bootstrapSwitch('state')).toBe(false);
    });

    it('should change its state if `onSwitchChange` does not return false', () => {
      const $radio1 = createRadio().prop('checked', true);
      const $radio2 = createRadio().prop('checked', false);
      const $radio3 = createRadio().prop('checked', false);
      let shadowState = null;
      $radio2.bootstrapSwitch({
        onSwitchChange(event, state) {
          shadowState = state;
          return false;
        },
      });
      $radio2.click();
      expect(shadowState).toBe(true);
      expect($radio1.bootstrapSwitch('state')).toBe(false);
      expect($radio2.bootstrapSwitch('state')).toBe(true);
      expect($radio3.bootstrapSwitch('state')).toBe(false);
    });
  });
});
