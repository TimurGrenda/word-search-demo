/*global  app renderWordSearchTable
          wordsToFindWrapper wordsToFindWrapper
          wordsToFind wordSearchTableClickHandler
          Tutorial
*/
/*
 eslint no-unused-vars: "off",
        no-undef: "off",
        no-redeclare: "off"
*/
/*
    address [row, col] [Y, X]
            X ->
       0   1   2
   0  ['a','b','c','d','e'],
 Y 1  ['a','b','c','d','e'],
 | 2  ['f','g','h','i','j'],
\/      ['a','b','c','d','e'],
      ['a','b','c','d','e']

*/


var wordSearchMatrix = [
  ['w', 'e', 'r', 'e', 'h'],
  ['e', 'o', 'e', 'k', 'r'],
  ['h', 'k', 'r', 'f', 'q'],
  ['t', 's', 'a', 'd', 'f'],
  ['e', 'y', 'b', 'h', 's']
];
var wordsToFind = {};
wordsToFind.list = ['here', 'are', 'the','words'];
wordsToFind._foundWords = [];
for(var i = 0; i < wordsToFind.list.length; i++ ) {
  wordsToFind._foundWords.push(false);
}

wordsToFind.markFound = function(word) {
  var wordPosition = this.search(word);
  if(wordPosition === -1) {
    return;
  }

  this._foundWords[wordPosition] = true;

  this.render();
}
wordsToFind.render = function () {
  var html = '';
  for(var i = 0; i < wordsToFind.list.length; i++) {
    html += '<p class="word"><span>' + wordsToFind.list[i] + '</span></p>';
  }
  wordsToFindWrapper.innerHTML = html;

  var spans = wordsToFindWrapper.getElementsByTagName('span');
  for(i = 0; i < spans.length; i++) {
    if(this._foundWords[i]) {
      spans[i].classList.add('found');
    }
  }
}
wordsToFind.search = function(str) {
  var index = wordsToFind.list.indexOf(str);
  if(this._foundWords[index]) {
    return -1;
  }
  return index;
}

wordsToFind._isFinished = false;

wordsToFind.testIfFinished = function() {
  var isFinished = true;
  for(var i = 0; i < this._foundWords.length; i++) {
    isFinished = isFinished && this._foundWords[i];
  }
  if(this._isFinished == false && isFinished == true) {
    this.onFinish();
  }
  if(isFinished) {
    this._isFinished = true;
  }
}

// wordsToFind.onFinish = function() {
//   setTimeout(function() {
//     switchPage('pageMain', 'pagePrizes', function() {
//       var loadingAnimation = document.getElementById('loading');
//
//       document.body.appendChild(loadingAnimation);
//
//       app.animate.fadeIn({
//         elem: loadingAnimation,
//         onAfterTransition: function() {
//           setTimeout(function() {
//
//             app.animate.fadeOut({
//               elem: loadingAnimation,
//               onAfterTransition: function() {
//
//                 app.animate.fadeIn({
//                   elem: prizeBlock,
//                 });
//               }
//             });
//           }, 1000);
//         }
//       });
//
//     });
//
//     [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
//       img.setAttribute('src', img.getAttribute('data-src'));
//       img.onload = function() {
//         img.removeAttribute('data-src');
//       };
//     });
//   },30);
// }
wordsToFind.onFinish = function() {
  setTimeout(function () {
    alert('all words found');
  }, 500);
}

function wordSearchTableClickHandler(event) {
  var cellValue;
  var targetTd = event.target.closest('td');
  if(targetTd === null) {
    return;
  }

  var currentAddress = getCellAddress(targetTd);

  if (selectionStarted) {
    lastCellAddress = currentAddress;
    var isSameCell = firstCellAddress.length==lastCellAddress.length &&
                     firstCellAddress.every(function(v,i) {
                       return v === lastCellAddress[i]
                     });

    if(isSameCell) {
      return;
    }
    else if (isSelectionAllowed(firstCellAddress, lastCellAddress)) {
      var direction = getSelectionDirection(firstCellAddress, lastCellAddress);

      var resultString = '';
      iterateCellsByDirection(firstCellAddress, lastCellAddress, function(cell) {
        resultString += cell.innerHTML;
      }, direction);


      var isWordFound = wordsToFind.search(resultString) !== -1;

      if(isWordFound) {
        iterateCellsByDirection(firstCellAddress, lastCellAddress, function(cell) {
          cell.classList.add('correct')
        }, direction)

        classBlink(firstCellAddress, lastCellAddress, 'whole', 'hooray', direction);

        wordsToFind.markFound(resultString);
        wordsToFind.testIfFinished();
      } else {
        classBlink(firstCellAddress, lastCellAddress, 'whole', 'error', direction);
      }

      selectionStarted = false;

      var td = getCellElement(firstCellAddress);
      td.classList.remove('active');

    } else {
      classBlink(firstCellAddress, lastCellAddress, 'two', 'error');
      var td = getCellElement(firstCellAddress);
      td.classList.remove('active');

      firstCellAddress = null;
      selectionStarted = false;
    }

  } else {
    selectionStarted = true;
    firstCellAddress = currentAddress;

    var td = getCellElement(firstCellAddress);
    td.classList.add('active');
  }
}

