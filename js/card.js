'use strict';

(function () {
  const similarCardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

  const renderCards = function (card) {
    let cardElement = similarCardTemplate.cloneNode(true);
    const featuresList = cardElement.querySelector(`.popup__features`);
    featuresList.innerHTML = ``;
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
