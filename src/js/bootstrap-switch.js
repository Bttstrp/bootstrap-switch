import jquery from 'jquery';

const $ = jquery || window.jQuery || window.$;

function getClasses(options, id) {
  const { state, size, disabled, readonly, indeterminate, inverse } = options;
  return [
    state ? 'on' : 'off',
    size,
    disabled ? 'disabled' : undefined,
    readonly ? 'readonly' : undefined,
    indeterminate ? 'indeterminate' : undefined,
    inverse ? 'inverse' : undefined,
    id ? `id-${id}` : undefined,
  ].filter(v => v == null);
}


function prvgetElementOptions() {
  return {
    state: this.$element.is(':checked'),
    size: this.$element.data('size'),
    animate: this.$element.data('animate'),
    disabled: this.$element.is(':disabled'),
    readonly: this.$element.is('[readonly]'),
    indeterminate: this.$element.data('indeterminate'),
    inverse: this.$element.data('inverse'),
    radioAllOff: this.$element.data('radio-all-off'),
    onColor: this.$element.data('on-color'),
    offColor: this.$element.data('off-color'),
    onText: this.$element.data('on-text'),
    offText: this.$element.data('off-text'),
    labelText: this.$element.data('label-text'),
    handleWidth: this.$element.data('handle-width'),
    labelWidth: this.$element.data('label-width'),
    baseClass: this.$element.data('base-class'),
    wrapperClass: this.$element.data('wrapper-class'),
  };
}

function prvwidth() {
  const $handles = this.$on
    .add(this.$off)
    .add(this.$label)
    .css('width', '');
  const handleWidth = this.options.handleWidth === 'auto'
    ? Math.round(Math.max(this.$on.width(), this.$off.width()))
    : this.options.handleWidth;
  $handles.width(handleWidth);
  this.$label.width((index, width) => {
    if (this.options.labelWidth !== 'auto') { return this.options.labelWidth; }
    if (width < handleWidth) { return handleWidth; }
    return width;
  });
  this.privateHandleWidth = this.$on.outerWidth();
  this.privateLabelWidth = this.$label.outerWidth();
  this.$container.width((this.privateHandleWidth * 2) + this.privateLabelWidth);
  return this.$wrapper.width(this.privateHandleWidth + this.privateLabelWidth);
}

function prvcontainerPosition(state = this.options.state) {
  this.$container.css('margin-left', () => {
    const values = [0, `-${this.privateHandleWidth}px`];
    if (this.options.indeterminate) {
      return `-${this.privateHandleWidth / 2}px`;
    }
    if (state) {
      if (this.options.inverse) {
        return values[1];
      }
      return values[0];
    }
    if (this.options.inverse) {
      return values[0];
    }
    return values[1];
  });
}

function prvgetClass(name) {
  return `${this.options.baseClass}-${name}`;
}

function prvinit() {
  const init = () => {
    this.setPrevOptions();
    this::prvwidth();
    this::prvcontainerPosition();
    setTimeout(() => (
      this.options.animate &&
      this.$wrapper.addClass(this::prvgetClass('animate'),
    )), 50);
  };
  if (this.$wrapper.is(':visible')) {
    init();
    return;
  }
  const initInterval = window.setInterval(
    () => (
      this.$wrapper.is(':visible') &&
      (init() || true) &&
      window.clearInterval(initInterval)
    ), 50);
}

function prvelementHandlers() {
  return this.$element.on({
    'setPreviousOptions.bootstrapSwitch': () => this.setPrevOptions(),

    'previousState.bootstrapSwitch': () => {
      this.options = this.prevOptions;
      if (this.options.indeterminate) {
        this.$wrapper.addClass(this::prvgetClass('indeterminate'));
      }
      this.$element
        .prop('checked', this.options.state)
        .trigger('change.bootstrapSwitch', true);
    },

    'change.bootstrapSwitch': (event, skip) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const state = this.$element.is(':checked');
      this::prvcontainerPosition(state);
      if (state === this.options.state) {
        return;
      }
      this.options.state = state;
      this.$wrapper
        .toggleClass(this::prvgetClass('off'))
        .toggleClass(this::prvgetClass('on'));
      if (!skip) {
        if (this.$element.is(':radio')) {
          $(`[name="${this.$element.attr('name')}"]`)
            .not(this.$element)
            .prop('checked', false)
            .trigger('change.bootstrapSwitch', true);
        }
        this.$element.trigger('switchChange.bootstrapSwitch', [state]);
      }
    },

    'focus.bootstrapSwitch': (event) => {
      event.preventDefault();
      this.$wrapper.addClass(this::prvgetClass('focused'));
    },

    'blur.bootstrapSwitch': (event) => {
      event.preventDefault();
      this.$wrapper.removeClass(this::prvgetClass('focused'));
    },

    'keydown.bootstrapSwitch': (event) => {
      if (!event.which || this.options.disabled || this.options.readonly) {
        return;
      }
      if (event.which === 37 || event.which === 39) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.state(event.which === 39);
      }
    },
  });
}

