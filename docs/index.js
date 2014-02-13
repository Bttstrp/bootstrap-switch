$(function() {
  // initialize all the inputs
  $('input[type="checkbox"],[type="radio"]').not('#create-switch').bootstrapSwitch();

  // dimension
  $('#btn-size-regular-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('size', '');
  });
  $('#btn-size-mini-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('size', 'mini');
  });
  $('#btn-size-small-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('size', 'small');
  });
  $('#btn-size-large-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('size', 'large');
  });

  // state
  $('#toggle-state-switch-button').on('click', function () {
    $('#toggle-state-switch').bootstrapSwitch('toggleState');
  });
  $('#toggle-state-switch-button-on').on('click', function () {
    $('#toggle-state-switch').bootstrapSwitch('state', true);
  });
  $('#toggle-state-switch-button-off').on('click', function () {
    $('#toggle-state-switch').bootstrapSwitch('state', false);
  });
  $('#toggle-state-switch-button-state').on('click', function () {
    alert($('#toggle-state-switch').bootstrapSwitch('state'));
  });

  // destroy
  $('#btn-destroy-switch').on('click', function () {
    $('#destroy-switch').bootstrapSwitch('destroy');
    $(this).remove();
  });
  // CREATE
  $('#btn-create').on('click', function () {
    $('#create-switch').bootstrapSwitch();
    $(this).remove();
  });

  // activation
  var $disable = $('#disable-switch');
  $('#btn-disable-is').on('click', function () {
    alert($disable.bootstrapSwitch('disabled'));
  });
  $('#btn-disable-toggle').on('click', function () {
    $disable.bootstrapSwitch('toggleDisabled');
  });
  $('#btn-disable-set').on('click', function () {
    $disable.bootstrapSwitch('disabled', true);
  });
  $('#btn-disable-remove').on('click', function () {
    $disable.bootstrapSwitch('disabled', false);
  });

  // readonly
  var $readonly = $('#readonly-switch');
  $('#btn-readonly-is').on('click', function () {
    alert($readonly.bootstrapSwitch('readonly'));
  });
  $('#btn-readonly-toggle').on('click', function () {
    $readonly.bootstrapSwitch('toggleReadonly');
  });
  $('#btn-readonly-set').on('click', function () {
    $readonly.bootstrapSwitch('readonly', true);
  });
  $('#btn-readonly-remove').on('click', function () {
    $readonly.bootstrapSwitch('readonly', false);
  });

  // label
  $('#btn-label-on-switch').on('click', function() {
    $('#label-switch').bootstrapSwitch('onText', 'I');
  });
  $('#btn-label-off-switch').on('click', function() {
    $('#label-switch').bootstrapSwitch('offText', 'O');
  });

  $('#label-toggle-switch').on('click', function(e, data) {
    $('.label-toggle-switch').bootstrapSwitch('toggleState');
  });
  $('.label-toggle-switch').on('switchChange', function(e, data) {
    alert(data.value);
  });

  // event handler
  $('#switch-change').on('switchChange', function (e, data) {
    var $element = $(data.el),
      value = data.value;

    console.log(e, $element, value);
  });

  // color
  $('#btn-color-on-switch').on('click', function() {
    $('#change-color-switch').bootstrapSwitch('onColor', 'success');
  });
  $('#btn-color-off-switch').on('click', function() {
    $('#change-color-switch').bootstrapSwitch('offColor', 'danger');
  });

  // animation
  $('#btn-animate-switch').on('click', function() {
    $('#animated-switch').bootstrapSwitch('animate', true);
  });
  $('#btn-dont-animate-switch').on('click', function() {
    $('#animated-switch').bootstrapSwitch('animate', false);
  });

  // radio
  $('.radio1').on('switch-change', function () {
    $('.radio1').bootstrapSwitch('toggleRadioState');
  });
  $('.radio2').on('switch-change', function () {
    console.log("ok");
    $('.radio2').bootstrapSwitch('toggleRadioState', true);
  });
});
