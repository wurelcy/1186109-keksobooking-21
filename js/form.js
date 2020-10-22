'use strict';

(function () {
  const roomsOption = document.querySelector(`#room_number`);
  const guestsOption = document.querySelector(`#capacity`);
  const address = document.querySelector(`#address`);
  const price = document.querySelector(`#price`);
  const type = document.querySelector(`#type`);
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  const houseFileChooser = document.querySelector('#images');
  const housePreview = document.querySelector('.ad-form__photo');
  const userFileChooser = document.querySelector('#avatar');
  const userPreview = document.querySelector('ad-form-header__preview img');

  address.setAttribute('readonly', ``);

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;

  const validateTitle = function () {
    const titleInput = document.querySelector(`#title`);

    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.addEventListener('input', function () {
      let valueLength = titleInput.value.length;

      if (valueLength < MIN_TITLE_LENGTH) {
        titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
      } else if (valueLength > MAX_TITLE_LENGTH) {
        titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
      } else {
        titleInput.setCustomValidity('');
      }
    });
  };

  const validatePrice = function () {
    let priceValue = price.value;
    let minPrice = 1000;

    type.addEventListener(`change`, function () {
      switch (type.value) {
        case `flat`:
          minPrice = 1000;
          break;
        case `bungalow`:
          minPrice = 0;
          break;
        case `house`:
          minPrice = 5000;
          break;
        case `palace`:
          minPrice = 10000;
          break;
        default:
          minPrice = 0;
      }
      console.log(minPrice);
    });

    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }

    price.addEventListener('input', function () {
      price.setCustomValidity('');
      console.log(price);
      if (priceValue < minPrice) {
        price.setCustomValidity('Надо больше');
      } else if (priceValue > MAX_PRICE) {
        price.setCustomValidity('Будьте скромнее');
      } else {
        price.setCustomValidity('');
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
      if (roomsOption.value < guestsOption.value) {
        guestsOption.setCustomValidity(`Слишком много гостей`);
      } else {
        guestsOption.setCustomValidity(``);
      }
    });
    roomsOption.addEventListener(`change`, function () {
      if (roomsOption.value < guestsOption.value) {
        guestsOption.setCustomValidity(`Слишком много гостей`);
      } else {
        guestsOption.setCustomValidity(``);
      }
    });
  };

  const validatePhoto = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      let file = fileChooser.files[0];
      let fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
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
})();
