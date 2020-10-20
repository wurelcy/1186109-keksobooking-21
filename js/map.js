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

  const similarCardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

  const similarListElement = map.querySelector(`.map__pins`);

  const renderPins = function (pin) {
    let pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + window.main.PIN_SIZE + `px`;
    pinElement.style.top = pin.location.y + window.main.PIN_SIZE + `px`;
    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.querySelector(`img`).alt = pin.offer.title;
    return pinElement;
  };

  const renderCards = function (card) {
    let cardElement = similarCardTemplate.cloneNode(true);
    let type = ``;
    switch (card.offer.type) {
      case `flat`:
        type = `Квартира `;
        break;
      case `bungalow`:
        type = `Бунгало `;
        break;
      case `house`:
        type = `Дом`;
        break;
      case `palace`:
        type = `Дворец`;
        break;
      default:
        type = `unknown`;
    }

    cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = type;
    cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ` комнаты для ` + card.offer.rooms + ` гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + `, выезд до ` + card.offer.checkout;
    cardElement.querySelector(`.popup__features`).textContent = card.offer.features;
    cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
    cardElement.querySelector(`.popup__photo`).src = card.offer.photos[0];
    cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;

    return cardElement;
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
      fragment.appendChild(renderCards(pins[j]));
    }
    similarListElement.appendChild(fragment);
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
      }
    });
    similarListElement.appendChild(fragment);
  };

  const removePins = function () {
    const elements = document.querySelectorAll(`.map__pin`);

    for (let i = elements.length - 1; i > 0; i--) {
      elements[i].parentNode.removeChild(elements[i]);
    }
  };

  houseType.addEventListener(`change`, function () {
    removePins();
    window.load.loadData(sortPins, errorHandler);
  });
})();
