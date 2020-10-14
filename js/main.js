'use strict';

(function () {
  const PIN_SIZE = 62;
  const PIN_TALE_SIZE = 10;

  const pinY = 375;
  const pinX = 570;
  let addressField = document.querySelector(`#address`);

  const setAddress = function () {
    addressField.value = (pinY + PIN_SIZE / 2) + `, ` + (pinX + PIN_TALE_SIZE);
  };

  setAddress();
  window.main = {
    PIN_SIZE: PIN_SIZE
  };
})();
