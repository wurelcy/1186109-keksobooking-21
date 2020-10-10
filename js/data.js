'use strict';

(function () {
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PRICES = [5200, 7800, 25000, 3000];
  const ROOMS = [1, 2, 3];
  const GUESTS = [0, 1, 2];
  const DESCRIPTIONS = [`decription1`, `decription2`, `decription3`, `decription4`];
  const TITLES = [`title1`, `title2`, `title3`, `title4`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const pins = [];
  const PINS_LENGTH = 8;
  const features = [];
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1000;

  const getRandomFromMin = function (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const getRandomNumber = function (randomNumber) {
    return Math.floor(Math.random() * randomNumber);
  };

  const generateFeatures = function (array) {
    for (let i = 0; i < getRandomNumber(array.length); i++) {
      features[i] = array[i];
    }
    return features;
  };

  const fillPins = function (array) {
    for (let i = 0; i < PINS_LENGTH; i++) {
      array[i] = {
        author: {
          avatar: `img/avatars/user0` + (i + 1) + `.png`
        },
        offer: {
          title: TITLES[getRandomNumber(TITLES.length)],
          address: getRandomFromMin(MIN_X, MAX_X) + `, ` + getRandomFromMin(MIN_Y, MAX_Y),
          price: PRICES[getRandomNumber(PRICES.length)],
          type: HOUSE_TYPES[getRandomNumber(HOUSE_TYPES.length)],
          rooms: ROOMS[getRandomNumber(ROOMS.length)],
          guests: GUESTS[getRandomNumber(GUESTS.length)],
          checkin: TIMES[getRandomNumber(TIMES.length)],
          checkout: TIMES[getRandomNumber(TIMES.length)],
          features: generateFeatures(FEATURES),
          description: DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)],
          photos: PHOTOS[getRandomNumber(PHOTOS.length)]
        },
        location: {
          x: getRandomFromMin(MIN_X, MAX_X),
          y: getRandomFromMin(MIN_Y, MAX_Y)
        }
      };
    }
    return array;
  };

  fillPins(pins);
  window.data = {
    PINS_LENGTH: PINS_LENGTH,
    pins: pins
  };
})();