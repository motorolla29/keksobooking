'use strict';

(function() {

var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var propertyTemplate = document.querySelector('template').content.querySelector('.map__card');

var randomInteger = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};

window.dataLoadHandlers = {
    successDataLoadHandler: function (data) {
        window.propertiesFragment = document.createDocumentFragment();
        window.pinsFragment = document.createDocumentFragment();
        window.propertyArray = data;

        for(var i = 0; i < data.length; i++) {
        
            var property = propertyTemplate.cloneNode(true);
    
            property.querySelector('.popup__avatar').setAttribute('src', data[i].author.avatar);
    
            property.querySelector('.popup__title').textContent = data[i].offer.title;
    
            property.querySelector('.popup__text--address').textContent = data[i].offer.address;
    
            property.querySelector('.popup__price').textContent = `${data[i].offer.price} ₽/ночь`;

            property.querySelector('.popup__text--capacity').textContent = `${data[i].offer.rooms} комнаты для ${data[i].offer.guests} гостей`;

            property.querySelector('.popup__text--time').textContent = `Заезд после ${data[i].offer.checkin}, выезд до ${data[i].offer.checkout}`;
    
            switch (true) {
                case (data[i].offer.type === 'flat'):
                    property.querySelector('.popup__type').textContent = 'Flat';
                    break;
                case (data[i].offer.type === 'bungalow'):
                    property.querySelector('.popup__type').textContent = 'Bungalow';
                    break;
                case (data[i].offer.type === 'house'):
                    property.querySelector('.popup__type').textContent = 'House';
                    break;
                case (data[i].offer.type === 'palace'):
                    property.querySelector('.popup__type').textContent = 'Palace';
                    break;
                case (data[i].offer.type === 'hotel'):
                    property.querySelector('.popup__type').textContent = 'Hotel';
                    break;
                default:
                    property.querySelector('.popup__type').textContent = 'Some property for rent';
                    break;
            }
    
            property.querySelector('.popup__description').textContent = data[i].offer.description;
    
            if (data[i].offer.photos) {
                for (var a = 0; a < data[i].offer.photos.length; a++) {
                    var photo = document.createElement('li');
                    photo.innerHTML = `<img src=
                    "${data[i].offer.photos[a]}">`;
                    property.querySelector('.popup__pictures').appendChild(photo);
                }   
            }
            
            
            window.propertiesFragment.appendChild(property);
        }    
    
        for (let i = 0; i < data.length; i++) {
            var mapPin = mapPinTemplate.cloneNode(true);
        
            mapPin.style = `left: ${randomInteger(130, 1200)}px; top: ${randomInteger(130, 630)}px`;
            mapPin.querySelector('img').src = data[i].author.avatar;
            mapPin.querySelector('img').setAttribute('alt', `${data[i].offer.title}`);
        
            window.pinsFragment.appendChild(mapPin);
        }
    },
    
    errorDataLoadHandler: function (errorMessage) {
        window.showModal(errorMessage, 'Повторить');
        
        var reloadBtn = document.querySelector('.modal__button');
        
        reloadBtn.addEventListener('click', () => {
            window.backend.loadData(window.dataLoadHandlers.successDataLoadHandler, window.dataLoadHandlers.errorDataLoadHandler);
        });
    }
};


window.backend.loadData(window.dataLoadHandlers.successDataLoadHandler, window.dataLoadHandlers.errorDataLoadHandler);


})();