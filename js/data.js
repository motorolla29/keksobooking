'use strict';

(function() {

// Data

window.propertyArray = [];

var noticeForm = document.querySelector('.notice__form');
var mapPinMain = document.querySelector('.map__pin--main');

noticeForm.querySelectorAll('fieldset').forEach((item) => item.setAttribute('disabled', 'disabled'));
noticeForm.querySelector('#address').value = `${window.getComputedStyle(mapPinMain).left.replace(/\D/ig, '')}, 
${window.getComputedStyle(mapPinMain).top.replace(/\D/ig, '')}`;

var avatarData = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 
'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var titleData = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", 
"Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", 
"Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

window.photosData = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
"http://o0.github.io/assets/images/tokyo/hotel2.jpg", 
"http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var typeOfProperty = ["palace", "flat", "house", "bungalo"];

var checkinData = ["12:00", "13:00", "14:00"];

var checkoutData = ["12:00", "13:00", "14:00"];

var featuresData = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var avatarDataClone = Object.assign([], avatarData);

// Rendering data

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
                photos: window.photosData.sort(() => Math.random() - 0.5).slice(0, randomInteger(3, 3)),
                location: {
                    x: randomInteger(130, 1200),
                    y: randomInteger(130, 630)
                }
            }
        };
        
        property.offer.address = property.offer.location.x + ', ' + property.offer.location.y;

        avatarDataClone.splice(avatarDataClone.indexOf(property.author.avatar) , 1);
        
        window.propertyArray.push(property);

    }
}

renderRandomProperty(8);

})();

