/*
    Animations module
*/
"use strict";
// console.log('>>Animations module connected');
(function(window) {

  function fadeOut(options) {
    if (options.elem == undefined) {
      throw new Error('Can\'t fadeOut undefined/null.');
    }
    var elem =  options.elem;

    var speed = options.speed;
    if (typeof speed === 'undefined') {
      speed = 500;
    }
    else if (typeof options.speed !== 'number') {
      throw new Error('Speed must be of type number.');
    }

    var onBeforeTransition = options.onBeforeTransition;
    if (typeof onBeforeTransition !== 'function') {
      if (typeof onBeforeTransition === 'undefined') {
        onBeforeTransition = function() {};
      } else {
        throw new Error('onBeforeTransition must be of type function or not provided at all.');
      }
    }

    var onAfterTransition = options.onAfterTransition;
    if (typeof onAfterTransition !== 'function') {
      if (typeof onAfterTransition === 'undefined') {
        onAfterTransition = function() {};
      } else {
        throw new Error('onAfterTransition must be of type function or not provided at all.');
      }
    }

    onBeforeTransition();

    elem.style.transition = 'opacity ' + speed + 'ms';
    elem.style.opacity = '0';
    // console.log('FadeOut animation started on element: ', elem);

    function onFadeOutEnd() {
      elem.style.display = 'none';
      // console.log('FadeOut animation ended on element: ', elem);
      elem.removeEventListener('transitionend', onFadeOutEnd);
      onAfterTransition();
    }

    elem.addEventListener('transitionend', onFadeOutEnd, false);
  }

  function fadeIn(options) {
    if (options.elem == undefined) {
      throw new Error('Can\'t fadeIn undefined/null.');
    }
    var elem =  options.elem;

    var speed = options.speed;
    if (typeof speed === 'undefined') {
      speed = 500;
    }
    else if (typeof options.speed !== 'number') {
      throw new Error('Speed must be of type number.');
    }

    var onBeforeTransition = options.onBeforeTransition;
    if (typeof onBeforeTransition !== 'function') {
      if (typeof onBeforeTransition === 'undefined') {
        onBeforeTransition = function() {};
      } else {
        throw new Error('onBeforeTransition must be of type function or not provided at all.');
      }
    }

    var onAfterTransition = options.onAfterTransition;
    if (typeof onAfterTransition !== 'function') {
      if (typeof onAfterTransition === 'undefined') {
        onAfterTransition = function() {};
      } else {
        throw new Error('onAfterTransition must be of type function or not provided at all.');
      }
    }

    onBeforeTransition();

    elem.style.opacity = '0';
    elem.style.display = 'block';
    elem.style.visibility = 'visible';
    elem.style.transition = 'opacity ' + speed + 'ms';
    // console.log('fadeIn animation started on element: ', elem);

    elem.offsetHeight;

    elem.style.opacity = '1';

    setTimeout(onFadeInEnd, speed);

    function onFadeInEnd() {
      // console.log('fadeIn animation ended on element: ', elem);
      onAfterTransition();
    }

  }

  function fadeOutLeft(options) {
    if (options.elem == undefined) {
      throw new Error('Can\'t fadeOutLeft undefined/null.');
    }
    var elem =  options.elem;

    var speed = options.speed;
    if (typeof speed === 'undefined') {
      speed = 500;
    }
    else if (typeof options.speed !== 'number') {
      throw new Error('Speed must be of type number.');
    }

    var onBeforeTransition = options.onBeforeTransition;
    if (typeof onBeforeTransition !== 'function') {
      if (typeof onBeforeTransition === 'undefined') {
        onBeforeTransition = function() {};
      } else {
        throw new Error('onBeforeTransition must be of type function or not provided at all.');
      }
    }
    var onAfterTransition = options.onAfterTransition;
    if (typeof onAfterTransition !== 'function') {
      if (typeof onAfterTransition === 'undefined') {
        onAfterTransition = function() {};
      } else {
        throw new Error('onAfterTransition must be of type function or not provided at all.');
      }
    }

    onBeforeTransition();
    // console.log('fadeOutLeft animation started on element: ', elem);

    elem.classList.add('animated');
    elem.classList.add('fadeOutLeft');
    elem.style.display = 'block';

    function onFadeOutLeft() {
      elem.style.display = 'none';
      elem.classList.remove('animated');
      elem.classList.remove('fadeOutLeft');

      elem.parentElement.style.minHeight = '';
      // console.log('fadeOutLeft animation ended on element: ', elem);
      elem.removeEventListener('animationend', onFadeOutLeft);
      onAfterTransition();
    }

    elem.addEventListener('animationend', onFadeOutLeft, false);
  }

  function fadeInRight(options) {
    if (options.elem == undefined) {
      throw new Error('Can\'t fadeInRight undefined/null.');
    }
    var elem =  options.elem;

    var speed = options.speed;
    if (typeof speed === 'undefined') {
      speed = 500;
    }
    else if (typeof options.speed !== 'number') {
      throw new Error('Speed must be of type number.');
    }

    var onBeforeTransition = options.onBeforeTransition;
    if (typeof onBeforeTransition !== 'function') {
      if (typeof onBeforeTransition === 'undefined') {
        onBeforeTransition = function() {};
      } else {
        throw new Error('onBeforeTransition must be of type function or not provided at all.');
      }
    }

    var onAfterTransition = options.onAfterTransition;
    if (typeof onAfterTransition !== 'function') {
      if (typeof onAfterTransition === 'undefined') {
        onAfterTransition = function() {};
      } else {
        throw new Error('onAfterTransition must be of type function or not provided at all.');
      }
    }

    elem.offsetHeight;
    onBeforeTransition();

    // console.log('fadeInRight animation started on element: ', elem);
    elem.style.display = 'block';
    elem.classList.add('fadeInRight');
    elem.classList.add('animated');

    function onfadeInRight() {
      // console.log('fadeInRight animation ended on element: ', elem);
      elem.removeEventListener('animationend', onfadeInRight);
      onAfterTransition();
    }

    elem.addEventListener('animationend', onfadeInRight, false);
  }

  window.app = window.app || {};
  window.app.animate = window.app.animate || {};
  window.app.animate.fadeIn = fadeIn;
  window.app.animate.fadeOut = fadeOut;
  window.app.animate.fadeOutLeft = fadeOutLeft;
  window.app.animate.fadeInRight = fadeInRight;

})(window);
