/*
  StatusMessage
  depends on app.animate.
*/
/*
  global app StatusMessage
*/
/*
 eslint no-unused-vars: "off"
*/
(function(window, document) {
  function StatusMessage(container, className) {
    var messageElem = document.createElement('p');
    messageElem.className = className;

    this.init = function(message, className) {
      messageElem.innerHTML = message;
      messageElem.className = className;
      messageElem.style.display = 'none';
      container.appendChild(messageElem);
      app.animate.fadeIn({
        elem: messageElem,
        speed: 300
      });
    };
    this.set = function(message, className) {
      if(messageElem.parentNode == null) {
        this.init(message, className);
      } else {
        app.animate.fadeOut({
          elem: messageElem,
          speed: 300,
          onAfterTransition: function() {
            messageElem.innerHTML = message;
            if(typeof className == 'string') {
              messageElem.className = className;
            }
            app.animate.fadeIn({
              elem: messageElem,
              speed: 300
            });
          }
        });
      }
    };
    this.destroy = function() {
      if(messageElem.parentNode == container) {
        app.animate.fadeOut({
          elem: messageElem,
          speed: 300,
          onAfterTransition: function() {
            container.removeChild(messageElem);
          }
        });
      }
    };
  }

  window.app = window.app || {};
  window.app.StatusMessage = StatusMessage;
})(window, document);
