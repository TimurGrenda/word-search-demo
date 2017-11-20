/*global  renderWordSearchTable
          wordsToFindWrapper wordsToFindWrapper
          wordsToFind wordSearchTableClickHandler
          Tutorial
*/
/*
 eslint no-unused-vars: "off",
        no-undef: "off",
        no-redeclare: "off",
        no-empty: "off"
*/
"use strict";
(function(window, document) {


  document.addEventListener("DOMContentLoaded", function() {
    var timerElement = document.querySelector('.timer');
    var timer = new window.app.Timer({
      parentElem: timerElement
    });

    var firstTd = document.querySelectorAll('#wordSearch td')[4];
    var lastTd = document.querySelectorAll('#wordSearch td')[1];
    // var tutorial = new window.app.Tutorial(firstTd, lastTd);
    // tutorial.init();
    var wordSearch = new window.app.WordSearch();
    wordSearch.init();
  });
})(window, document);
