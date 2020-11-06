'use strict';

(function () {
  let pins = [];
  const PINS_LENGTH = 5;
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1140;
  const ENTER_BUTTON = `Enter`;
  const ESCAPE_BUTTON = `Escape`;

  window.data = {
    PINS_LENGTH: PINS_LENGTH,
    pins: pins,
    MIN_Y: MIN_Y,
    MIN_X: MIN_X,
    MAX_Y: MAX_Y,
    MAX_X: MAX_X,
    ENTER_BUTTON: ENTER_BUTTON,
    ESCAPE_BUTTON: ESCAPE_BUTTON
  };
})();
