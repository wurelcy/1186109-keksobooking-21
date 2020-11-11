'use strict';

(function () {
  const PINS_LENGTH = 5;
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1140;
  const ENTER_BUTTON = `Enter`;
  const ESCAPE_BUTTON = `Escape`;
  let pins = [];

  window.data = {
    PINS_LENGTH,
    pins,
    MIN_Y,
    MIN_X,
    MAX_Y,
    MAX_X,
    ENTER_BUTTON,
    ESCAPE_BUTTON
  };
})();
