'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapCardTemplate = document.querySelector('.map__card');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var propertyTemplate = document.querySelector('template').content.querySelector('.map__card');
var propertyArray = [];
var propertiesFragment = document.createDocumentFragment();
var pinsFragment = document.createDocumentFragment();
var noticeForm = document.querySelector('.notice__form');
var mapPinMain = document.querySelector('.map__pin--main');

noticeForm.querySelectorAll('fieldset').forEach((item) => item.setAttribute('disabled', 'disabled'));
noticeForm.querySelector('#address').value = `${window.getComputedStyle(mapPinMain).left.replace(/\D/ig, '')}, 
${window.getComputedStyle(mapPinMain).top.replace(/\D/ig, '')}`;

mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);

// Data
var avatarData = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 
'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var titleData = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", 
"Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", 
"Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

var photosData = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
"http://o0.github.io/assets/images/tokyo/hotel2.jpg", 
"http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var typeOfProperty = ["palace", "flat", "house", "bungalo"];

var checkinData = ["12:00", "13:00", "14:00"];

var checkoutData = ["12:00", "13:00", "14:00"];

var featuresData = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var avatarDataClone = Object.assign([], avatarData);

renderRandomProperty(8);

// map.classList.remove('map--faded');
// mapPins.appendChild(renderPinsFragment());
// map.insertBefore(renderPropertiesFragment(), document.querySelector('.map__filters-container'));


function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function renderRandomProperty(quantityOfProperties) {

    for (var i = 0; i < quantityOfProperties; i++) {

        var property = {
            author: {
                avatar: avatarDataClone[Math.floor(Math.random() * avatarDataClone.length)]
            },
            offer: {
                title: titleData[randomInteger(0, 7)],
                address: '',
                price: randomInteger(1000, 1000000),
                type: typeOfProperty[randomInteger(0, 4)],
                rooms: randomInteger(1, 5),
                guests: randomInteger(1, 10),
                checkin: checkinData[randomInteger(0, 2)],
                checkout: checkoutData[randomInteger(0, 2)],
                features: featuresData.sort(() => Math.random() - 0.5).slice(0, randomInteger(1, 5)),
                description: '',
                photos: photosData.sort(() => Math.random() - 0.5).slice(0, randomInteger(3, 3)),
                location: {
                    x: randomInteger(130, 1200),
                    y: randomInteger(130, 630)
                }
            }
        };
        
        property.offer.address = property.offer.location.x + ', ' + property.offer.location.y;

        avatarDataClone.splice(avatarDataClone.indexOf(property.author.avatar) , 1);
        
        propertyArray.push(property);

    }
}

function renderPinsFragment() {
    
    for (let i = 0; i < propertyArray.length; i++) {

        var mapPin = mapPinTemplate.cloneNode(true);
    
        mapPin.style = `left: ${propertyArray[i].offer.location.x}px; top: ${propertyArray[i].offer.location.y}px`;
        mapPin.querySelector('img').src = propertyArray[i].author.avatar;
        mapPin.querySelector('img').setAttribute('alt', `${propertyArray[i].offer.title}`);


        pinsFragment.appendChild(mapPin);
    }

    return pinsFragment;
}


