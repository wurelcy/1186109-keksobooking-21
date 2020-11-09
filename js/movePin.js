'use strict';

(function () {
  const mainPin = window.map.mapPin;
  const PIN_TALE = 22;
  const PIN_SIZE = 62;
  const MIN_HEIGHT = window.data.MIN_Y - PIN_TALE;
  const MAX_HEIGHT = window.data.MAX_Y - PIN_TALE;
  const MAX_X = window.data.MAX_X + (PIN_SIZE / 2);
  const MIN_X = window.data.MIN_X - (PIN_SIZE / 2);

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let currentPinX = Math.round(parseInt(mainPin.style.left, 10) + PIN_SIZE / 2);
      let currentPinY = Math.round(parseInt(mainPin.style.top, 10) + PIN_TALE);


      if ((mainPin.offsetTop - shift.y) < MAX_HEIGHT && (mainPin.offsetTop - shift.y) > MIN_HEIGHT && (mainPin.offsetLeft - shift.x) > MIN_X && (mainPin.offsetLeft - shift.x) < MAX_X) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
        window.form.address.value = `` + (currentPinX) + `,` + (currentPinY) + ``;
      }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
