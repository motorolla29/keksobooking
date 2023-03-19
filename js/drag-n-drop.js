'use strict';

(function() {

var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
var MAP_PIN_MAIN_HEIGHT = 53;
var Y_AXIS_OFFSET = 351;

window.renderPinsAndCards = function() {
    map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        noticeFormFieldsets.forEach((item) => item.removeAttribute('disabled', 'disabled'));
        mapPins.appendChild(window.pinsFragment);
        map.insertBefore(window.propertiesFragment, document.querySelector('.map__filters-container'));

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
};

var onMapPinMainMousedown = function(downEvt) {
    
    downEvt.preventDefault();

    var startCoords = {
        x: downEvt.clientX,
        y: downEvt.clientY
    };

    var onMapPinMainMousemove = function(moveEvt) {
        
        moveEvt.preventDefault();


        var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

        mapPinMain.style.top = (startCoords.y - shift.y) + 'px';
        mapPinMain.style.left = (startCoords.x - Y_AXIS_OFFSET - shift.x) + 'px';

    };

        var onMapPinMainMouseup = function(upEvt) {

        window.renderPinsAndCards();
    
        noticeForm.querySelector('#address').value = `${startCoords.x - Y_AXIS_OFFSET}, ${startCoords.y + MAP_PIN_MAIN_HEIGHT}`;

        map.removeEventListener('mousemove', onMapPinMainMousemove);
        document.removeEventListener('mouseup', onMapPinMainMouseup);
    };

    map.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);

};

mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);

})();