function prvhandleHandlers() {
  this.$on.on('click.bootstrapSwitch', (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.state(false);
    return this.$element.trigger('focus.bootstrapSwitch');
  });
  return this.$off.on('click.bootstrapSwitch', (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.state(true);
    return this.$element.trigger('focus.bootstrapSwitch');
  });
}

function prvlabelHandlers() {
  let dragStart;
  let dragEnd;
  const handlers = {
    click(event) { event.stopPropagation(); },

    'mousedown.bootstrapSwitch touchstart.bootstrapSwitch': (event) => {
      if (dragStart || this.options.disabled || this.options.readonly) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      dragStart = (event.pageX || event.originalEvent.touches[0].pageX) - parseInt(this.$container.css('margin-left'), 10);
      if (this.options.animate) {
        this.$wrapper.removeClass(this::prvgetClass('animate'));
      }
      this.$element.trigger('focus.bootstrapSwitch');
    },

    'mousemove.bootstrapSwitch touchmove.bootstrapSwitch': (event) => {
      if (dragStart == null) { return; }
      const difference = (event.pageX || event.originalEvent.touches[0].pageX) - dragStart;
      event.preventDefault();
      if (difference < -this.privateHandleWidth || difference > 0) { return; }
      dragEnd = difference;
      this.$container.css('margin-left', `${dragEnd}px`);
    },

    'mouseup.bootstrapSwitch touchend.bootstrapSwitch': (event) => {
      if (!dragStart) { return; }
      event.preventDefault();
      if (this.options.animate) {
        this.$wrapper.addClass(this::prvgetClass('animate'));
      }
      if (dragEnd) {
        const state = dragEnd > -(this.privateHandleWidth / 2);
        dragEnd = false;
        this.state(this.options.inverse ? !state : state);
      } else {
        this.state(!this.options.state);
      }
      dragStart = false;
    },

    'mouseleave.bootstrapSwitch': () => {
      this.$label.trigger('mouseup.bootstrapSwitch');
    },
  };
  this.$label.on(handlers);
}

function prvexternalLabelHandler() {
  const $externalLabel = this.$element.closest('label');
  $externalLabel.on('click', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.target === $externalLabel[0]) {
      this.toggleState();
    }
  });
}

function prvformHandler() {
  function isBootstrapSwitch() {
    return $(this).data('bootstrap-switch');
  }

  function performReset() {
    return $(this).bootstrapSwitch('state', this.checked);
  }

  const $form = this.$element.closest('form');
  if ($form.data('bootstrap-switch')) {
    return;
  }
  $form
    .on('reset.bootstrapSwitch', () => {
      window.setTimeout(() => {
        $form.find('input')
          .filter(isBootstrapSwitch)
          .each(performReset);
      }, 1);
    })
    .data('bootstrap-switch', true);
}

function prvgetClasses(classes) {
  if (!Array.isArray(classes)) {
    return [this::prvgetClass(classes)];
  }
  return classes.map(v => this::prvgetClass(v));
}


class BootstrapSwitch {
  constructor(element, options = {}) {
    this.$element = $(element);
    this.options = $.extend(
      {},
      $.fn.bootstrapSwitch.defaults,
      this::prvgetElementOptions(),
      options,
    );
    this.prevOptions = {};
    this.$wrapper = $('<div>', {
      class: () => getClasses(this.options, this.$element.attr('id'))
        .map(v => this::prvgetClass(v))
        .concat([this.options.baseClass], this::prvgetClasses(this.options.wrapperClass))
        .join(' '),
    });
    this.$container = $('<div>', { class: this::prvgetClass('container') });
    this.$on = $('<span>', {
      html: this.options.onText,
      class: `${this::prvgetClass('handle-on')} ${this::prvgetClass(this.options.onColor)}`,
    });
    this.$off = $('<span>', {
      html: this.options.offText,
      class: `${this::prvgetClass('handle-off')} ${this::prvgetClass(this.options.offColor)}`,
    });
    this.$label = $('<span>', {
      html: this.options.labelText,
      class: this::prvgetClass('label'),
    });

    this.$element.on('init.bootstrapSwitch', () => this.options.onInit(element));
    this.$element.on('switchChange.bootstrapSwitch', (...args) => {
      const changeState = this.options.onSwitchChange.apply(element, args);
      if (changeState === false) {
        if (this.$element.is(':radio')) {
          $(`[name="${this.$element.attr('name')}"]`).trigger('previousState.bootstrapSwitch', true);
        } else {
          this.$element.trigger('previousState.bootstrapSwitch', true);
        }
      }
    });

    this.$container = this.$element.wrap(this.$container).parent();
    this.$wrapper = this.$container.wrap(this.$wrapper).parent();
    this.$element
      .before(this.options.inverse ? this.$off : this.$on)
      .before(this.$label)
      .before(this.options.inverse ? this.$on : this.$off);

    if (this.options.indeterminate) {
      this.$element.prop('indeterminate', true);
    }

    this::prvinit();
    this::prvelementHandlers();
    this::prvhandleHandlers();
    this::prvlabelHandlers();
    this::prvformHandler();
    this::prvexternalLabelHandler();
    this.$element.trigger('init.bootstrapSwitch', this.options.state);
  }

