'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const BUNGALOW_MIN_PRICE = 0;
  const FLAT_MIN_PRICE = 1000;
  const HOUSE_MIN_PRICE = 5000;
  const PALACE_MIN_PRICE = 10000;
  const DEFAULT_TIME = `12:00`;
  const DEFAULT_AMOUNT = 1;
  const DEFAULT_ADDRESS_Y = `406`;
  const DEFAULT_ADDRESS_X = `580`;
  const AVATAR_SRC = `img/muffin-grey.svg`;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const roomsOption = document.querySelector(`#room_number`);
  const guestsOption = document.querySelector(`#capacity`);
  const address = document.querySelector(`#address`);
  const price = document.querySelector(`#price`);
  const type = document.querySelector(`#type`);
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);
  const titleInput = document.querySelector(`#title`);
  const description = document.querySelector(`#description`);
  const resetFormButton = document.querySelector(`.ad-form__reset`);
  const featuresList = document.querySelectorAll(`.feature__checkbox`);
  const mainPin = window.map.mapPin;

  const houseFileChooser = document.querySelector(`#images`);
  const housePreview = document.querySelector(`.ad-form__photo`);
  const userFileChooser = document.querySelector(`#avatar`);
  const userPreview = document.querySelector(`.ad-form-header__preview img`);

  const form = document.querySelector(`.ad-form`);
  const successTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
  const fragment = document.querySelector(`.notice`);

  address.setAttribute(`readonly`, ``);

  const validateTitle = () => {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity(`Обязательное поле`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.addEventListener(`input`, function () {
      let valueLength = titleInput.value.length;

      if (valueLength < MIN_TITLE_LENGTH) {
        titleInput.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
      } else if (valueLength > MAX_TITLE_LENGTH) {
        titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
      } else {
        titleInput.setCustomValidity(``);
      }
    });
  };

  const validatePrice = () => {
    let minPrice = FLAT_MIN_PRICE;

    type.addEventListener(`change`, function () {
      switch (type.value) {
        case window.card.TYPE_FLAT_EN:
          minPrice = FLAT_MIN_PRICE;
          price.setAttribute(`placeholder`, FLAT_MIN_PRICE);
          break;
        case window.card.TYPE_BUNGALOW_EN:
          minPrice = BUNGALOW_MIN_PRICE;
          price.setAttribute(`placeholder`, BUNGALOW_MIN_PRICE);
          break;
        case window.card.TYPE_HOUSE_EN:
          minPrice = HOUSE_MIN_PRICE;
          price.setAttribute(`placeholder`, HOUSE_MIN_PRICE);
          break;
        case window.card.TYPE_PALACE_EN:
          minPrice = PALACE_MIN_PRICE;
          price.setAttribute(`placeholder`, PALACE_MIN_PRICE);
          break;
        default:
          minPrice = 0;
      }
    });

    if (price.validity.valueMissing) {
      price.setCustomValidity(`Обязательное поле`);
    } else {
      price.setCustomValidity(``);
    }

    price.addEventListener(`input`, function () {
      let priceValue = price.value;
      price.setCustomValidity(``);
      if (priceValue < minPrice) {
        price.setCustomValidity(`Надо больше`);
      } else if (priceValue > MAX_PRICE) {
        price.setCustomValidity(`Будьте скромнее`);
      } else {
        price.setCustomValidity(``);
      }
    });
  };

  const setTime = () => {
    timeIn.addEventListener(`change`, function () {
      timeOut.value = timeIn.value;
    });

    timeOut.addEventListener(`change`, function () {
      timeIn.value = timeOut.value;
    });
  };

  const validateSelect = function () {
    const validateGuests = () => {
      const guestsValue = parseInt(guestsOption.value, 10);
      const roomsValue = parseInt(roomsOption.value, 10);

      const isSomeCondition = (roomsValue < guestsValue && guestsValue > 0) || (guestsValue === 0 && roomsValue !== 100) || (guestsValue > 0 && roomsValue === 100);
      guestsOption.setCustomValidity(isSomeCondition ? `Слишком много гостей` : ``);
    };
    guestsOption.addEventListener(`change`, function () {
      validateGuests();
    });
    roomsOption.addEventListener(`change`, function () {
      validateGuests();
    });
  };

  const validatePhoto = (fileChooser, preview) => {
    fileChooser.addEventListener(`change`, function () {
      let file = fileChooser.files[0];
      let fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  setTime();
  validateTitle();
  validatePrice();
  validateSelect();
  validatePhoto(houseFileChooser, housePreview);
  validatePhoto(userFileChooser, userPreview);

  const renederSuccess = () => {
    let successElement = successTemplate.cloneNode(true);
    return successElement;
  };

  const renederError = () => {
    let errorElement = errorTemplate.cloneNode(true);
    return errorElement;
  };

  const clearForm = () => {
    titleInput.value = ``;
    price.value = ``;
    description.value = ``;
    roomsOption.value = DEFAULT_AMOUNT;
    guestsOption.value = DEFAULT_AMOUNT;
    userPreview.src = AVATAR_SRC;
    timeOut.value = DEFAULT_TIME;
    timeIn.value = DEFAULT_TIME;
    type.value = window.card.TYPE_FLAT_EN;
    housePreview.value = ``;
    featuresList.forEach((item) => {
      item.checked = false;
    });
    address.value = DEFAULT_ADDRESS_Y + `,` + DEFAULT_ADDRESS_X;
    mainPin.style.top = DEFAULT_ADDRESS_Y + `px`;
    mainPin.style.left = DEFAULT_ADDRESS_X + `px`;
    window.map.resetFilters();
    form.classList.add(`ad-form--disabled`);
    window.map.makeDisabled();
    window.map.map.classList.add(`map--faded`);
    window.map.removeMapElements();
  };

  const closeSuccessMessage = () => {
    const message = document.querySelector(`.success`);

    const onCloseMessage = () => {
      message.remove();

      document.removeEventListener(`keydown`, function (evt) {
        if (evt.key === window.data.ESCAPE_BUTTON) {
          message.remove();
        }
      });
    };

    document.addEventListener(`click`, function () {
      onCloseMessage();
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === window.data.ESCAPE_BUTTON) {
        onCloseMessage();
      }
    });
  };

  const closeErrorMessage = () => {
    const message = document.querySelector(`.error`);
    const closeBtn = document.querySelector(`.error__button`);

    const onCloseMessage = () => {
      message.remove();

      document.removeEventListener(`keydown`, function (evt) {
        if (evt.key === window.data.ESCAPE_BUTTON) {
          message.remove();
        }
      });
    };

    closeBtn.addEventListener(`click`, function () {
      message.remove();
    });

    window.addEventListener(`keydown`, function (evt) {
      if (evt.key === window.data.ESCAPE_BUTTON) {
        onCloseMessage();
      }
    });
  };

  resetFormButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    clearForm();
  });

  const successSubmit = () => {
    fragment.appendChild(renederSuccess());
    clearForm();
    closeSuccessMessage();
  };

  const errorSubmit = () => {
    fragment.appendChild(renederError());
    closeErrorMessage();
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    window.backend.uploadData(new FormData(form), successSubmit, errorSubmit);
  };

  form.addEventListener(`submit`, onSubmit);

  window.form = {
    address
  };
})();
