'use strict';

(function() {

window.propertiesFragment = document.createDocumentFragment();
window.pinsFragment = document.createDocumentFragment();
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var propertyTemplate = document.querySelector('template').content.querySelector('.map__card');

var randomInteger = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};

window.dataLoadHandlers = {
    successDataLoadHandler: function (propertyArray) {

        for(var i = 0; i < propertyArray.length; i++) {
        
            var property = propertyTemplate.cloneNode(true);
    
            property.querySelector('.popup__avatar').setAttribute('src', propertyArray[i].author.avatar);
    
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
    
            property.querySelector('.popup__description').textContent = propertyArray[i].offer.description;
    
            if (propertyArray[i].offer.photos) {
                for (var a = 0; a < propertyArray[i].offer.photos.length; a++) {
                    var photo = document.createElement('li');
                    photo.innerHTML = `<img src=
                    "${propertyArray[i].offer.photos[a]}">`;
                    property.querySelector('.popup__pictures').appendChild(photo);
                }   
            }
            
            
            window.propertiesFragment.appendChild(property);
        }    
    
        for (let i = 0; i < propertyArray.length; i++) {
            var mapPin = mapPinTemplate.cloneNode(true);
        
            mapPin.style = `left: ${randomInteger(130, 1200)}px; top: ${randomInteger(130, 630)}px`;
            mapPin.querySelector('img').src = propertyArray[i].author.avatar;
            mapPin.querySelector('img').setAttribute('alt', `${propertyArray[i].offer.title}`);
        
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