'use strict';

(function () {
  const MIDDLE_PRICE = `middle`;
  const MIDDLE_PRICE_VALUE = 10000;
  const LOW_PRICE = `low`;
  const HIGH_PRICE_VALUE = 50000;
  const HIGH_PRICE = `high`;
  const ANY_VALUE = `any`;
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesList = mapFilters.querySelectorAll(`.map__checkbox`);
  let savedPins = [];

  const map = document.querySelector(`.map`);
  const mapPin = document.querySelector(`.map__pin--main`);

  const fragment = document.createDocumentFragment();

  const similarPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const similarListElement = map.querySelector(`.map__pins`);

  const renderPin = (pin) => {
    let pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + window.main.PIN_SIZE + `px`;
    pinElement.style.top = pin.location.y - window.main.PIN_SIZE + `px`;
    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.querySelector(`img`).alt = pin.offer.title;

    return pinElement;
  };

  const makeDisabled = () => {
    mapFilters.classList.add(`hidden`);
    fieldsets.forEach((fieldset) => {
      fieldset.setAttribute(`disabled`, ``);
    });
  };

  makeDisabled();

  const removeMapElements = () => {
    const mapPins = document.querySelectorAll(`.map__pin`);
    const mapCards = document.querySelectorAll(`.map__card`);

    for (let i = mapPins.length - 1; i > 0; i--) {
      mapPins[i].parentNode.removeChild(mapPins[i]);
    }

    mapCards.forEach((card) => {
      card.parentNode.removeChild(card);
    });
  };

  const makeActive = () => {
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    mapFilters.classList.remove(`hidden`);
    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`, ``);
    });
  };

  const onSuccess = (pins) => {
    removeMapElements();
    savedPins = pins.slice();
    for (let j = 0; j < window.data.PINS_LENGTH; j++) {
      fragment.appendChild(renderPin(pins[j]));
    }
    similarListElement.appendChild(fragment);
    window.card.openCard(pins);
  };

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #9c2727;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.color = `white`;
    node.style.right = 0;
    node.style.fontSize = `28px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0 && (map.classList.contains(`map--faded`))) {
      makeActive();
      window.backend.loadData(onSuccess, onError);
    }
  });

  mapPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.data.ENTER_BUTTON && (map.classList.contains(`map--faded`))) {
      makeActive();
      window.backend.loadData(onSuccess, onError);
    }
  });

  const sortPins = (pins) => {
    housingFeaturesList.forEach((element) => {
      if (element.checked) {
        const checkedElementFeature = element.id.replace(/filter-/gi, ``);
        pins = pins.filter((pin) => {
          return pin.offer.features.includes(checkedElementFeature);
        });
      }
    });

    const filterPinsByType = (value) => {
      pins = pins.filter((pin) => {
        return pin.offer.type === value;
      });
    };

    const filterPinsByPrice = (value) => {
      pins = pins.filter((pin) => {
        switch (value) {
          case MIDDLE_PRICE:
            return (pin.offer.price >= MIDDLE_PRICE_VALUE) && (pin.offer.price <= HIGH_PRICE_VALUE);
          case LOW_PRICE:
            return pin.offer.price < MIDDLE_PRICE_VALUE;
          case HIGH_PRICE:
            return pin.offer.price > HIGH_PRICE_VALUE;
          default:
            return false;
        }
      });
    };

    const filterPinsByRooms = (value) => {
      pins = pins.filter((pin) => {
        return pin.offer.rooms === Number(value);
      });
    };

    const filterPinsByGuests = (value) => {
      pins = pins.filter((pin) => {
        return pin.offer.guests === Number(value);
      });
    };

    const Filters = [
      {
        name: housingTypeFilter,
        filterFunction: filterPinsByType
      },
      {
        name: housingPriceFilter,
        filterFunction: filterPinsByPrice
      },
      {
        name: housingRoomsFilter,
        filterFunction: filterPinsByRooms
      },
      {
        name: housingGuestsFilter,
        filterFunction: filterPinsByGuests
      },
    ];

    Filters.forEach((obj) => {
      const selectValue = obj.name.value;
      if (selectValue !== ANY_VALUE) {
        obj.filterFunction(selectValue);
      }
    });

    pins.forEach((pin, i) => {
      if (i < 5) {
        fragment.appendChild(renderPin(pin));
      }
    });

    similarListElement.appendChild(fragment);
    window.card.openCard(pins);
  };

  const getFilteredPins = () => {
    removeMapElements();
    sortPins(savedPins);
  };

  mapFilters.addEventListener(`change`, function () {
    window.debounce(getFilteredPins());
  });

  const resetFilters = () => {
    mapFilters.querySelectorAll(`select`).forEach((select) => {
      select.value = ANY_VALUE;
    });
    housingFeaturesList.forEach((element) => {
      element.checked = false;
    });
  };

  window.map = {
    mapPin,
    makeDisabled,
    map,
    resetFilters,
    removeMapElements,
    getFilteredPins
  };
})();
