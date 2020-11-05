'use strict';

(function () {
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
  const DEFAULT_ADDRESS_Y = `406`;
  const DEFAULT_ADDRESS_X = `580`;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

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

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;

  const validateTitle = function () {
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

  const validatePrice = function () {
    let minPrice = 1000;

    type.addEventListener(`change`, function () {
      switch (type.value) {
        case window.card.TYPE_FLAT_EN:
          minPrice = 1000;
          break;
        case window.card.TYPE_BUNGALOW_EN:
          minPrice = 0;
          break;
        case window.card.TYPE_HOUSE_EN:
          minPrice = 5000;
          break;
        case window.card.TYPE_PALACE_EN:
          minPrice = 10000;
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

  const setTime = function () {
    timeIn.addEventListener(`change`, function () {
      timeOut.value = timeIn.value;
    });

    timeOut.addEventListener(`change`, function () {
      timeIn.value = timeOut.value;
    });
  };

  const validateSelect = function () {
    guestsOption.addEventListener(`change`, function () {
      const guestsValue = parseInt(guestsOption.value, 10);
      const roomsValue = parseInt(roomsOption.value, 10);

      if ((roomsValue < guestsValue && guestsValue > 0) || (guestsValue === 0 && roomsValue !== 100) || (guestsValue > 0 && roomsValue === 100)) {
        guestsOption.setCustomValidity(`Слишком много гостей`);
      } else {
        guestsOption.setCustomValidity(``);
      }
    });
    roomsOption.addEventListener(`change`, function () {
      const guestsValue = parseInt(guestsOption.value, 10);
      const roomsValue = parseInt(roomsOption.value, 10);

      if ((roomsValue < guestsValue && guestsValue > 0) || (guestsValue === 0 && roomsValue !== 100) || (guestsValue > 0 && roomsValue === 100)) {
        guestsOption.setCustomValidity(`Слишком много гостей`);
      } else {
        guestsOption.setCustomValidity(``);
      }
    });
  };

  const validatePhoto = function (fileChooser, preview) {
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

  const renederSuccess = function () {
    let successElement = successTemplate.cloneNode(true);
    return successElement;
  };

  const renederError = function () {
    let errorElement = errorTemplate.cloneNode(true);
    return errorElement;
  };

  const clearForm = function () {
    titleInput.value = ``;
    price.value = ``;
    description.value = ``;
    roomsOption.value = 1;
    guestsOption.value = 1;
    timeOut.value = `12:00`;
    timeIn.value = `12:00`;
    type.value = window.card.TYPE_FLAT_EN;
    housePreview.value = ``;
    featuresList.forEach((item) => {
      item.checked = false;
    });
    address.value = DEFAULT_ADDRESS_Y + `,` + DEFAULT_ADDRESS_X;
    mainPin.style.top = DEFAULT_ADDRESS_Y + `px`;
    mainPin.style.left = DEFAULT_ADDRESS_X + `px`;
    window.map.resetFilters();
  };

  const closeSuccessMessage = function () {
    const message = document.querySelector(`.success`);
    window.addEventListener(`click`, function () {
      message.remove();
    });

    window.addEventListener(`keydown`, function (evt) {
      if (evt.key === window.data.escapeButton) {
        message.remove();
      }
    });
  };

  const closeErrorMessage = function () {
    const message = document.querySelector(`.error`);
    const closeBtn = document.querySelector(`.error__button`);

    closeBtn.addEventListener(`click`, function () {
      message.remove();
    });

    window.addEventListener(`keydown`, function (evt) {
      if (evt.key === window.data.escapeButton) {
        message.remove();
      }
    });
  };

  resetFormButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    clearForm();
  });

  const successSubmit = function () {
    fragment.appendChild(renederSuccess());
    form.classList.add(`ad-form--disabled`);
    window.map.makeDisabled();
    window.map.map.classList.add(`map--faded`);
    clearForm();
    closeSuccessMessage();
    window.map.removeMapElements();
  };

  const errorSubmit = function () {
    fragment.appendChild(renederError());
    closeErrorMessage();
  };

  const submitHandler = function (evt) {
    evt.preventDefault();
    window.upload.uploadData(new FormData(form), successSubmit, errorSubmit);
  };

  form.addEventListener(`submit`, submitHandler);

  window.form = {
    address
  };
})();
