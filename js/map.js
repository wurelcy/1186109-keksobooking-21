'use strict';

(function () {
  const fieldsets = document.querySelectorAll(`fieldset`);

  const map = document.querySelector(`.map`);
  const mapPin = document.querySelector(`.map__pin--main`);

  const fragment = document.createDocumentFragment();

  const similarPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const similarListElement = map.querySelector(`.map__pins`);

  const renderPins = function (pin) {
    let pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + window.main.PIN_SIZE + `px`;
    pinElement.style.top = pin.location.y + window.main.PIN_SIZE + `px`;
    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.querySelector(`img`).alt = pin.offer.title;
    console.log(pinElement);
    return pinElement;
  };

  const makeDisabled = function () {
    fieldsets.forEach((fieldset) => {
      fieldset.setAttribute(`disabled`, ``);
    });
  };

  makeDisabled();

  const makeActive = function () {
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`, ``);
    });
  };

  const getPins = function () {
    for (let j = 0; j < window.data.PINS_LENGTH; j++) {
      fragment.appendChild(renderPins(window.data.pins[j]));
    }
    similarListElement.appendChild(fragment);
  };

  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      makeActive();
      getPins();
    }
  });

  mapPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      makeActive();
      getPins();
    }
  });

})();
