'use strict';
(function() {
var selectFilters = document.querySelectorAll('.map__filters select'),
    selectFeatures = document.querySelector('#housing-features'),
    selectFeaturesCheckboxes = selectFeatures.querySelectorAll('input'),
    housingType = document.querySelector('#housing-type'),
    housingPrice = document.querySelector('#housing-price'),
    housingRooms = document.querySelector('#housing-rooms'),
    housingGuests = document.querySelector('#housing-guests'),
    sortedArray = [];

var arraySort = function(arr) {
    
        // По типу
        sortedArray = arr.filter(function(item) {
            return ((item.offer.type === housingType.value) || (housingType.value === 'any'));
        });

        // По цене
        sortedArray = sortedArray.filter(function(item) {
            return (((item.offer.price < 10000) && (housingPrice.value === 'any' || housingPrice.value === 'low')) || 
            ((item.offer.price >= 10000 && item.offer.price < 50000) && (housingPrice.value === 'any' || housingPrice.value === 'middle')) || 
            ((item.offer.price >= 50000) && (housingPrice.value === 'any' || housingPrice.value === 'high')));
        });

        // По кол-ву комнат
        sortedArray = sortedArray.filter(function(item) {
            return ((item.offer.rooms == housingRooms.value) || (housingRooms.value === 'any'));
        });
    
        // По кол-ву гостей
        sortedArray = sortedArray.filter(function(item) {
            return ((item.offer.guests == housingGuests.value) || (housingGuests.value === 'any'));
        });

        // По опциям
        sortedArray = sortedArray.filter(function(item) {
            if (selectFeaturesCheckboxes[0].checked || selectFeaturesCheckboxes[1].checked || selectFeaturesCheckboxes[2].checked || 
                selectFeaturesCheckboxes[3].checked || selectFeaturesCheckboxes[4].checked || selectFeaturesCheckboxes[5].checked) {
                    return ((item.offer.features) && 

                        ((!(selectFeaturesCheckboxes[0].checked) || 
                            ((item.offer.features.includes('wifi')) && (selectFeaturesCheckboxes[0].checked))) && 

                        (!(selectFeaturesCheckboxes[1].checked) || 
                            ((item.offer.features.includes('dishwasher')) && (selectFeaturesCheckboxes[1].checked))) && 

                        (!(selectFeaturesCheckboxes[2].checked) || 
                            ((item.offer.features.includes('parking')) && (selectFeaturesCheckboxes[2].checked))) && 

                        (!(selectFeaturesCheckboxes[3].checked) || 
                            ((item.offer.features.includes('washer')) && (selectFeaturesCheckboxes[3].checked))) && 

                        (!(selectFeaturesCheckboxes[4].checked) || 
                            ((item.offer.features.includes('elevator')) && (selectFeaturesCheckboxes[4].checked))) && 

                        (!(selectFeaturesCheckboxes[5].checked) || 
                            ((item.offer.features.includes('conditioner')) && (selectFeaturesCheckboxes[5].checked)))));
            } else {
                    return true;
            }
            
        });
    
    return sortedArray;

};

var updatePinsAndCards = function() {
    window.removeCardsAndPins();
    window.backend.loadData(window.dataLoadHandlers.successDataLoadHandler, window.dataLoadHandlers.errorDataLoadHandler);
    window.dataLoadHandlers.successDataLoadHandler(arraySort(window.propertyArray));
    window.renderPinsAndCards();
};

selectFilters.forEach((item) => {
    item.addEventListener('change', updatePinsAndCards);
});

selectFeaturesCheckboxes.forEach((item) => {
    item.addEventListener('change', updatePinsAndCards);
});

})();
