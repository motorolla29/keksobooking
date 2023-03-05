'use strict';

(function() {
    
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

})();


