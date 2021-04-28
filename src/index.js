"use strict";

module.exports = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!options.disabled && (!options.key || options.key.length === 0)) {
      console.warn("Please enter a Zendesk Web Widget Key");
    }

    var disabledLogger = function disabledLogger(method) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      console.log("Zendesk is disabled, you called:", {
        method: method,
        args: args
      });
    };

    if (options.disabled) {
      window.zE = disabledLogger;
    }

    window.zESettings = options.settings;
    var root = new Vue();
    var isLoaded = false;

    root.load = function (zendeskKey) {
      if (isLoaded) {
        return;
      }

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = "ze-snippet";
      script.src = "https://static.zdassets.com/ekr/snippet.js?key=" + zendeskKey;
      delete window.zE;
      var first = document.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(script, first);

      script.onload = function (event) {
        isLoaded = true;

        if (options.hideOnLoad) {
          root.hide();
        }

        root.$emit("loaded", event);
      };
    };

    if (!options.disabled) {
      root.load(options.key);
    }

    root.hide = function () {
      return window.zE("webWidget", "hide");
    };

    root.show = function () {
      return window.zE("webWidget", "show");
    };

    root.logout = function () {
      return window.zE("webWidget", "logout");
    };

    root.identify = function (user) {
      return window.zE("webWidget", "identify", user);
    };

    root.prefill = function (user) {
      return window.zE("webWidget", "prefill", user);
    };

    root.setLocale = function (locale) {
      return window.zE("webWidget", "setLocale", locale);
    };

    root.updateSettings = function (settings) {
      return window.zE("webWidget", "updateSettings", settings);
    };

    root.clear = function () {
      return window.zE("webWidget", "clear");
    };

    root.updatePath = function (options) {
      return window.zE("updatePath", "clear", options);
    };

    root.toggle = function () {
      return window.zE("webWidget", "toggle");
    };

    root.reset = function () {
      return window.zE("webWidget", "reset");
    };

    root.close = function () {
      return window.zE("webWidget", "close");
    };

    root.open = function () {
      return window.zE("webWidget", "open");
    };

    Object.defineProperty(root, "zE", {
      get: function get() {
        return window.zE;
      }
    });
    Vue.prototype.$zendesk = root;
  }
};
