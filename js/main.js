'use strict';

const TIMES = [`12:00`, `13:00`, `14:00`];
const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PRICES = [5200, 7800, 25000, 3000];
const ROOMS = [1, 2, 3];
const GUESTS = [0, 1, 2];
const DESCRIPTIONS = [`decription1`, `decription2`, `decription3`, `decription4`];
const TITLES = [`title1`, `title2`, `title3`, `title4`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
let pins = new Array(8);
let features = [];
const minY = 130;
const maxY = 630;
const minX = 0;
const maxX = 1200;
const size = 62;

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

let fragment = document.createDocumentFragment();

let similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

let similarListElement = map.querySelector('map__pins');

let getRandomNumber = function (randomNumber) {
  return Math.floor(Math.random() * randomNumber);
};

let getRandomFromMin = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

let generateFeatures = function (array) {
  for (let i = 0; i < getRandomNumber(array.length); i++) {
    features[i] = array[i];
  }
  return features;
};

let fillPins = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`
      },
      offer: {
        title: TITLES[getRandomNumber(TITLES.length)],
        address: getRandomFromMin(minX, maxX) + `, ` + getRandomFromMin(minY, maxY),
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
        x: getRandomFromMin(minX, maxX),
        y: getRandomFromMin(minY, maxY)
      }
    };
  }
  return array;
};

fillPins(pins);

let renderPins = function (pin) {
  let pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector(`.map__pin`).style.left = pin.location.x + size + `px`;
  pinElement.querySelector(`.map__pin`).style.top = pin.location.y + size + `px`;
  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt.textContent = pin.offer.title;

  return pinElement;
};

for (let j = 0; j < pins.length; j++) {
  fragment.appendChild(renderPins(pins[j]));
}
similarListElement.appendChild(fragment);