  setPrevOptions() {
    this.prevOptions = { ...this.options };
  }

  state(value, skip) {
    if (typeof value === 'undefined') { return this.options.state; }
    if (
      (this.options.disabled || this.options.readonly) ||
      (this.options.state && !this.options.radioAllOff && this.$element.is(':radio'))
    ) { return this.$element; }
    if (this.$element.is(':radio')) {
      $(`[name="${this.$element.attr('name')}"]`).trigger('setPreviousOptions.bootstrapSwitch');
    } else {
      this.$element.trigger('setPreviousOptions.bootstrapSwitch');
    }
    if (this.options.indeterminate) {
      this.indeterminate(false);
    }
    this.$element
      .prop('checked', Boolean(value))
      .trigger('change.bootstrapSwitch', skip);
    return this.$element;
  }

  toggleState(skip) {
    if (this.options.disabled || this.options.readonly) { return this.$element; }
    if (this.options.indeterminate) {
      this.indeterminate(false);
      return this.state(true);
    }
    return this.$element.prop('checked', !this.options.state).trigger('change.bootstrapSwitch', skip);
  }

  size(value) {
    if (typeof value === 'undefined') { return this.options.size; }
    if (this.options.size != null) {
      this.$wrapper.removeClass(this::prvgetClass(this.options.size));
    }
    if (value) {
      this.$wrapper.addClass(this::prvgetClass(value));
    }
    this::prvwidth();
    this::prvcontainerPosition();
    this.options.size = value;
    return this.$element;
  }

  animate(value) {
    if (typeof value === 'undefined') { return this.options.animate; }
    if (this.options.animate === Boolean(value)) { return this.$element; }
    return this.toggleAnimate();
  }

  toggleAnimate() {
    this.options.animate = !this.options.animate;
    this.$wrapper.toggleClass(this::prvgetClass('animate'));
    return this.$element;
  }

  disabled(value) {
    if (typeof value === 'undefined') { return this.options.disabled; }
    if (this.options.disabled === Boolean(value)) { return this.$element; }
    return this.toggleDisabled();
  }

  toggleDisabled() {
    this.options.disabled = !this.options.disabled;
    this.$element.prop('disabled', this.options.disabled);
    this.$wrapper.toggleClass(this::prvgetClass('disabled'));
    return this.$element;
  }

  readonly(value) {
    if (typeof value === 'undefined') { return this.options.readonly; }
    if (this.options.readonly === Boolean(value)) { return this.$element; }
    return this.toggleReadonly();
  }

  toggleReadonly() {
    this.options.readonly = !this.options.readonly;
    this.$element.prop('readonly', this.options.readonly);
    this.$wrapper.toggleClass(this::prvgetClass('readonly'));
    return this.$element;
  }

  indeterminate(value) {
    if (typeof value === 'undefined') { return this.options.indeterminate; }
    if (this.options.indeterminate === Boolean(value)) { return this.$element; }
    return this.toggleIndeterminate();
  }

  toggleIndeterminate() {
    this.options.indeterminate = !this.options.indeterminate;
    this.$element.prop('indeterminate', this.options.indeterminate);
    this.$wrapper.toggleClass(this::prvgetClass('indeterminate'));
    this::prvcontainerPosition();
    return this.$element;
  }

  inverse(value) {
    if (typeof value === 'undefined') { return this.options.inverse; }
    if (this.options.inverse === Boolean(value)) { return this.$element; }
    return this.toggleInverse();
  }

  toggleInverse() {
    this.$wrapper.toggleClass(this::prvgetClass('inverse'));
    const $on = this.$on.clone(true);
    const $off = this.$off.clone(true);
    this.$on.replaceWith($off);
    this.$off.replaceWith($on);
    this.$on = $off;
    this.$off = $on;
    this.options.inverse = !this.options.inverse;
    return this.$element;
  }

