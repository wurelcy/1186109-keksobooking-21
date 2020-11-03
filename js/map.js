'use strict';

(function () {
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesList = mapFilters.querySelectorAll(`.map__checkbox`);

  const map = document.querySelector(`.map`);
  const mapPin = document.querySelector(`.map__pin--main`);

  const fragment = document.createDocumentFragment();

  const similarPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const similarListElement = map.querySelector(`.map__pins`);

  const renderPins = (pin) => {
    let pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + window.main.PIN_SIZE + `px`;
    pinElement.style.top = pin.location.y + window.main.PIN_SIZE + `px`;
    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.querySelector(`img`).alt = pin.offer.title;

    return pinElement;
  };

  const makeDisabled = () => {
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

    for (let i = mapCards.length - 1; i >= 0; i--) {
      mapCards[i].parentNode.removeChild(mapCards[i]);
    }
  };

  const makeActive = () => {
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`, ``);
    });
  };

  const successHandler = (pins) => {
    removeMapElements();
    for (let j = 0; j < window.data.PINS_LENGTH; j++) {
      fragment.appendChild(renderPins(pins[j]));
    }
    similarListElement.appendChild(fragment);
    window.card.openCard(pins);
  };

  const errorHandler = (errorMessage) => {
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
          case `middle`:
            return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
          case `low`:
            return pin.offer.price < 10000;
          case `high`:
            return pin.offer.price > 50000;
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
      if (selectValue !== `any`) {
        obj.filterFunction(selectValue);
      }
    });

    pins.forEach((pin, i) => {
      if (i < 5) {
        fragment.appendChild(renderPins(pin));
      }
    });

    similarListElement.appendChild(fragment);
    window.card.openCard(pins);
  };

  mapFilters.addEventListener(`change`, function () {
    removeMapElements();
    window.load.loadData(window.debounce(sortPins), errorHandler);
  });

  const resetFilters = () => {
    mapFilters.querySelectorAll(`select`).forEach((select) => {
      select.value = `any`;
    });
    housingFeaturesList.forEach((element) => {
      element.checked = false;
    });
  };

  window.map = {
    mapPin: mapPin,
    makeDisabled: makeDisabled,
    map: map,
    resetFilters: resetFilters,
    removeMapElements: removeMapElements
  };
})();
