'use strict';
(function() {
var selectFilters = document.querySelectorAll('.map__filters select'),
    mapCards,
    mapPins,
    map = document.querySelector('.map'),
    selectFeatures = document.querySelector('#housing-features'),
    selectFeaturesCheckboxes = selectFeatures.querySelectorAll('input'),
    housingType = document.querySelector('#housing-type'),
    housingPrice = document.querySelector('#housing-price'),
    housingRooms = document.querySelector('#housing-rooms'),
    housingGuests = document.querySelector('#housing-guests'),
    sortedArray = [];

    
    var showPins = function() {
        mapPins.forEach((item) => {
            item.classList.remove('hidden');
        });
    };

    var sortPins = function() {
        for (var i = 0; i < mapCards.length; i++) {
            var mapCardPrice = mapCards[i].querySelector('.popup__price').textContent.match(/\d/g).join('');
            var mapCardType = mapCards[i].querySelector('.popup__type').textContent.toLowerCase();
            var mapCardRooms = mapCards[i].querySelector('.popup__text--capacity').textContent.match(/[\d]+ комнат/g)[0].match(/\d/g).join('');
            var mapCardGuests = mapCards[i].querySelector('.popup__text--capacity').textContent.match(/[\d]+ гост/g)[0].match(/\d/g).join('');
            var mapCardFeatures = mapCards[i].querySelector('.popup__features').querySelectorAll('.feature');
            var hidePin = () => mapPins[i+1].classList.add('hidden');

            // Функция проверки имеющихся опций в жилье
            var doPropertyHaveAFeature = function(feature) {
                var res;
                for (var i = 0; i < mapCardFeatures.length; i++) {
                    if (mapCardFeatures[i].classList.contains(feature)) {
                        res = true;
                    }
                }
                return res;
            };

            if ((mapCardType !== housingType.value) && (housingType.value !== 'any')) {
                hidePin();
            } else if (
                (housingPrice.value !== 'any') && 
                ((mapCardPrice < 10000 && housingPrice.value !== 'low') ||
                ((mapCardPrice >= 10000 && mapCardPrice <= 50000) && (housingPrice.value !== 'middle')) ||
                (mapCardPrice > 50000 && housingPrice.value !== 'high'))
            ) {
                hidePin();
            } else if (
                (housingRooms.value !== 'any') && 
                (mapCardRooms != housingRooms.value)
            ) {
                hidePin();
            } else if (
                (housingGuests.value !== 'any') && 
                (mapCardGuests != housingGuests.value)
            ) {
                hidePin();
            } else if (
                (selectFeaturesCheckboxes[0].checked || selectFeaturesCheckboxes[1].checked || 
                selectFeaturesCheckboxes[2].checked || selectFeaturesCheckboxes[3].checked || 
                selectFeaturesCheckboxes[4].checked || selectFeaturesCheckboxes[5].checked) && 
                
                (((selectFeaturesCheckboxes[0].checked) && 
                    !(doPropertyHaveAFeature('feature--wifi'))) || 

                ((selectFeaturesCheckboxes[1].checked) && 
                    !(doPropertyHaveAFeature('feature--dishwasher'))) || 

                ((selectFeaturesCheckboxes[2].checked) && 
                    !(doPropertyHaveAFeature('feature--parking'))) || 

                ((selectFeaturesCheckboxes[3].checked) && 
                    !(doPropertyHaveAFeature('feature--washer'))) || 

                ((selectFeaturesCheckboxes[4].checked) && 
                    !(doPropertyHaveAFeature('feature--elevator'))) || 

                ((selectFeaturesCheckboxes[5].checked) && 
                    !(doPropertyHaveAFeature('feature--conditioner'))))
            ) {
                hidePin();
            } 
        }
    };
    

    var updatePins = function() {
        mapCards = document.querySelectorAll('.map__card');
        mapPins = document.querySelectorAll('.map__pin');
        showPins();
        sortPins();
    };
    
    selectFilters.forEach((item) => {
        item.addEventListener('change', updatePins);
    });
    
    selectFeaturesCheckboxes.forEach((item) => {
        item.addEventListener('change', updatePins);
    });
    

})();