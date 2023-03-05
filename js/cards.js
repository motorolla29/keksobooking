'use strict';

(function() {
    
// Cards


window.propertiesFragment = document.createDocumentFragment();
var propertyTemplate = document.querySelector('template').content.querySelector('.map__card');

function renderPropertiesFragment() {
    
    for(var i = 0; i < window.propertyArray.length; i++) {

        var property = propertyTemplate.cloneNode(true);

        property.querySelector('.popup__avatar').setAttribute('src', `${window.propertyArray[i].author.avatar}`);

        property.querySelector('.popup__title').textContent = window.propertyArray[i].offer.title;

        property.querySelector('.popup__text--address').textContent = window.propertyArray[i].offer.address;

        property.querySelector('.popup__price').textContent = `${window.propertyArray[i].offer.price} ₽/ночь`;

        switch (true) {
            case (/Квартира/i.test(window.propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'Flat';
                break;
            case (/Бунгало/i.test(window.propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'Bungalo';
                break;
            case (/Дом/i.test(window.propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'House';
                break;
            case (/Дворец/i.test(window.propertyArray[i].offer.title)):
                property.querySelector('.popup__type').textContent = 'Palace';
                break;
            default:
                property.querySelector('.popup__type').textContent = 'Some property for rent';
                break;
        }

        property.querySelector('.popup__text--capacity').textContent = `${window.propertyArray[i].offer.rooms} комнаты для 
        ${window.propertyArray[i].offer.guests} гостей.`;  

        property.querySelector('.popup__text--time').textContent = `Заезд после ${window.propertyArray[i].offer.checkin},
         выезд до ${window.propertyArray[i].offer.checkout}`;

        property.querySelector('.popup__features');


        window.propertyArray[i].offer.features.forEach((item) => {
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

        property.querySelector('.popup__description').textContent = window.propertyArray[i].offer.description;
        

        for (var a = 0; a < window.photosData.length; a++) {
            var photo = document.createElement('li');
            photo.innerHTML = `<img src=
            "${window.propertyArray[i].offer.photos[a]}">`;
            property.querySelector('.popup__pictures').appendChild(photo);
        }  
        
        window.propertiesFragment.appendChild(property);
    }
    
}

renderPropertiesFragment();

})();