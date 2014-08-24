(function() {
  describe("Bootstrap Switch", function() {
    var createElement, getOptions;
    beforeEach(function() {
      $.support.transition = false;
      return $.fx.off = true;
    });
    afterEach(function() {
      return $("." + $.fn.bootstrapSwitch.defaults.baseClass).bootstrapSwitch("destroy");
    });
    createElement = function() {
      return $("<input>", {
        type: "checkbox",
        "class": "switch"
      }).appendTo("body");
    };
    getOptions = function($element) {
      return $element.data("bootstrap-switch").options;
    };
    it("should set the default options as element options, except state", function() {
      var $switch;
      $switch = createElement().prop("checked", true).bootstrapSwitch();
      return expect(getOptions($switch)).toEqual($.fn.bootstrapSwitch.defaults);
    });
    return it("should override default options with initialization ones", function() {
      var $switch, $switch2;
      $switch = createElement().prop("checked", false).bootstrapSwitch();
      $switch2 = createElement().bootstrapSwitch({
        state: false
      });
      expect(getOptions($switch).state).toBe(false);
      return expect(getOptions($switch2).state).toBe(false);
    });
  });

}).call(this);