function renderPropertiesFragment() {
    
    for(var i = 0; i < propertyArray.length; i++) {

        var property = propertyTemplate.cloneNode(true);

        property.querySelector('.popup__avatar').setAttribute('src', `${propertyArray[i].author.avatar}`);

        property.querySelector('.popup__title').textContent = propertyArray[i].offer.title;

        property.querySelector('.popup__text--address').textContent = propertyArray[i].offer.address;

        property.querySelector('.popup__price').textContent = `${propertyArray[i].offer.price} ₽/ночь`;

        switch (true) {
            case (/Квартира/i.test(propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'Flat';
                break;
            case (/Бунгало/i.test(propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'Bungalo';
                break;
            case (/Дом/i.test(propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'House';
                break;
            case (/Дворец/i.test(propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'Palace';
                break;
            default:
                property.querySelector('.popup__type').textContent = 'Some property for rent';
                break;
        }

        property.querySelector('.popup__text--capacity').textContent = `${propertyArray[i].offer.rooms} комнаты для 
        ${propertyArray[i].offer.guests} гостей.`;  

        property.querySelector('.popup__text--time').textContent = `Заезд после ${propertyArray[i].offer.checkin},
         выезд до ${propertyArray[i].offer.checkout}`;

        property.querySelector('.popup__features');


        propertyArray[i].offer.features.forEach((item) => {
            switch (true) {
                case (item == "wifi"):
                    var wifi = document.createElement('li');
                    property.querySelector('.popup__features').appendChild(wifi);
                    wifi.classList.add('feature');
                    wifi.classList.add('feature--wifi');
                    break;
                case (item == "dishwasher"):
                    var dishwasher = document.createElement('li');
                    property.querySelector('.popup__features').appendChild(dishwasher);
                    dishwasher.classList.add('feature');
                    dishwasher.classList.add('feature--dishwasher');
                    break;
                case (item == "parking"):
                    var parking = document.createElement('li');
                    property.querySelector('.popup__features').appendChild(parking);
                    parking.classList.add('feature');
                    parking.classList.add('feature--parking');
                    break;
                case (item == "washer"):
                    var washer = document.createElement('li');
                    property.querySelector('.popup__features').appendChild(washer);
                    washer.classList.add('feature');
                    washer.classList.add('feature--washer');
                    break;
                case (item == "elevator"):
                    var elevator = document.createElement('li');
                    property.querySelector('.popup__features').appendChild(elevator);
                    elevator.classList.add('feature');
                    elevator.classList.add('feature--elevator');
                    break;
                case (item == "conditioner"):
                    var conditioner = document.createElement('li');
                    property.querySelector('.popup__features').appendChild(conditioner);
                    conditioner.classList.add('feature');
                    conditioner.classList.add('feature--conditioner');
                    break;
                default:
                    break;
            }
        });

        property.querySelector('.popup__description').textContent = propertyArray[i].offer.description;
        

        for (var a = 0; a < photosData.length; a++) {
            var photo = document.createElement('li');
            photo.innerHTML = `<img src=
            "${propertyArray[i].offer.photos[a]}">`;
            property.querySelector('.popup__pictures').appendChild(photo);
        }  
        
        propertiesFragment.appendChild(property);
    }
    
    return propertiesFragment;

}

function onMapPinMainMouseup(evt) {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    noticeForm.querySelectorAll('fieldset').forEach((item) => item.removeAttribute('disabled', 'disabled'));
    mapPins.appendChild(renderPinsFragment());
    map.insertBefore(renderPropertiesFragment(), document.querySelector('.map__filters-container'));

    var mapPinsButtons = mapPins.querySelectorAll('.map__pin');
    var mapCards = map.querySelectorAll('.map__card');

    mapCards.forEach(card => {
        card.classList.add('hidden');
    });

    mapPinsButtons.forEach(item => {
        if (item !== mapPinMain) {
            item.addEventListener('click', function() {
            
                mapCards.forEach(card => {
                card.classList.add('hidden');
                });

                for (var i = 1; i <= mapCards.length; i++ ) {
                    if (item === mapPinsButtons[i]) {
                        mapCards[i-1].classList.remove('hidden');
                        var currentCard = mapCards[i-1];
                        var hideCard = function() {
                            currentCard.classList.add('hidden');
                            currentCard.querySelector('.popup__close').removeEventListener('click', hideCard);
                        };
                        currentCard.querySelector('.popup__close').addEventListener('click', hideCard);
                    }   
                }
            });
        }
    });

    noticeForm.querySelector('#address').value = `${window.getComputedStyle(evt.target).left.match(/\d/ig)}, ${window.getComputedStyle(evt.target).left.match(/\d/ig)}`;
}

// Form
var capacitySelect = document.querySelector('#capacity');
var roomNumberSelect = document.querySelector('#room_number');
var timeinSelect = document.querySelector('#timein');
var timeoutSelect = document.querySelector('#timeout');
var typeOfPropertySelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');

roomNumberSelect.addEventListener('change', function() {
    var currentVal = this.value;

    for (var i = 0; i < capacitySelect.children.length; i++) {
        capacitySelect.children[i].disabled = false;
    }

    if (currentVal === '1') {
        capacitySelect.children[0].disabled = true;
        capacitySelect.children[1].disabled = true;
        capacitySelect.children[3].disabled = true;
        capacitySelect.value = '1';
    } else if (currentVal === '2') {
        capacitySelect.children[0].disabled = true;
        capacitySelect.children[3].disabled = true;
        capacitySelect.value = '1';
    } else if (currentVal === '3') {
        capacitySelect.children[3].disabled = true;
        capacitySelect.value = '1';
    } else if (currentVal === '100') {
        capacitySelect.children[0].disabled = true;
        capacitySelect.children[1].disabled = true;
        capacitySelect.children[2].disabled = true;
        capacitySelect.value = '0';
    }
});

timeinSelect.addEventListener('change', function() {
    var currentVal = this.value;

    timeoutSelect.value = currentVal;
});

timeoutSelect.addEventListener('change', function() {
    var currentVal = this.value;

    timeinSelect.value = currentVal;
});

typeOfPropertySelect.addEventListener('change', function() {
    var currentVal = this.value;

    switch(currentVal) {
        case 'flat':
            priceInput.setAttribute('placeholder', '1000');
            priceInput.setAttribute('min', '1000');
            break;
        case 'bungalo':
            priceInput.setAttribute('placeholder', '0');
            priceInput.setAttribute('min', '0');
            break;
        case 'house':
            priceInput.setAttribute('placeholder', '5000');
            priceInput.setAttribute('min', '5000');
            break;
        case 'palace':
            priceInput.setAttribute('placeholder', '10000');
            priceInput.setAttribute('min', '10000');
            break;
        default:
            break;
    }
});