'use strict';

(function () {
  const PIN_SIZE = 62;
  const PIN_TALE_SIZE = 10;

  const PIN_Y = 375;
  const PIN_X = 570;
  let addressField = document.querySelector(`#address`);

  const setAddress = function () {
    addressField.value = (PIN_Y + PIN_SIZE / 2) + `, ` + (PIN_X + PIN_TALE_SIZE);
  };

  setAddress();

  window.main = {
    PIN_SIZE
  };
})();
