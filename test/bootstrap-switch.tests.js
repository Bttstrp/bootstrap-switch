(function() {
  describe("Bootstrap Switch:", function() {
    var createCheckbox, createRadio, getOptions;
    beforeEach(function() {
      $.support.transition = false;
      return $.fx.off = true;
    });
    afterEach(function() {
      return $("." + $.fn.bootstrapSwitch.defaults.baseClass).bootstrapSwitch("destroy");
    });
    createCheckbox = function() {
      return $("<input>", {
        type: "checkbox",
        "class": "switch"
      }).appendTo("body");
    };
    createRadio = function() {
      return $("<input>", {
        type: "radio",
        name: "name",
        "class": "switch"
      }).appendTo("body");
    };
    getOptions = function($element) {
      return $element.data("bootstrap-switch").options;
    };
    it("should set the default options as element options, except state", function() {
      var $switch;
      $switch = createCheckbox().prop("checked", true).bootstrapSwitch();
      return expect(getOptions($switch)).toEqual($.fn.bootstrapSwitch.defaults);
    });
    it("should override default options with initialization ones", function() {
      var $switch, $switch2;
      $switch = createCheckbox().prop("checked", false).bootstrapSwitch();
      $switch2 = createCheckbox().bootstrapSwitch({
        state: false
      });
      expect(getOptions($switch).state).toBe(false);
      return expect(getOptions($switch2).state).toBe(false);
    });
    it("should something", function() {
      var $switch, eventDoc, eventElement;
      eventDoc = eventElement = 0;
      $switch = createCheckbox().bootstrapSwitch();
      $(document).on("switchChange.bootstrapSwitch", ":checkbox", function(event, state) {
        return eventDoc++;
      });
      $(":checkbox").on("switchChange.bootstrapSwitch", function(event, state) {
        return eventElement++;
      });
      $switch.click();
      expect(eventElement).toEqual(eventDoc);
      return expect(eventElement).toEqual(1);
    });
    describe("The Checkbox Bootstrap Switch", function() {
      it("should conserve its state if onSwitchChange returns false", function() {
        var $indeterminateSwitch, $switch;
        $switch = createCheckbox().bootstrapSwitch({
          onSwitchChange: function(e, s) {
            expect(s).toEqual(true);
            return false;
          }
        });
        $indeterminateSwitch = createCheckbox().data("indeterminate", true).bootstrapSwitch({
          onSwitchChange: function(e, s) {
            expect(s).toEqual(true);
            return false;
          }
        });
        $switch.click();
        $indeterminateSwitch.click();
        expect($switch.bootstrapSwitch('state')).toEqual(false);
        return expect($indeterminateSwitch.bootstrapSwitch('state')).toEqual(false);
      });
      return it("should change its state if onSwitchChange not returns false", function() {
        var $switch;
        $switch = createCheckbox().bootstrapSwitch({
          onSwitchChange: function(e, s) {
            return expect(s).toEqual(true);
          }
        });
        $switch.click();
        return expect($switch.bootstrapSwitch('state')).toEqual(true);
      });
    });
    return describe("The Radio Bootstrap Switch", function() {
      it("should conserve its state if onSwitchChange returns false", function() {
        var $radio1, $radio2, $radio3;
        $radio1 = createRadio().prop("checked", true);
        $radio2 = createRadio().prop("checked", false);
        $radio3 = createRadio().prop("checked", false);
        $('[name="name"]').bootstrapSwitch({
          onSwitchChange: function(e, s) {
            expect(s).toEqual(true);
            return false;
          }
        });
        $radio2.click();
        expect($radio1.bootstrapSwitch('state')).toEqual(true);
        expect($radio2.bootstrapSwitch('state')).toEqual(false);
        return expect($radio3.bootstrapSwitch('state')).toEqual(false);
      });
      return it("should change its state if onSwitchChange not returns false", function() {
        var $radio1, $radio2, $radio3;
        $radio1 = createRadio().prop("checked", true);
        $radio2 = createRadio().prop("checked", false);
        $radio3 = createRadio().prop("checked", false);
        $('[name="name"]').bootstrapSwitch({
          onSwitchChange: function(e, s) {
            return expect(s).toEqual(true);
          }
        });
        $radio2.click();
        expect($radio1.bootstrapSwitch('state')).toEqual(false);
        expect($radio2.bootstrapSwitch('state')).toEqual(true);
        return expect($radio3.bootstrapSwitch('state')).toEqual(false);
      });
    });
  });

}).call(this);
