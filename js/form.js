'use strict';

(function () {
  const roomsOption = document.querySelector(`#room_number`);
  const guestsOption = document.querySelector(`#capacity`);

  const validateSelect = function () {
    guestsOption.addEventListener(`change`, function () {
      if (roomsOption.value < guestsOption.value) {
        guestsOption.setCustomValidity(`Слишком много гостей`);
      } else {
        guestsOption.setCustomValidity(``);
      }
    });
    roomsOption.addEventListener(`change`, function () {
      if (roomsOption.value < guestsOption.value) {
        guestsOption.setCustomValidity(`Слишком много гостей`);
      } else {
        guestsOption.setCustomValidity(``);
      }
    });
  };

  validateSelect();
})();
