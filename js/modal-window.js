'use strict';

(function() {

var main = document.querySelector('main');

var modalNode = document.querySelector('#modal_window_template')
.content.querySelector('.modal__window__overlay').cloneNode(true);

var modalBtn = modalNode.querySelector('.modal__button');

var modalMsg = modalNode.querySelector('.modal__message');

var ESC_KEYCODE = 27;

window.showModal = function(message, buttonText) {
        main.appendChild(modalNode);
        modalMsg.textContent = message;
        modalBtn.textContent = buttonText;
        document.body.style.overflow = 'hidden';

        var onEscPressremoveModalNode = function(evt) {
                if (evt.keyCode === ESC_KEYCODE) {
                        removeModalNode();
                        document.removeEventListener('keydown', onEscPressremoveModalNode);
                }
        };

        var removeModalNode = function() {
                main.removeChild(modalNode);
                document.body.style.overflow = '';    
        };

        modalNode.addEventListener('click', (evt) => {
                if(evt.target === modalBtn || evt.target === modalNode) {
                        removeModalNode();
                }
        });

        document.addEventListener('keydown', onEscPressremoveModalNode);
        
};

})();