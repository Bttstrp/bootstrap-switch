$(function() {
  var $window = $(window);
  var $switchState = $('#state-switch');
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

  // download switch
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
  var $switchState = $("#switch-state");
  $('[data-state-toggle]').on('click', function() {
    $switchState.bootstrapSwitch('toggleState');
  });
  $('[data-state-set]').on('click', function() {
    $switchState.bootstrapSwitch('state', $(this).data('state-set'));
  });
  $('[data-state-get]').on('click', function() {
    alert($switchState.bootstrapSwitch('state'));
  });

  // size
  $('[data-size-set]').on('click', function() {
    $("#switch-size").bootstrapSwitch("size", $(this).data("size-set"));
  });

  // animate
  var $switchAnimate = $("#switch-animate");
  $('[data-animate-toggle]').on('click', function() {
    $switchAnimate.bootstrapSwitch("animate", ! $switchAnimate.bootstrapSwitch("animate"));
  });

  // disabled
  $('[data-disabled-toggle]').on('click', function() {
    $("#switch-disabled").bootstrapSwitch("toggleDisabled");
  });
});