function renderWordSearchTable() {
  var html = '<table class="wordSearchTable">';
  for (var row = 0; row < wordSearchMatrix.length; row++) {
    html += '<tr>';
    for (var col = 0; col < wordSearchMatrix[row].length; col++) {
      html += '<td>' + wordSearchMatrix[row][col] + '</td>';
    }
    html += '</tr>';
  }
  wordSearchWrapper.innerHTML = html;
}


function classBlink(firstCellAddress, lastCellAddress, type, className, direction) {
  var firstCell = getCellElement(firstCellAddress);
  var lastCell = getCellElement(lastCellAddress);

  switch(type) {
    case 'two':
                blink(firstCell);
                blink(lastCell);
                break;
    case 'whole':
                iterateCellsByDirection(firstCellAddress, lastCellAddress, function(el) {
                  blink(el);
                }, direction)
  }

  function blink(el) {
    el.classList.add(className);
    setTimeout(function() {
      el.classList.remove(className);
    }, 300)
  }
}


/*
  address = Array(2) (rowIndex, colIndex)
*/
function getCellElement(address) {
  return wordSearchTable.rows[address[0]].cells[address[1]];
}


function isSelectionAllowed(firstCellAddress, lastCellAddress) {
  // console.log('isSelectionAllowed', firstCellAddress, lastCellAddress);
  var y1 = firstCellAddress[0];
  var x1 = firstCellAddress[1];

  var y2 = lastCellAddress[0];
  var x2 = lastCellAddress[1];

  return Math.abs(y2 - y1) === Math.abs(x2 - x1) ||
    (x2 === x1) && (y2 !== y1) ||
    (y2 === y1) && (x2 !== x1);
}


function getSelectionDirection(firstCellAddress, lastCellAddress) {
  var y1 = firstCellAddress[0];
  var x1 = firstCellAddress[1];

  var y2 = lastCellAddress[0];
  var x2 = lastCellAddress[1];

  if (x2 === x1) {
    if (y2 > y1) {
      return 'South';
    } else {
      return 'North';
    }
  } else if (y2 === y1) {
    if (x2 > x1) {
      return 'East';
    } else {
      return 'West';
    }
  } else if (x2 > x1) {
    if (y2 > y1) {
      return 'South-East';
    } else {
      return 'North-East';
    }
  } else if (x2 < x1) {
    if (y2 > y1) {
      return 'South-West';
    } else {
      return 'North-West';
    }
  } else throw new Error('Error in calculating direction');
}


function iterateCellsByDirection(firstCellAddress, lastCellAddress, func, selectionDirection) {
  var y1 = firstCellAddress[0];
  var x1 = firstCellAddress[1];

  var y2 = lastCellAddress[0];
  var x2 = lastCellAddress[1];

  var resultString = '';
  switch (selectionDirection) {
    case 'North':
      for (var row = y1; row >= y2; row--) {
        func(wordSearchTable.rows[row].cells[x1]);
      }
      break;
    case 'South':
      for (var row = y1; row <= y2; row++) {
        func(wordSearchTable.rows[row].cells[x1]);
      }
      break;
    case 'East':
      for (var col = x1; col <= x2; col++) {
        resultString += wordSearchMatrix[y1][col];
        func(wordSearchTable.rows[y1].cells[col]);
      }
      break;
    case 'West':
      for (var col = x1; col >= x2; col--) {
        resultString += wordSearchMatrix[y1][col];
        func(wordSearchTable.rows[y1].cells[col]);
      }
      break;
    case 'North-East':
      for (var diff = 0; diff <= x2 - x1; diff++) {
        resultString += wordSearchMatrix[y1 - diff][x1 + diff];
        func(wordSearchTable.rows[y1 - diff].cells[x1 + diff]);
      }
      break;
    case 'South-East':
      for (var diff = 0; diff <= x2 - x1; diff++) {
        resultString += wordSearchMatrix[y1 + diff][x1 + diff];
        func(wordSearchTable.rows[y1 + diff].cells[x1 + diff]);
      }
      break;
    case 'North-West':
      for (var diff = 0; diff <= x1 - x2; diff++) {
        resultString += wordSearchMatrix[y1 - diff][x1 - diff];
        func(wordSearchTable.rows[y1 - diff].cells[x1 - diff]);
      }
      break;
    case 'South-West':
      for (var diff = 0; diff <= x1 - x2; diff++) {
        resultString += wordSearchMatrix[y1 + diff][x1 - diff];
        func(wordSearchTable.rows[y1 + diff].cells[x1 - diff]);
      }
      break;
  }
}

function getCellAddress(td) {
  var colIndex = td.cellIndex;
  var rowIndex = td.parentElement.rowIndex;
  return [rowIndex, colIndex];
}
