$(function() {
  // initialize all the inputs
  $('input[type="checkbox"],[type="radio"]').not('#create-switch').bootstrapSwitch();

  // dimension
  $('#btn-size-regular-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('setSizeClass', '');
  });
  $('#btn-size-mini-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('setSizeClass', 'switch-mini');
  });
  $('#btn-size-small-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('setSizeClass', 'switch-small');
  });
  $('#btn-size-large-switch').on('click', function () {
    $('#dimension-switch').bootstrapSwitch('setSizeClass', 'switch-large');
  });

  // state
  $('#toggle-state-switch-button').on('click', function () {
    $('#toggle-state-switch').bootstrapSwitch('toggleState');
  });
  $('#toggle-state-switch-button-on').on('click', function () {
    $('#toggle-state-switch').bootstrapSwitch('setState', true);
  });
  $('#toggle-state-switch-button-off').on('click', function () {
    $('#toggle-state-switch').bootstrapSwitch('setState', false);
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
    alert($disable.bootstrapSwitch('isDisabled'));
  });
  $('#btn-disable-toggle').on('click', function () {
    $disable.bootstrapSwitch('toggleDisabled');
  });
  $('#btn-disable-set').on('click', function () {
    $disable.bootstrapSwitch('setDisabled', true);
  });
  $('#btn-disable-remove').on('click', function () {
    $disable.bootstrapSwitch('setDisabled', false);
  });

  // readonly
  var $readonly = $('#readonly-switch');
  $('#btn-readonly-is').on('click', function () {
    alert($readonly.bootstrapSwitch('isReadOnly'));
  });
  $('#btn-readonly-toggle').on('click', function () {
    $readonly.bootstrapSwitch('toggleReadOnly');
  });
  $('#btn-readonly-set').on('click', function () {
    $readonly.bootstrapSwitch('setReadOnly', true);
  });
  $('#btn-readonly-remove').on('click', function () {
    $readonly.bootstrapSwitch('setReadOnly', false);
  });

  // label
  $('#btn-label-on-switch').on('click', function() {
    $('#label-switch').bootstrapSwitch('setOnLabel', 'I');
  });
  $('#btn-label-off-switch').on('click', function() {
    $('#label-switch').bootstrapSwitch('setOffLabel', 'O');
  });

  $('#label-toggle-switch').on('click', function(e, data) {
    $('.label-toggle-switch').bootstrapSwitch('toggleState');
  });
  $('.label-toggle-switch').on('switch-change', function(e, data) {
    alert(data.value);
  });

  // event handler
  $('#switch-change').on('switch-change', function (e, data) {
    var $element = $(data.el),
      value = data.value;

    console.log(e, $element, value);
  });

  // color
  $('#btn-color-on-switch').on('click', function() {
    $('#change-color-switch').bootstrapSwitch('setOnClass', 'success');
  });
  $('#btn-color-off-switch').on('click', function() {
    $('#change-color-switch').bootstrapSwitch('setOffClass', 'danger');
  });

  // animation
  $('#btn-animate-switch').on('click', function() {
    $('#animated-switch').bootstrapSwitch('setAnimated', true);
  });
  $('#btn-dont-animate-switch').on('click', function() {
    $('#animated-switch').bootstrapSwitch('setAnimated', false);
  });

  // radio
  $('.radio1').on('switch-change', function () {
    $('.radio1').bootstrapSwitch('toggleRadioState');
  });
  $('.radio2').on('switch-change', function () {
    $('.radio2').bootstrapSwitch('toggleRadioStateAllowUncheck', true);
  });
});
