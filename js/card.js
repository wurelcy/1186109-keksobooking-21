'use strict';

(function () {
  const TYPE_FLAT_EN = `flat`;
  const TYPE_BUNGALOW_EN = `bungalo`;
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

  const similarCardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

  const renderCards = function (card) {
    let cardElement = similarCardTemplate.cloneNode(true);
    const featuresList = cardElement.querySelector(`.popup__features`);
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

    cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + PRICE_TYPE;
    cardElement.querySelector(`.popup__type`).textContent = type;
    cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ROOM_TYPE + card.offer.guests + GUEST_TYPE;
    cardElement.querySelector(`.popup__text--time`).textContent = CHECKIN_TYPE + card.offer.checkin + CHECKOUT_TYPE + card.offer.checkout;

    for (let i = 0; i < card.offer.features.length; i++) {
      const node = document.createElement(`li`);
      node.classList.add(`popup__feature`);
      node.classList.add(`popup__feature--` + card.offer.features[i] + ``);
      featuresList.insertAdjacentElement('afterbegin', node);
    }

    cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
    cardElement.querySelector(`.popup__photo`).src = card.offer.photos[0];
    cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;
    cardElement.classList.add('hidden');

    return cardElement;
  };

  const openCard = function () {
    const pins = document.querySelectorAll(`.map__pin`);
    const cards = document.querySelectorAll(`.map__card`);

    for (let i = 1; i < pins.length; i++) {
      pins[i].addEventListener(`click`, function () {
        cards.forEach((item) => {
          if (!item.classList.contains(`hidden`)) {
            item.classList.add(`hidden`);
          }
        });
        cards[i - 1].classList.remove(`hidden`);
      });

      pins[i].addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          cards.forEach((item) => {
            if (!item.classList.contains(`hidden`)) {
              item.classList.add(`hidden`);
            }
          });
          cards[i - 1].classList.remove(`hidden`);
        }
      });
    }
  };

  const closeCard = function () {
    const close = document.querySelectorAll(`.popup__close`);
    const cards = document.querySelectorAll(`.map__card`);

    cards.forEach((item, i) => {
      close[i].addEventListener(`click`, function () {
        item.classList.add(`hidden`);
      });

      window.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          item.classList.add(`hidden`);
        }
      });
    });
  };

  window.card = {
    renderCards: renderCards,
    openCard: openCard,
    closeCard: closeCard
  };
})();
