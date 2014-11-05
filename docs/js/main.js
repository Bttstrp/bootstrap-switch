$(function() {
  var $window = $(window);
  var sectionTop = $('.top').outerHeight() + 20;

  // initialize highlight.js
  hljs.initHighlightingOnLoad();

  // navigation
  $('a[href*="#"]').on('click', function(event) {
    event.preventDefault();
    var $target = $($(this).attr('href').slice('#'));

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
  $('input[type="checkbox"],[type="radio"]')
  .not('#create-switch')
  .not('#events-switch')
  .not('#switch-modal')
  .bootstrapSwitch();

  $('[data-get]').on("click", function() {
    var type = $(this).data('get');

    alert($('#switch-' + type).bootstrapSwitch(type));
  });

  $('[data-set]').on('click', function() {
    var type = $(this).data('set');

    $('#switch-' + type).bootstrapSwitch(type, $(this).data('value'));
  });

  $('[data-toggle]').on('click', function() {
    var type = $(this).data('toggle');

    $('#switch-' + type).bootstrapSwitch('toggle' + type.charAt(0).toUpperCase() + type.slice(1));
  });

  $('[data-set-value]').on('input', function(event) {
    event.preventDefault();
    var type = $(this).data('set-value');
    var value = $.trim($(this).val());

    if ($(this).data('value') == value) {
      return;
    }

    $('#switch-' + type).bootstrapSwitch(type, value);
  });

  $('#modal-switch')
  .on("shown.bs.modal", function() {
    $('#switch-modal').bootstrapSwitch();
  })
  .on("hidden.bs.modal", function() {
    $('#switch-modal').bootstrapSwitch('destroy');
  });
});
