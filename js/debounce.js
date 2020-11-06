'use strict';
(function () {
  let DEBOUNCE_INTERVAL = 300;

  window.debounce = function (cb) {
    const lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
