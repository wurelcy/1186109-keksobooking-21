'use strict';

(function () {
  const TYPE_FLAT_EN = `flat`;
  const TYPE_BUNGALOW_EN = `bungalow`;
  const TYPE_HOUSE_EN = `house`;
  const TYPE_PALACE_EN = `palace`;
  const TYPE_FLAT_RU = `Квартира`;
  const TYPE_BUNGALOW_RU = `Бунгало`;
  const TYPE_HOUSE_RU = `Дом`;
  const TYPE_PALACE_RU = `Дворец`;
  const PRICE_TYPE = `₽/ночь`;
  const ROOM_TYPE = ` комнаты для `;
  const GUEST_TYPE = ` гостей`;
  const CHECKIN_TYPE = `Заезд после `;
  const CHECKOUT_TYPE = `, выезд до `;
  const mapArea = document.querySelector(`.map`);
  const insertTargetElement = mapArea.querySelector(`.map__filters-container`);

  const similarCardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);
  const cardFragment = document.createDocumentFragment();

  const fillPhotos = (template, photo) => {
    const imgElement = template.cloneNode(true);
    imgElement.setAttribute(`src`, photo);
    return imgElement;
  };

  const fillPhotosBlock = (imgArray) => {
    const imgTemplate = document.cardElement.querySelector(`.popup__photos`).querySelector(`img`);
    if (imgArray.length > 0) {
      const imgList = document.cardElement.querySelector(`.popup__photos`);
      const imgFragment = document.createDocumentFragment();
      document.cardElement.querySelector(`.popup__photos`).querySelector(`img`).setAttribute(`src`, imgArray[0]);
      for (let i = 1; i < imgArray.length; i++) {
        imgFragment.appendChild(fillPhotos(imgTemplate, imgArray[i]));
      }
      imgList.appendChild(imgFragment);
    } else {
      document.cardElement.querySelector(`.popup__photos`).querySelector(`img`).remove();
    }
  };

  const renderCards = (card) => {
    document.cardElement = similarCardTemplate.cloneNode(true);
    const featuresList = document.cardElement.querySelector(`.popup__features`);
    featuresList.innerHTML = ``;
    let type = ``;
    switch (card.offer.type) {
      case TYPE_FLAT_EN:
        type = TYPE_FLAT_RU;
        break;
      case TYPE_BUNGALOW_EN:
        type = TYPE_BUNGALOW_RU;
        break;
      case TYPE_HOUSE_EN:
        type = TYPE_HOUSE_RU;
        break;
      case TYPE_PALACE_EN:
        type = TYPE_PALACE_RU;
        break;
      default:
        type = `unknown`;
    }

    document.cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
    document.cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
    document.cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + PRICE_TYPE;
    document.cardElement.querySelector(`.popup__type`).textContent = type;
    document.cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ROOM_TYPE + card.offer.guests + GUEST_TYPE;
    document.cardElement.querySelector(`.popup__text--time`).textContent = CHECKIN_TYPE + card.offer.checkin + CHECKOUT_TYPE + card.offer.checkout;

    card.offer.features.forEach((feature) => {
      const node = document.createElement(`li`);
      node.classList.add(`popup__feature`);
      node.classList.add(`popup__feature--` + feature + ``);
      featuresList.insertAdjacentElement('afterbegin', node);
    });

    document.cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
    fillPhotosBlock(card.offer.photos);
    document.cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;

    return document.cardElement;
  };

  const removeExistPin = () => {
    const mapAreaElement = window.map.map.querySelector(`.map__card`);
    if (mapAreaElement) {
      mapAreaElement.remove();
    }
  };

  const closeCard = () => {
    const close = document.querySelectorAll(`.popup__close`);
    const card = document.querySelector(`.map__card`);

    const closeCardHandler = () => {
      card.remove();

      document.removeEventListener('keydown', function (evt) {
        if (evt.key === window.data.ESCAPE_BUTTON) {
          card.remove();
        }
      });
    };

    close.forEach((item, i) => {
      close[i].addEventListener(`click`, function () {
        card.remove();
      });

      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === window.data.ESCAPE_BUTTON) {
          closeCardHandler();
        }
      });
    });
  };

  const openCard = (pinsArray) => {
    const pins = document.querySelectorAll(`.map__pin`);
    removeExistPin();

    pins.forEach((pin, i) => {
      const currentPin = pinsArray[i - 1];
      pin.addEventListener(`click`, function () {
        removeExistPin();
        cardFragment.appendChild(renderCards(currentPin));
        mapArea.insertBefore(cardFragment, insertTargetElement);
        closeCard();
      });

      pin.addEventListener(`keydown`, function (evt) {
        if (evt.key === window.data.ENTER_BUTTON) {
          removeExistPin();
          cardFragment.appendChild(renderCards(currentPin));
          mapArea.insertBefore(cardFragment, insertTargetElement);
          closeCard();
        }
      });
    });
  };

  window.card = {
    openCard: openCard,
    closeCard: closeCard,
    TYPE_FLAT_EN: TYPE_FLAT_EN,
    TYPE_BUNGALOW_EN: TYPE_BUNGALOW_EN,
    TYPE_PALACE_EN: TYPE_PALACE_EN,
    TYPE_HOUSE_EN: TYPE_HOUSE_EN
  };
})();
