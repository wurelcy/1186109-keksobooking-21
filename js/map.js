'use strict';

(function () {
  const fieldsets = document.querySelectorAll(`fieldset`);
  const houseType = document.querySelector(`#housing-type`);

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

  const successHandler = function (pins) {
    for (let j = 0; j < window.data.PINS_LENGTH; j++) {
      fragment.appendChild(renderPins(pins[j]));
      fragment.appendChild(window.card.renderCards(pins[j]));
    }
    similarListElement.appendChild(fragment);
    window.card.openCard();
    window.card.closeCard();
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #9c2727;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.color = 'white';
    node.style.right = 0;
    node.style.fontSize = '28px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      makeActive();
      window.load.loadData(successHandler, errorHandler);
    }
  });

  mapPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      makeActive();
      window.load.loadData(successHandler, errorHandler);
    }
  });

  const sortPins = function (pins) {
    let sortedPins = [];

    pins.forEach((type) => {
      if (type.offer.type === houseType.value) {
        sortedPins.push(type);
        fragment.appendChild(renderPins(type));
        fragment.appendChild(window.card.renderCards(type));
      }
    });
    similarListElement.appendChild(fragment);
    window.card.openCard();
    window.card.closeCard();
  };

  const removeMapElements = function () {
    const mapPins = document.querySelectorAll(`.map__pin`);
    const mapCards = document.querySelectorAll(`.map__card`);

    for (let i = mapPins.length - 1; i > 0; i--) {
      mapPins[i].parentNode.removeChild(mapPins[i]);
    }

    for (let i = mapCards.length - 1; i >= 0; i--) {
      mapCards[i].parentNode.removeChild(mapCards[i]);
    }
  };

  houseType.addEventListener(`change`, function () {
    removeMapElements();
    window.load.loadData(sortPins, errorHandler);
  });

  window.map = {
    mapPin: mapPin,
    makeDisabled: makeDisabled,
    map: map
  };
})();