  onColor(value) {
    if (typeof value === 'undefined') { return this.options.onColor; }
    if (this.options.onColor) {
      this.$on.removeClass(this::prvgetClass(this.options.onColor));
    }
    this.$on.addClass(this::prvgetClass(value));
    this.options.onColor = value;
    return this.$element;
  }

  offColor(value) {
    if (typeof value === 'undefined') { return this.options.offColor; }
    if (this.options.offColor) {
      this.$off.removeClass(this::prvgetClass(this.options.offColor));
    }
    this.$off.addClass(this::prvgetClass(value));
    this.options.offColor = value;
    return this.$element;
  }

  onText(value) {
    if (typeof value === 'undefined') { return this.options.onText; }
    this.$on.html(value);
    this::prvwidth();
    this::prvcontainerPosition();
    this.options.onText = value;
    return this.$element;
  }

  offText(value) {
    if (typeof value === 'undefined') { return this.options.offText; }
    this.$off.html(value);
    this::prvwidth();
    this::prvcontainerPosition();
    this.options.offText = value;
    return this.$element;
  }

  labelText(value) {
    if (typeof value === 'undefined') { return this.options.labelText; }
    this.$label.html(value);
    this::prvwidth();
    this.options.labelText = value;
    return this.$element;
  }

  handleWidth(value) {
    if (typeof value === 'undefined') { return this.options.handleWidth; }
    this.options.handleWidth = value;
    this::prvwidth();
    this::prvcontainerPosition();
    return this.$element;
  }

  labelWidth(value) {
    if (typeof value === 'undefined') { return this.options.labelWidth; }
    this.options.labelWidth = value;
    this::prvwidth();
    this::prvcontainerPosition();
    return this.$element;
  }

  baseClass() {
    return this.options.baseClass;
  }

  wrapperClass(value) {
    if (typeof value === 'undefined') { return this.options.wrapperClass; }
    const wrapperClass = value || $.fn.bootstrapSwitch.defaults.wrapperClass;
    this.$wrapper.removeClass(this::prvgetClasses(this.options.wrapperClass).join(' '));
    this.$wrapper.addClass(this::prvgetClasses(wrapperClass).join(' '));
    this.options.wrapperClass = wrapperClass;
    return this.$element;
  }

  radioAllOff(value) {
    if (typeof value === 'undefined') { return this.options.radioAllOff; }
    const val = Boolean(value);
    if (this.options.radioAllOff === val) { return this.$element; }
    this.options.radioAllOff = val;
    return this.$element;
  }

  onInit(value) {
    if (typeof value === 'undefined') { return this.options.onInit; }
    this.options.onInit = value || $.fn.bootstrapSwitch.defaults.onInit;
    return this.$element;
  }

  onSwitchChange(value) {
    if (typeof value === 'undefined') {
      return this.options.onSwitchChange;
    }
    this.options.onSwitchChange =
      value || $.fn.bootstrapSwitch.defaults.onSwitchChange;
    return this.$element;
  }

  destroy() {
    const $form = this.$element.closest('form');
    if ($form.length) {
      $form.off('reset.bootstrapSwitch').removeData('bootstrap-switch');
    }
    this.$container
      .children()
      .not(this.$element)
      .remove();
    this.$element
      .unwrap()
      .unwrap()
      .off('.bootstrapSwitch')
      .removeData('bootstrap-switch');
    return this.$element;
  }
}

function bootstrapSwitch(option, ...args) {
  function reducer(ret, next) {
    const $this = $(next);
    const existingData = $this.data('bootstrap-switch');
    const data = existingData || new BootstrapSwitch(next, option);
    if (!existingData) {
      $this.data('bootstrap-switch', data);
    }
    if (typeof option === 'string') {
      return data[option](...args);
    }
    return ret;
  }
  return Array.prototype.reduce.call(this, reducer, this);
}

$.fn.bootstrapSwitch = bootstrapSwitch;
$.fn.bootstrapSwitch.Constructor = BootstrapSwitch;
$.fn.bootstrapSwitch.defaults = {
  state: true,
  size: null,
  animate: true,
  disabled: false,
  readonly: false,
  indeterminate: false,
  inverse: false,
  radioAllOff: false,
  onColor: 'primary',
  offColor: 'default',
  onText: 'ON',
  offText: 'OFF',
  labelText: '&nbsp',
  handleWidth: 'auto',
  labelWidth: 'auto',
  baseClass: 'bootstrap-switch',
  wrapperClass: 'wrapper',
  onInit: () => {},
  onSwitchChange: () => {},
};
