/*
    Animations module
*/
"use strict";
// console.log('>>Timer module connected');
(function(window) {

  function Timer(options) {
    var parentElem =  options.parentElem;
    if (parentElem == undefined) {
      throw new Error('Parent parentElem for a timer wasn\'t provided');
    }

    var secondsLimit = options.secondsLimit;
    if (typeof secondsLimit === 'undefined') {
      secondsLimit = Infinity;
    }
    var timeStarted;
    var tickTimerId;
    var secondsDifference = 0;


    var minutesElem = document.createElement('span');
    minutesElem.className = 'timer__minutes';

    var separatorNode = document.createTextNode(':');

    var secondsElem = document.createElement('span');
    secondsElem.className = 'timer__seconds';



    this.init = function() {
      parentElem.appendChild(minutesElem);
      parentElem.appendChild(separatorNode);
      parentElem.appendChild(secondsElem);
      timeStarted = new Date();
      render();

      tickTimerId = setTimeout(tick, 1000);

      function tick() {
        var currentTime = new Date();

        secondsDifference = Math.floor( (currentTime.getTime() - timeStarted.getTime()) / 1000);
        render();

        if(secondsDifference < secondsLimit) {
          tickTimerId = setTimeout(tick, 1000);
        } else {
          clearTimeout(tickTimerId);
          onSecondsLimitReach();
        }

      }
    };

    this.getsecondsDifference = function() {
      return secondsDifference;
    };
    this.stop = function() {
      clearTimeout(tickTimerId);
    };

    function render() {
      var minutes = Math.floor(secondsDifference / 60);
      var minutesString = String("0" + minutes).slice(-2);
      minutesElem.innerHTML = minutesString;

      var seconds = secondsDifference - minutes * 60;
      var secondsString = String("0" + seconds).slice(-2);
      secondsElem.innerHTML = secondsString;
    }

    function onSecondsLimitReach() {
      if(typeof options.onSecondsLimitReach === 'function') {
        options.onSecondsLimitReach();
      }
    }

  }

  window.app = window.app || {};
  window.app.Timer = Timer;

})(window);
