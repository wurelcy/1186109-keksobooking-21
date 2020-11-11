'use strict';

(function () {
  const TIMEOUT_TIME = 10000;
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };

  const uploadData = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else if (xhr.status !== 400) {
        onError();
      }
    });

    xhr.addEventListener(`error`, function () {
      onError();
    });

    xhr.addEventListener(`timeout`, function () {
      onError();
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  const loadData = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  window.backend = {
    uploadData: uploadData,
    loadData: loadData
  };
})();
