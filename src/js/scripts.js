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
var timerElement = document.querySelector('.timer');

var timer = new app.Timer({
  parentElem: timerElement
});

var wordSearchWrapper = document.getElementById('wordSearch');
renderWordSearchTable();

var wordsToFindWrapper = document.getElementById('wordsToFind');
wordsToFind.render();

var wordSearchTable = wordSearchWrapper.getElementsByTagName('table')[0];
wordSearchTable.addEventListener('click', wordSearchTableClickHandler);

var selectionStarted = false;

var firstCellAddress, lastCellAddress;

document.addEventListener("DOMContentLoaded", function() {
  var firstTd = document.querySelectorAll('#wordSearch td')[4];

  var lastTd = document.querySelectorAll('#wordSearch td')[1];

  var tutorial = new Tutorial(firstTd, lastTd);

  tutorial.init();
});

function switchPage(prevPageId, nextPageId, cb) {

  var prevPageElem = document.getElementById(prevPageId);
  var nextPageElem = document.getElementById(nextPageId);

  app.animate.fadeOut({
    elem: prevPageElem,
    onAfterTransition: function() {
      prevPageElem.classList.remove('page_active');
      nextPageElem.classList.add('page_active');

      app.animate.fadeIn({
        elem: nextPageElem,
        onAfterTransition: function() {
          cb();
        }
      });
    }
  });
}
