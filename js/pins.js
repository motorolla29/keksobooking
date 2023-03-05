'use strict';

(function() {

// Pins

window.pinsFragment = document.createDocumentFragment();
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

function renderPinsFragment() {
    
    for (let i = 0; i < window.propertyArray.length; i++) {

        var mapPin = mapPinTemplate.cloneNode(true);
    
        mapPin.style = `left: ${window.propertyArray[i].offer.location.x}px; top: ${window.propertyArray[i].offer.location.y}px`;
        mapPin.querySelector('img').src = window.propertyArray[i].author.avatar;
        mapPin.querySelector('img').setAttribute('alt', `${window.propertyArray[i].offer.title}`);


        window.pinsFragment.appendChild(mapPin);
    }
}

renderPinsFragment();

})();