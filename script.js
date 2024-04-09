const table = document.querySelectorAll('.square');
const history = [];
const historyList = document.getElementById('history');
let moveNumber = 0;
let currentPlayer = 'cross';
let currentPlayerDisplay = document.getElementById('current-player');


table.forEach((square, i) => {
  square.addEventListener('click', () => {
      if (table[i].innerHTML === '') {
        addMove(i);
        addHistory(i);
        verifyVictory();
        alterPlayer();
      }
  });
});

function addMove(index) {
  const move = document.createElement('div');
  move.classList.add(currentPlayer);
  table[index].appendChild(move);
  moveNumber++;
}

function alterPlayer() {
  currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
  currentPlayerDisplay.innerHTML = currentPlayer === 'cross' ? 'X' : 'O';
  currentPlayerDisplay.style.color = currentPlayer === 'cross' ? '#0000ff' : '#ff0000';
}

function verifyVictory(){
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (table[a].innerHTML && table[a].innerHTML === table[b].innerHTML && table[a].innerHTML === table[c].innerHTML) {
      table[a].style.backgroundColor = '#4a6d42';
      table[b].style.backgroundColor = '#4a6d42';
      table[c].style.backgroundColor = '#4a6d42';
      setTimeout(() => {
        alert(`Player ${currentPlayer === 'cross' ? 'Circle' : 'Cross'} wins!`);
        resetGame();
      }, 100);
    }else if (moveNumber >= 7) {
      table[history[moveNumber - 6].position].innerHTML = '';
    }
  });
}

function addHistory(position) {
  history.push({ moveNumber: moveNumber, player: currentPlayer, position: position });
  const historyItem = document.createElement('li');
  historyItem.innerHTML = `Move ${moveNumber}: ${currentPlayer === 'cross' ? 'X' : 'O'} at position ${position}`;
  historyList.appendChild(historyItem);
}

function resetGame() {
  table.forEach(square => {
    square.innerHTML = '';
    square.style.backgroundColor = '';
  });
  history.length = 0;
  moveNumber = 0;
  currentPlayer = 'cross';
  currentPlayerDisplay.innerHTML = 'X';
  currentPlayerDisplay.style.color = '#0000ff';
  historyList.innerHTML = '';
}