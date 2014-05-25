$(function() {
  var $window = $(window);
  var $stateSwitch = $('#state-switch');
  var sectionTop = $('.top').outerHeight() + 20;

  // initialize highlight.js
  hljs.initHighlightingOnLoad();

  // navigation
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    var $target = $($(this).attr('href'));

    if ($target.length) {
      $window.scrollTop($target.offset().top - sectionTop);
    }
  });

  $('input[name="download-version"]').on({
    'init.bootstrapSwitch': function() {
      $('#download-' + ($(this).is(':checked') ? '2' : '3')).hide();
    },
    'switchChange.bootstrapSwitch': function(event, state) {
      $('#download-3')[state ? 'show' : 'hide']();
      $('#download-2')[state ? 'hide' : 'show']();
    }
  });

  // initialize all the inputs
  $('input[type="checkbox"],[type="radio"]').not('#create-switch').not('#events-switch').bootstrapSwitch();

  // state
  $('#state-switch-toggle').on('click', function () {
    $stateSwitch.bootstrapSwitch('toggleState');
  });
  $('#state-switch-on').on('click', function () {
    $stateSwitch.bootstrapSwitch('state', true);
  });
  $('#state-switch-off').on('click', function () {
    $stateSwitch.bootstrapSwitch('state', false);
  });
  $('#state-switch-state').on('click', function () {
    alert($stateSwitch.bootstrapSwitch('state'));
  });
});
