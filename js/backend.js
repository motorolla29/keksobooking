'use strict';

(function() {

window.backend = {

    loadData: function(onLoad, onError) {
      var URL = 'https://24.javascript.pages.academy/keksobooking/data';
    
      var xhr = new XMLHttpRequest();
    
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        } 
      });
            

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
            
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
            
      xhr.open('GET', URL);
      xhr.send();
    },
    
    sendForm: function(data, onLoad, onError) {
        var URL = 'https://24.javascript.pages.academy/keksobooking';
    
        var xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        
        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
              onLoad('Форма отправлена!');
            } else {
              onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
    
        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });
            
        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.open('POST', URL);

        xhr.send(data);
    }
};
}());