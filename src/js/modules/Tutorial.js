/*
  global app Tutorial StatusMessage
  timerElement timer
*/
/*
 eslint no-unused-vars: "off"
*/
window.app = window.app || {};
window.app.Tutorial = function (firstEl, secondEl, onFinish) {
  var overlay = document.createElement('div');
  overlay.classList.add('tutorial__overlay');

  var highlightedEl = null;

  var statusContainer = document.createElement('div');
  statusContainer.className = 'tutorial__statusContainer';
  var status = new StatusMessage(statusContainer);
  overlay.appendChild(statusContainer);

  var self = this;

  function showOverlay() {
    document.body.appendChild(overlay);
  }

  function removeOverlay() {
    if(overlay.parentNode == document.body) {
      app.animate.fadeOut({
        elem: overlay,
        onAfterTransition: function() {
          document.body.removeChild(overlay);
        }
      });
    }
  }

  function highLightEl(el) {
    highlightedEl = el;

    el.classList.add('tutorial__highlighted');
  }

  function removeCurrentHighlight() {
    highlightedEl.classList.remove('tutorial__highlighted');
  }


  this.init = function(){
    showOverlay();
    highLightEl(firstEl);

    status.init('Tap the first letter of the word "here".', 'tutorial__status');

    firstEl.addEventListener('click', self.next);
  };
  this.next = function(){
    setTimeout(function() {
      firstEl.removeEventListener('click', self.next);

      removeCurrentHighlight();
      highLightEl(secondEl);

      status.set('Tap the last letter.');

      secondEl.addEventListener('click', self.finish);

    }, 1000);
  };

  this.finish = function() {
    status.set('Well done!');

    setTimeout(function() {
      secondEl.removeEventListener('click', self.finish);

      removeCurrentHighlight();
      removeOverlay();
      status.destroy();

      onFinish();
    }, 1500);
  };
};
