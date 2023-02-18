var board = ['', '', '', '', '', '', '', '', ''];
var player = 'X';
var gameOver = false;

function updateBoard(index) {
  board[index] = player;
  document.querySelector(`td[data-index="${index}"]`).innerHTML = player;
}

function switchPlayer() {
  player = player === 'X' ? 'O' : 'X';
}

function checkWin() {
  var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function handleClick(index) {
  if (!gameOver && board[index] === '') {
    updateBoard(index);
    var winner = checkWin();
    if (winner) {
      document.getElementById('result').innerHTML = winner + ' wins!';
      gameOver = true;
    } else if (board.indexOf('') === -1) {
      document.getElementById('result').innerHTML = 'It\'s a tie!';
      gameOver = true;
    } else {
      switchPlayer();
    }
  }
}

function reset() {
  board = ['', '', '', '', '', '', '', '', ''];
  document.querySelectorAll('td').forEach(td => td.innerHTML = '');
  document.getElementById('result').innerHTML = '';
  player = 'X';
  gameOver = false;
}

document.querySelectorAll('td').forEach(td => {
  td.addEventListener('click', function() {
    var index = td.dataset.index;
    handleClick(index);
  });
});

setInterval(function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  }, 800);