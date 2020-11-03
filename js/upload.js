'use strict';

(function () {
  const URL = 'https://21.javascript.pages.academy/keksobooking';
  const StatusCode = {
    OK: 200
  };

  const uploadData = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    uploadData: uploadData
  };
})();
