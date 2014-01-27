/* ========================================================================
 * bootstrap-switch - v2.0.1
 * http://www.bootstrap-switch.org
 * ========================================================================
 * Copyright 2012-2013 Mattia Larentis
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function() {
  var __slice = [].slice;

  (function($, window) {
    "use strict";
    var BootstrapSwitch;
    BootstrapSwitch = (function() {
      function BootstrapSwitch(element, option) {
        var _this = this;
        this.$element = $(element);
        this.$switchLeft = $("<span>", {
          "class": function() {
            var cls, color;
            cls = "switch-left";
            color = _this.$element.data("on-color");
            if (color != null) {
              cls += " switch-" + color;
            }
            return cls;
          },
          html: function() {
            var html, text;
            html = "ON";
            text = _this.$element.data("on-text");
            if (text != null) {
              html = text;
            }
            return html;
          }
        });
        this.$switchRight = $("<span>", {
          "class": function() {
            var cls, color;
            cls = "switch-right";
            color = _this.$element.data("off-color");
            if (color != null) {
              cls += " switch-" + color;
            }
            return cls;
          },
          html: function() {
            var html, text;
            html = "OFF";
            text = _this.$element.data("off-text");
            if (text != null) {
              html = text;
            }
            return html;
          }
        });
        this.$label = $("<label>", {
          "for": this.$element.attr("id"),
          html: function() {
            var html, text;
            html = "&nbsp;";
            text = _this.$element.data("label-text");
            if (text != null) {
              html = text;
            }
            return html;
          }
        });
        this.$wrapper = $("<div>", {
          "class": function() {
            var classes, cls, _i, _len, _ref;
            classes = ["has-switch"];
            if (_this.$element.attr("class")) {
              _ref = ["mini", "small", "large"];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                cls = _ref[_i];
                if (_this.$element.hasClass("switch-" + cls)) {
                  classes.push("switch-" + cls);
                }
              }
            }
            classes.push(_this.$element.is(":checked") ? "switch-on" : "switch-off");
            if (_this.$element.data("animate") !== false) {
              classes.push("switch-animate");
            }
            if (_this.$element.is(":disabled") || _this.$element.is("[readonly]")) {
              classes.push("disabled");
            }
            return classes.join(" ");
          },
          tabindex: 0
        });
        this.$div = this.$element.wrap($("<div>")).parent();
        this.$wrapper = this.$div.wrap(this.$wrapper).parent();
        this.$element.before(this.$switchLeft).before(this.$label).before(this.$switchRight);
        this._elementHandlers();
        this._wrapperHandlers();
        this._switchesHandlers();
        this._labelHandlers();
        this._form();
      }

      BootstrapSwitch.prototype._constructor = BootstrapSwitch;

      BootstrapSwitch.prototype.state = function(value, skip) {
        if (typeof value === "undefined") {
          return this.$element.is(":checked");
        }
        this.$element.prop("checked", !!value).trigger("change", skip);
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleState = function(skip) {
        this.$element.prop("checked", !this.$element.is(":checked")).trigger("change", skip);
        return this.$element;
      };

      /*
      TODO: refactor
      toggleRadioState: (uncheck, skip) ->
        $element = @$element.not ":checked"
      
        if uncheck
          $element.trigger "change", skip
        else
          $element.prop("checked", not @$element.is ":checked").trigger "change", skip
        @$element
      */


      BootstrapSwitch.prototype.disabled = function(value) {
        if (typeof value === "undefined") {
          return this.$element.is(":disabled");
        }
        value = !!value;
        this.$wrapper[value ? "addClass" : "removeClass"]("disabled");
        this.$element.prop("disabled", value);
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleDisabled = function() {
        this.$element.prop("disabled", !this.$element.is(":disabled"));
        this.$wrapper.toggleClass("disabled");
        return this.$element;
      };

      BootstrapSwitch.prototype.readOnly = function(value) {
        if (typeof value === "undefined") {
          return this.$element.is("[readonly]");
        }
        if (readonly) {
          this.$wrapper.addClass("disabled");
          this.$element.prop("readonly", true);
        } else {
          this.$wrapper.removeClass("disabled");
          this.$element.prop("readonly", false);
        }
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleReadOnly = function() {
        this.$element.prop("readonly", !this.$element.is("[readonly]")).parents(".has-switch").toggleClass("disabled");
        return this.$element;
      };

      BootstrapSwitch.prototype.labelText = function(value) {
        this.$element.siblings("label").html(value || "&nbsp");
        return this.$element;
      };

      BootstrapSwitch.prototype.onText = function(value) {
        if (typeof value === "undefined") {
          return this.$switchLeft.html();
        }
        this.$switchLeft.html(value);
        return this.$element;
      };

      BootstrapSwitch.prototype.offText = function(value) {
        if (typeof value === "undefined") {
          return this.$switchRight.html();
        }
        this.$switchRight.html(value);
        return this.$element;
      };

      BootstrapSwitch.prototype.onColor = function(value) {
        var color;
        color = this.$element.data("on-color");
        if (typeof value === "undefined") {
          return color;
        }
        if (color != null) {
          this.$switchLeft.removeClass("switch-" + color);
        }
        this.$switchLeft.addClass("switch-" + value);
        this.$element.data("on-color", value);
        return this.$element;
      };

      BootstrapSwitch.prototype.offColor = function(value) {
        var color;
        color = this.$element.data("off-color");
        if (typeof value === "undefined") {
          return color;
        }
        if (color != null) {
          this.$switchRight.removeClass("switch-" + color);
        }
        this.$switchRight.addClass("switch-" + value);
        this.$element.data("off-color", value);
        return this.$element;
      };

      BootstrapSwitch.prototype.animate = function(value) {
        if (typeof value === "undefined") {
          return this.$element.data("animate");
        }
        value = !!value;
        this.$wrapper[value ? "addClass" : "removeClass"]("switch-animate");
        this.$element.data("animate", value);
        return this.$element;
      };

      BootstrapSwitch.prototype.size = function(value) {
        var cls, _i, _len, _ref;
        if (typeof value === "undefined") {
          return this.$wrapper.hasClass("switch-" + value);
        }
        _ref = ["mini", "small", "large"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cls = _ref[_i];
          this.$wrapper[cls !== value ? "removeClass" : "addClass"]("switch-" + cls);
        }
        return this.$element;
      };

      BootstrapSwitch.prototype.destroy = function() {
        var $form;
        $form = this.$element.closest("form");
        this.$div.children().not(this.$element).remove();
        this.$element.unwrap().unwrap().off("change");
        if ($form.length) {
          $form.off("reset").removeData("bootstrap-switch");
        }
        return this.$element;
      };

      BootstrapSwitch.prototype._elementHandlers = function() {
        var _this = this;
        return this.$element.on("change", function(e, skip) {
          var isChecked, state;
          e.preventDefault();
          isChecked = _this.$element.is(":checked");
          state = _this.$wrapper.hasClass("switch-off");
          _this.$div.css("margin-left", "");
          if (state !== isChecked) {
            return;
          }
          if (isChecked) {
            _this.$wrapper.removeClass("switch-off").addClass("switch-on");
          } else {
            _this.$wrapper.removeClass("switch-on").addClass("switch-off");
          }
          if (_this.$element.data("animate") !== false) {
            _this.$wrapper.addClass("switch-animate");
          }
          if (typeof skip === "boolean" && skip) {
            return;
          }
          return _this.$element.trigger("switch-change", {
            el: _this.$element,
            value: isChecked
          });
        });
      };

      BootstrapSwitch.prototype._wrapperHandlers = function() {
        var _this = this;
        return this.$wrapper.on("keydown", function(e) {
          if (!e.which || _this.$element.is(":disabled") || _this.$element.is("[readonly]")) {
            return;
          }
          switch (e.which) {
            case 32:
              e.preventDefault();
              return _this.toggleState();
            case 37:
              e.preventDefault();
              if (_this.$element.is(":checked")) {
                return _this.toggleState();
              }
              break;
            case 39:
              e.preventDefault();
              if (!_this.$element.is(":checked")) {
                return _this.toggleState();
              }
          }
        });
      };

      BootstrapSwitch.prototype._switchesHandlers = function() {
        var _this = this;
        this.$switchLeft.on("click", function() {
          return _this.toggleState();
        });
        return this.$switchRight.on("click", function() {
          return _this.toggleState();
        });
      };

      BootstrapSwitch.prototype._labelHandlers = function() {
        /*
        @$label.on "click", =>
          e.preventDefault()
          e.stopImmediatePropagation()
        
          @toggleState()
        */

        var _this = this;
        return this.$label.on("click", function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          _this.$wrapper.removeClass("switch-animate");
          if (_this.moving) {
            return;
          }
          _this.$label.on("mousemove", function(e) {
            var left, percent, relativeX, right;
            relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - _this.$wrapper.offset().left;
            percent = (relativeX / _this.$wrapper.width()) * 100;
            left = 25;
            right = 75;
            _this.moving = true;
            if (percent < left) {
              percent = left;
            } else if (percent > right) {
              percent = right;
            }
            return _this.$div.css("margin-left", "" + (percent - right) + "%");
          });
          _this.$label.on("mouseup mouseleave", function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            _this.$element.prop("checked", parseInt(_this.$div.css("margin-left"), 10) > -25).trigger("change");
            return _this.$label.off("mousemove");
          });
          return _this.$label.trigger("mousemove");
        });
        /*
        @$label.on
          "click touchstart": (e) =>
            @moving = false
        
            e.preventDefault()
            e.stopImmediatePropagation()
        
            @$wrapper.removeClass "switch-animate"
        
            if @moving
              @$element.prop "checked", (parseInt(@$div.css("margin-left"), 10) > -25)
            else
              @$element.prop "checked", not @$element.is(":checked")
        
            @$element.trigger "change"
            # @$label.off "click" if @$element.is(":disabled") or @$element.is("[readonly]") or @$element.hasClass "radio-no-uncheck"
          "mousemove touchmove": (e) =>
            relativeX = (e.pageX or e.originalEvent.targetTouches[0].pageX) - @$wrapper.offset().left
            percent = (relativeX / @$wrapper.width()) * 100
            left = 25
            right = 75
        
            @moving = true
            if percent < left
              percent = left
            else if percent > right
              percent = right
        
            @$div.css "margin-left", "#{percent - right}%"
          "click touchend": (e) =>
            e.stopImmediatePropagation()
            e.preventDefault()
        
            @$label.off "mouseleave"
          mouseleave: (e) =>
            e.preventDefault()
            e.stopImmediatePropagation()
        
            @$label.off("mouseleave mousemove").trigger "mouseup"
            @$element.prop("checked", (parseInt(@$div.css("margin-left"), 10) > -25)).trigger "change"
          mouseup: (e) =>
            e.stopImmediatePropagation()
            e.preventDefault()
        
            @$label.trigger "mouseleave"
        */

      };

      BootstrapSwitch.prototype._form = function() {
        var $form;
        $form = this.$element.closest("form");
        if ($form.data("bootstrap-switch")) {
          return;
        }
        return $form.data("bootstrap-switch", true).on("reset", function() {
          return window.setTimeout(function() {
            return $form.find(".has-switch").each(function() {
              var $input;
              $input = $(this).find("input");
              return $input.prop("checked", $input.is(":checked")).trigger("change");
            });
          }, 1);
        });
      };

      return BootstrapSwitch;

    })();
    return $.fn.extend({
      bootstrapSwitch: function() {
        var args, option, ret;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        ret = this;
        this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data("bootstrap-switch");
          if (!data) {
            $this.data("bootstrap-switch", (data = new BootstrapSwitch(this, option)));
          }
          if (typeof option === "string") {
            return ret = data[option].apply(data, args);
          }
        });
        return ret;
      }
    });
  })(window.jQuery, window);

}).call(this);
